import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  studentId?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    studentId?: string
  ) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          // TODO: 실제 API 호출로 교체
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // 임시 로그인 로직 (실제로는 서버 검증 필요)
          if (email && password) {
            const user: User = {
              id: "1",
              email,
              name: email.split("@")[0],
              studentId: "20240001",
            };

            set({ user, isAuthenticated: true, isLoading: false });
            return true;
          }

          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error("Login error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (
        email: string,
        password: string,
        name: string,
        studentId?: string
      ) => {
        set({ isLoading: true });

        try {
          // TODO: 실제 API 호출로 교체
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // 임시 회원가입 로직
          const user: User = {
            id: Date.now().toString(),
            email,
            name,
            studentId,
          };

          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          console.error("Register error:", error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
