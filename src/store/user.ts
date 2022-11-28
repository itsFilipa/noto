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
  followers: User[];
  following: User[];
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
  users: User[];
  isLoading: boolean;
  actions: {
    listUsers: () => Promise<User[] | undefined>;
    follow: (userId: string) => void;
    unfollow: (userId: string) => void;
    // query against username and firstName plus lastName
    query: (query: string) => Promise<User[]>;
  };
}

const useUserStore = create<UserStore>((set, store) => ({
  users: [],
  isLoading: false,
  actions: {
    listUsers: async () => {
      // const cachedUsers = store().users;
      // if (cachedUsers.length > 0) {
      //   return cachedUsers;
      // }
      set({ isLoading: true});
      try {
        const { data: users } = await DB.get<DatabaseUser[]>("users");
        if (users) {
          const usersList = users.map((u) => u.user);
          set({ users: usersList, isLoading: false });
          return usersList;
        } else {
          set({ isLoading: false });
        }
      } catch (error) {
        set({ isLoading: false });
      }
    },
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
      if (store().users.length === 0) {
        const userToFollow = store().users.find((u) => u.id === userId);
        if (userToFollow) {
          //add current user to userToFollow.followers
          userToFollow.profile.followers.push(currentUser.user);
          //add userToFollow to currentUser.following
          currentUser.user.profile.following.push(userToFollow);
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
          userToFollow.user.profile.followers.push(currentUser.user);
          //add userToFollow to currentUser.following
          currentUser.user.profile.following.push(userToFollow.user);
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
      if (store().users.length === 0) {
        const userToUnfollow = store().users.find((u) => u.id === userId);
        if (userToUnfollow) {
          //remove current user from userToUnfollow.followers
          userToUnfollow.profile.followers.splice(
            userToUnfollow.profile.followers.indexOf(currentUser.user),
            1
          );
          //remove userToUnfollow from currentUser.following
          currentUser.user.profile.following.splice(
            currentUser.user.profile.following.indexOf(userToUnfollow),
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
            userToUnfollow.user.profile.followers.indexOf(currentUser.user),
            1
          );
          //remove userToUnfollow from currentUser.following
          currentUser.user.profile.following.splice(
            currentUser.user.profile.following.indexOf(userToUnfollow.user),
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
      const users = store().users;
      if (users.length === 0) {
        const { data: users } = await DB.get<DatabaseUser[]>("users");
        if (!users) {
          set({ isLoading: false });
          return [];
        }
        const filteredUsers = users.filter((u) => {
          const username = u.user.profile.username.toLowerCase();
          const firstName = u.user.profile.firstName.toLowerCase();
          const lastName = u.user.profile.lastName.toLowerCase();
          const queryLower = query.toLowerCase();
          return (
            username.includes(queryLower) ||
            firstName.includes(queryLower) ||
            lastName.includes(queryLower)
          );
        });
        set({ isLoading: false });
        return filteredUsers.map((u) => u.user);
      } else {
        const filteredUsers = users.filter((u) => {
          const username = u.profile.username.toLowerCase();
          const firstName = u.profile.firstName.toLowerCase();
          const lastName = u.profile.lastName.toLowerCase();
          const queryLower = query.toLowerCase();
          return (
            username.includes(queryLower) ||
            firstName.includes(queryLower) ||
            lastName.includes(queryLower)
          );
        });
        set({ isLoading: false });
        return filteredUsers;
      }
    },
  },
}));

export const useUser = () => {
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const { listUsers, follow, unfollow, query } = useUserStore((state) => state.actions);

  return {
    users,
    listUsers,
    isLoading,
    follow,
    unfollow,
    query,
  };
}