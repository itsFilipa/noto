import Fuse from "fuse.js";
import { useEffect } from "react";
import create from "zustand";
import { DB } from "../lib/db";

interface UserSimplified {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  biography: string;
}

export interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  biography: string;
  avatarUrl: string; // generate from https://avatars.dicebear.com/
  followers: string[];
  following: string[];
}

export interface User {
  id: string;
  profile: UserProfile;
  createdAt: string;
}

export interface DatabaseUser {
  id: string;
  email: string;
  password: string;
  user: User;
}

interface UserStore {
  user: User | null;
  users: User[];
  isLoading: boolean;
  actions: {
    setLoading: (isLoading: boolean) => void;
    setUsers: (users: User[]) => void;
    follow: (userId: string) => void;
    unfollow: (userId: string) => void;
    // query against username and firstName plus lastName
    query: (query: string) => Promise<User[]>;
    getUser: (userId: string) => Promise<{user: User | null, error: Error | null}>;
  };
}

const listUsers = async () => {
  const { data: users, error } = await DB.get<DatabaseUser[]>("users");
  if (error) {
    throw new Error(error.message);
  }

  const usersList = users?.map((u) => u.user);
  return usersList;
};

const useUserStore = create<UserStore>((set, store) => ({
  user: null,
  users: [],
  isLoading: false,
  actions: {
    setLoading: (isLoading: boolean) => set({ isLoading }),
    setUsers: (users: User[]) => set({ users }),
    follow: async (userId) => {
      set({ isLoading: true });
      //get current user from currentUser
      const { data: currentUser } = await DB.get<DatabaseUser>(
        "currentUser",
        0
      );
      if (!currentUser) {
        set({ isLoading: false });
        return;
      }
      //get the user from userId
      if (store().users.length !== 0) {
        const userToFollow = store().users.find((u) => u.id === userId);
        if (userToFollow) {
          //add current user to userToFollow.followers
          userToFollow.profile.followers.push(currentUser.user.id);
          //add userToFollow to currentUser.following
          currentUser.user.profile.following.push(userToFollow.id);
          //update the userToFollow
          const users = store().users.splice(
            store().users.indexOf(userToFollow),
            1,
            userToFollow
          );
          set({ users: users });
        }
      } else {
        const { data: users } = await DB.get<DatabaseUser[]>("users", 0);
        if (!users) {
          set({ isLoading: false });
          return;
        }
        const userToFollow = users.find((u) => u.id === userId);
        if (userToFollow) {
          //add current user to userToFollow.followers
          userToFollow.user.profile.followers.push(currentUser.user.id);
          //add userToFollow to currentUser.following
          currentUser.user.profile.following.push(userToFollow.user.id);
          //replace the userToFollow in the users array using splice
          users.splice(users.indexOf(userToFollow), 1, userToFollow);
          await DB.set("users", users, 0);
        }
      }
      //update currentUser
      await DB.set("currentUser", currentUser, 0);
      set({ isLoading: false });
      return;
    },
    unfollow: async (userId) => {
      set({ isLoading: true });
      //get current user from currentUser
      const { data: currentUser } = await DB.get<DatabaseUser>(
        "currentUser",
        0
      );
      if (!currentUser) {
        set({ isLoading: false });
        return;
      }
      //get the user from userId
      if (store().users.length !== 0) {
        const userToUnfollow = store().users.find((u) => u.id === userId);
        if (userToUnfollow) {
          //remove current user from userToUnfollow.followers
          userToUnfollow.profile.followers.splice(
            userToUnfollow.profile.followers.indexOf(currentUser.user.id),
            1
          );
          //remove userToUnfollow from currentUser.following
          currentUser.user.profile.following.splice(
            currentUser.user.profile.following.indexOf(userToUnfollow.id),
            1
          );
          //update the userToUnfollow
          const users = store().users.splice(
            store().users.indexOf(userToUnfollow),
            1,
            userToUnfollow
          );
          set({ users: users });
        }
      } else {
        const { data: users } = await DB.get<DatabaseUser[]>("users");
        if (!users) {
          set({ isLoading: false });
          return;
        }
        const userToUnfollow = users.find((u) => u.id === userId);
        if (userToUnfollow) {
          //remove current user from userToUnfollow.followers
          userToUnfollow.user.profile.followers.splice(
            userToUnfollow.user.profile.followers.indexOf(currentUser.user.id),
            1
          );
          //remove userToUnfollow from currentUser.following
          currentUser.user.profile.following.splice(
            currentUser.user.profile.following.indexOf(userToUnfollow.user.id),
            1
          );
          //replace the userToUnfollow in the users array using splice
          users.splice(users.indexOf(userToUnfollow), 1, userToUnfollow);
          await DB.set("users", users);
        }
      }
      //update currentUser
      await DB.set("currentUser", currentUser);
      set({ isLoading: false });
      return;
    },
    query: async (query) => {
      set({ isLoading: true });

      const { data: dbusers } = await DB.get<DatabaseUser[]>("users", 0);

      const users = dbusers?.map((u) => u.user);

      if (!users) {
        return [];
      }

      const search = new Fuse(users, {
        keys: ["profile.username", "profile.firstName", "profile.lastName"],
        threshold: 0.2,
      });
      const results = search.search(query);
      const usersList = results.map((r) => r.item);

      set({ isLoading: false });

      return usersList;
    },
    getUser: async (userId) => {
      set({ isLoading: true });

      const { data: dbusers } = await DB.get<DatabaseUser[]>("users", 0);

      const users = dbusers?.map((u) => u.user);

      if (!users) {
        set({ isLoading: false });
        return { user: null, error: new Error("No users found") };
      }

      const user = users.find((u) => u.id === userId);

      if(!user) {
        set({ isLoading: false });
        return { user: null , error: new Error("User not found") };
      }

      set({ isLoading: false, user: user });

      return {user: user, error: null};
    },
  },
}));

export const useUser = () => {
  const user = useUserStore((state) => state.user);
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const { follow, unfollow, query, setLoading, setUsers, getUser } = useUserStore(
    (state) => state.actions
  );

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    listUsers()
      .then((users) => {
        if (isMounted && users) {
          setUsers(users);
        }
      })
      .finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, [setLoading, setUsers]);

  return {
    user,
    users,
    isLoading,
    follow,
    unfollow,
    query,
    getUser,
  };
};
