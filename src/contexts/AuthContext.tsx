import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCompanySlugFromHost } from "../lib/utils";

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
  const queryClient = useQueryClient();

  const getToken = (): string | null => {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1] || null
    );
  };

  const setToken = (token: string) => {
    document.cookie = `auth_token=${token}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; samesite=lax`;
  };

  const removeToken = () => {
    document.cookie = "auth_token=; max-age=-1; path=/";
  };

  const setUserCookie = (userData: User) => {
    document.cookie = `user_data=${JSON.stringify(userData)}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; samesite=lax`;
  };

  const removeUserCookie = () => {
    document.cookie = "user_data=; max-age=-1; path=/";
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(
        "https://backend.pekatafoods.com/api/v1/admin/users/me/",
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
            "X-Company-Slug": getCompanySlugFromHost(),
          },
        }
      );

      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);

      const token = getToken();

      if (token) {
        // Validate token with server
        const isValidToken = await validateToken(token);

        if (isValidToken) {
          const userData =
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("user_data="))
              ?.split("=")[1] ?? "";

          try {
            const parsedUser = JSON.parse(decodeURIComponent(userData));
            setUser(parsedUser);
          } catch (error) {
            console.error("Error parsing user data from cookie:", error);
            // If user data is corrupted, clear everything
            removeToken();
            removeUserCookie();
            setUser(null);
          }
        } else {
          // Token is invalid, clear everything
          removeToken();
          removeUserCookie();
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
    user,
    loading,
    isAuthenticated: !!user,
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
