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
  followers: UserSimplified[];
  following: UserSimplified[];
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
  error: Error | undefined;
  actions: {
    listUsers: () => Promise<User[] | undefined>;
    follow: (userId: string) => void;
    unfollow: (userId: string) => void;
    // query against username and firstName plus lastName
    query: (query: string) => Promise<User[]>;
  };
}

// const useUserStore = create<UserStore>((set, store) => ({
//   users: [],
//   isLoading: false,
//   error: undefined,
//   actions: {
//     listUsers: async () => {
//       const cachedUsers = store().users;
//       if (cachedUsers.length > 0) {
//         return cachedUsers;
//       }

//       set({ isLoading: true, error: undefined });
//       try {
//         const users = await DB.get<User[]>("users");
//         if (users) {
//           set({ users, isLoading: false });
//           return users;
//         } else {
//           set({ isLoading: false });
//         }
//       } catch (error) {
//         set({ isLoading: false, error: error as Error });
//       }
//     },
//   },
// }));
