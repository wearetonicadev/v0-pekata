"use client";

import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  date_joined: string;
  email: string;
  first_name: string;
  id: number;
  is_admin: boolean;
  is_owner: boolean;
  last_login: string;
  last_name: string;
  state: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const queryClient = useQueryClient();

  const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1] || null
    );
  };

  const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
      document.cookie = `auth_token=${token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; samesite=lax`;
    }
  };

  const removeToken = () => {
    if (typeof window !== 'undefined') {
      document.cookie = "auth_token=; max-age=-1; path=/";
    }
  };

  const setUserCookie = (userData: User) => {
    if (typeof window !== 'undefined') {
      document.cookie = `user_data=${JSON.stringify(userData)}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; samesite=lax`;
    }
  };

  const removeUserCookie = () => {
    if (typeof window !== 'undefined') {
      document.cookie = "user_data=; max-age=-1; path=/";
    }
  };

  const validateTokenWithBackend = async (token: string): Promise<boolean> => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL || 
        (process.env.NODE_ENV === 'development' 
          ? "http://localhost:3000/api" // Usar proxy local en desarrollo
          : "https://backend.pekatafoods.com/api/v1"); // Backend real en producción
      
      const response = await fetch(
        `${baseURL}/admin/users/me/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
            "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
          },
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // Marcar como hidratado primero
      setIsHydrated(true);
      setLoading(true);

      const token = getToken();

      if (token && typeof window !== 'undefined') {
        const userData =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("user_data="))
            ?.split("=")[1] ?? "";

        try {
          const parsedUser = JSON.parse(decodeURIComponent(userData));
          
          // Validar token con el backend (opcional, para mayor seguridad)
          const isValidToken = await validateTokenWithBackend(token);
          
          if (isValidToken) {
            setUser(parsedUser);
          } else {
            // Token inválido, limpiar cookies
            removeToken();
            removeUserCookie();
            setUser(null);
          }
        } catch (error) {
          console.error("Error parsing user data from cookie:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);
    setUserCookie(userData);
  };

  const logout = () => {
    removeToken();
    removeUserCookie();
    setUser(null);
    queryClient.clear();
  };

  const value: AuthContextType = {
    user: isHydrated ? user : null,
    loading: loading || !isHydrated,
    isAuthenticated: isHydrated ? !!user : false,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
