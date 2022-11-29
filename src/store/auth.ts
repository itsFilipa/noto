// 1. Fake network request using local storage and setTimeout
// 2. Dispatch the success action with the user data
// 3. Dispatch the error action with the error message
import { faker } from "@faker-js/faker";
import create from "zustand";
import { DB } from "../lib/db";
import { DatabaseUser, User, UserProfile } from "./user";

export interface AuthPayload {
  email: string;
  password: string;
}

interface AuthStore {
  user: DatabaseUser | null;
  isLoading: boolean;
  actions: {
    login: (payload: AuthPayload) => Promise<{ user: DatabaseUser | null; error: Error | null }>;
    logout: () => Promise<{error: Error | null}>;
    register: (payload: AuthPayload) => Promise<{ user: DatabaseUser | null; error: Error | null }>;
    delete: () => Promise<{error: Error | null}>;
    updateCredentials: (payload: Partial<AuthPayload>) => Promise<{ user: DatabaseUser | null; error: Error | null }>;
    updateProfile: (payload: Partial<UserProfile>) => Promise<{ user: DatabaseUser | null; error: Error | null }>;
    setCurrentUser: () => void;
  };
}

const useAuthStore = create<AuthStore>((set, store) => ({
  user: null,
  isLoading: false,
  actions: {
    login: async (payload) => {
      set({ isLoading: true });

      const { data: users, error } = await DB.get<DatabaseUser[]>("users", 150);
      if (error || !users) {
        // key does not exist
        set({ isLoading: false });
        return { user: null, error: new Error("Invalid username or password") };
      }

      const foundUser = users.find(
        (u) => u.email === payload.email && u.password === payload.password
      );
      if (!foundUser) {
        set({ isLoading: false });
        return { user: null, error: new Error("Invalid username or password") };
      }

      // store on auth the curret user
      await DB.set("currentUser", foundUser);

      // update the store
      set({ user: foundUser, isLoading: false });

      return { user: foundUser, error: null };
    },
    logout: async () => {
      set({ isLoading: true });
      await DB.set("currentUser", {});
      set({ user: null, isLoading: false });
      return { error: null };
    },
    register: async (payload) => {
      set({ isLoading: true});

      const { data: users, error } = await DB.get<DatabaseUser[]>("users", 0);
      if (error) {
        set({ isLoading: false });
        return { user: null, error: error };
      }

      // check if email is taken
      const emailExists = users?.some((user) => user.email === payload.email);

      if (emailExists) {
        set({ isLoading: false });
        return { user: null, error: new Error("User already exists") };
      }

      const allUsers = users?.map((user) => user.user) || [];

      const id = faker.datatype.uuid();

      const newUser = {
        id: id,
        email: payload.email,
        password: payload.password,
        user: {
          id: id,
          profile: {
            email: payload.email,
            username: "",
            firstName: "",
            lastName: "",
            biography: "",
            followers: [],
            following: allUsers,
            avatarUrl: faker.image.avatar(),
          },
          createdAt: new Date().toISOString(),
        },
      };

      const dataToSave = Array.isArray(users) ? [...users, newUser] : [newUser];

      // save the new user
      await DB.set<DatabaseUser[]>("users", dataToSave, 0);

      // store on auth the curret user
      await DB.set<DatabaseUser>("currentUser", newUser);

      set({ user: newUser, isLoading: false });
      return { user: newUser, error: null };
    },
    delete: async () => {
      set({ isLoading: true });

      // remove the user from the users list
      const { data: users, error } = await DB.get<DatabaseUser[]>("users", 0);

      if (error) {
        set({ isLoading: false });
        return { error: error };
      }

      if (!users) {
        return { error: new Error("User not found") };
      }

      const currentUser = store().user;
      const updatedUsers = users?.filter((u) => u.id !== currentUser?.id);

      // update the users list
      await DB.set<DatabaseUser[]>("users", updatedUsers, 0);

      const { error: authErr } = await DB.remove("currentUser");
      if (authErr) {
        set({ isLoading: false });
        return { error: authErr };
      }

      set({ user: null, isLoading: false });
      return { error: null };
    },
    updateCredentials: async (payload) => {
      set({ isLoading: true });

      const { data: users, error } = await DB.get<DatabaseUser[]>("users", 0);
      if (error) {
        set({ isLoading: false });
        return { user: null, error: error };
      }

      if (!users) {
        return { user: null, error: new Error("Users not found") };
      }

      const currentUser = store().user;
      if (!currentUser) {
        return { user: null, error: new Error("User not found") }
      }

      const updatedUser = {
        ...currentUser,
        email: payload.email || currentUser.email,
        password: payload.password || currentUser.password,
      };

      // update the users array with the new user data
      const updatedUsers = users.map((u) => {
        if (u.id === currentUser?.id) {
          return updatedUser;
        }
        return u;
      });

      // update the users list
      await DB.set<DatabaseUser[]>("users", updatedUsers, 0);

      // update the current user
      await DB.set<DatabaseUser>("currentUser", updatedUser);

      set({ user: updatedUser, isLoading: false });
      return { user: updatedUser, error: null };
    },
    updateProfile: async (payload) => {
      set({ isLoading: true });

      const { data: users, error } = await DB.get<DatabaseUser[]>("users", 0);
      if (error) {
        set({ isLoading: false });
        return { user: null, error: error };
      }

      if (!users) {
        set({ isLoading: false });
        return { user: null, error: new Error("Users not found") };
      }

      const currentUser = store().user;
      if (!currentUser) {
        set({ isLoading: false });
        return { user: null, error: new Error("User not found") }
      }
      
      const usernameExists = users.some((u) => u.user.profile.username === payload.username);
      if(usernameExists && payload.username !== currentUser.user.profile.username) {
        set({ isLoading: false });
        return { user: null, error: new Error("Username already taken") };
      }

      const updatedUser = {
        ...currentUser,
        user: {
          ...currentUser.user,
          profile: {
            ...currentUser.user.profile,
            ...payload,
          },
        },
      };

      // update the users array with the new user data
      const updatedUsers = users.map((u) => {
        if (u.id === currentUser?.id) {
          return updatedUser;
        }
        return u;
      });

      // update the users list
      await DB.set<DatabaseUser[]>("users", updatedUsers, 0);

      // update the current user
      await DB.set<DatabaseUser>("currentUser", updatedUser);

      set({ user: updatedUser, isLoading: false });
      return { user: updatedUser, error: null };
    },
    setCurrentUser: async () => {
      set({ isLoading: true });
      const { data: user } = await DB.get<DatabaseUser>("currentUser", 0);
      if (user) {
        set({ user: user, isLoading: false });
        return { user: user, error: null };
      }
      set({ isLoading: false });
      return { user: null, error: new Error("No user with current session") };
    },
  },
}));

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const { login, register, updateCredentials, updateProfile, logout, setCurrentUser } =
    useAuthStore((state) => state.actions);

  return {
    user,
    isLoading,
    login,
    register,
    updateCredentials,
    updateProfile,
    setCurrentUser,
    logout,
  };
};
