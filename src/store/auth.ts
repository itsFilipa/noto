// 1. Fake network request using local storage and setTimeout
// 2. Dispatch the success action with the user data
// 3. Dispatch the error action with the error message
import { faker } from '@faker-js/faker'
import create from "zustand"
import { DB } from "../lib/db"
import { User, UserProfile } from "./user"

export interface AuthPayload {
  username: string
  password: string
}

export interface UserAuth {
  id: string
  username: string
  password: string
  user: User
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  error: string | undefined
  actions: {
    login: (payload: AuthPayload) => void
    logout: () => void
    register: (payload: AuthPayload) => void
    delete: () => void
    updateCredentials: (payload: Partial<AuthPayload>) => void
    updateProfile: (payload: Partial<UserProfile>) => void
  }
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: undefined,
  actions: {
    login: async (payload) => {
      set({ isLoading: true, error: undefined })
        try {
          const user = await DB.get<UserAuth>("auth");

          if (user && user.username === payload.username && user.password === payload.password) {
            set({ user: user.user, isLoading: false })
          } else {
            set({ error: "Invalid username or password", isLoading: false })
          }
        } catch (error) {
          set({ isLoading: false, error: (error as Error).message })
        }
      },
    logout: () => {
      set({ user: null })
    },
    register: async (payload) => {
      set({ isLoading: true, error: undefined })
      try {
        const users = await DB.get<User[]>("users", 100);
        
        // check if username is taken
        const usernameExists = users?.some((user) => user.profile.username === payload.username)

        if (usernameExists) {
          set({ error: "User already exists", isLoading: false })
        } else {
          const id = faker.datatype.uuid()

          const newUser = {
            id: id,
            username: payload.username,
            password: payload.password,
            user: {
              id: id,
              profile: {
                username: payload.username,
                firstName: "",
                lastName: "",
                biography: "",
                avatarUrl: faker.image.avatar(),
              },
              createdAt: new Date().toISOString(),
            },
          }
          await DB.set<UserAuth>("auth", newUser)
          set({ user: newUser.user, isLoading: false })
        }
      } catch (error) {
        set({ isLoading: false, error: (error as Error).message })
      }
    },
  }
}));
