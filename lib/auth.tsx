"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ModuleKey } from "@/data/modules";

export interface Account {
  businessName: string;
  industry: string;
  size: string;
  fullName: string;
  email: string;
  /** Demo only — never store real passwords in localStorage in production */
  password: string;
  modules: ModuleKey[];
}

interface AuthContextValue {
  account: Account | null;
  isAuthenticated: boolean;
  loading: boolean;
  signup: (account: Account) => void;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateModules: (modules: ModuleKey[]) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ACCOUNT_KEY = "businessos_account";
const SESSION_KEY = "businessos_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedAccount = window.localStorage.getItem(ACCOUNT_KEY);
      const storedSession = window.localStorage.getItem(SESSION_KEY);
      if (storedAccount) setAccount(JSON.parse(storedAccount) as Account);
      if (storedSession === "true") setIsAuthenticated(true);
    } catch {
      // localStorage unavailable — proceed as logged out
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback((newAccount: Account) => {
    window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(newAccount));
    window.localStorage.setItem(SESSION_KEY, "true");
    setAccount(newAccount);
    setIsAuthenticated(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const storedAccount = window.localStorage.getItem(ACCOUNT_KEY);
    if (!storedAccount) {
      return { ok: false, error: "No account found for that email. Sign up first." };
    }
    const parsed = JSON.parse(storedAccount) as Account;
    if (parsed.email.toLowerCase() !== email.toLowerCase()) {
      return { ok: false, error: "No account found for that email. Sign up first." };
    }
    if (parsed.password !== password) {
      return { ok: false, error: "Incorrect password. Try again." };
    }
    window.localStorage.setItem(SESSION_KEY, "true");
    setAccount(parsed);
    setIsAuthenticated(true);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.setItem(SESSION_KEY, "false");
    setIsAuthenticated(false);
  }, []);

  const updateModules = useCallback((modules: ModuleKey[]) => {
    setAccount((prev) => {
      if (!prev) return prev;
      const next = { ...prev, modules };
      window.localStorage.setItem(ACCOUNT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ account, isAuthenticated, loading, signup, login, logout, updateModules }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
