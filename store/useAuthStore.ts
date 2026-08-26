import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  businessName?: string;
  industry?: string;
  size?: string;
  modules?: string[];
  [key: string]: unknown;
}

interface AuthState {
  /* ── state ──────────────────────────────────────────────── */
  token: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  entityId: string | null;
  hasHydrated: boolean;

  /* ── derived ────────────────────────────────────────────── */
  isAuthenticated: () => boolean;

  /* ── actions ────────────────────────────────────────────── */
  setAuth: (payload: {
    token: string;
    refreshToken?: string | null;
    user?: AuthUser | null;
    entityId?: string | null;
  }) => void;
  setUser: (user: AuthUser | null) => void;
  setEntityId: (entityId: string | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  setHasHydrated: (state: boolean) => void;
}

const initialState = {
  token: null,
  refreshToken: null,
  user: null,
  entityId: null,
  hasHydrated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      isAuthenticated: () => !!get().token,

      setAuth: ({ token, refreshToken, user, entityId }) =>
        set({
          token,
          refreshToken: refreshToken ?? null,
          user: user ?? null,
          entityId: entityId ?? get().entityId,
        }),

      setUser: (user) => set({ user }),

      setEntityId: (entityId) => set({ entityId }),

      setToken: (token) => set({ token }),

      logout: () =>
        set({
          token: null,
          refreshToken: null,
          user: null,
          entityId: null,
        }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Don't persist hasHydrated itself — it's a runtime-only flag
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        entityId: state.entityId,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
