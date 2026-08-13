"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api, setToken, removeToken, getToken } from "@/utils/api";
import { endpoints } from "@/utils/endpoints";

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  mobile?: string;
  gender?: string;
  dob?: string;
  address?: string | null;
  address_2?: string | null;
  city?: string | null;
  country_id?: number | string;
  zipcode?: string | null;
  profile_photo?: string;
  image_url?: string;
  updated_at?: string;
}

interface LoginResponse {
  status: boolean;
  message: string;
  token: string;
  role?: string;
  user: User;
}

interface ProfileResponse {
  status: boolean;
  user: User;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await api<ProfileResponse>(endpoints.profile, { auth: true });
      setUser(data.user);
    } catch {
      removeToken();
      setUser(null);
    }
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    const data = await api<LoginResponse>(endpoints.login, {
      method: "POST",
      body: { login: email, password },
    });
    setToken(data.token);
    await fetchProfile();
  };

  const logout = async () => {
    try {
      await api(endpoints.logout, { method: "POST", auth: true });
    } catch {
      // ignore logout errors
    }
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, fetchProfile, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
