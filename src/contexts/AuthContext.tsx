import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

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

export interface Company {
  id: number;
  name: string;
  code: string;
  vat_number: string;
  state: string;
}

interface AuthContextType {
  user: User | null;
  company: Company | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const getToken = (): string | null => {
    return (
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("dashboard_auth_token="))
        ?.split("=")[1] || null
    );
  };

  const setToken = (token: string) => {
    document.cookie = `dashboard_auth_token=${token}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; samesite=lax`;
  };

  const removeToken = () => {
    document.cookie = "dashboard_auth_token=; max-age=-1; path=/";
  };

  const setUserCookie = (userData: User) => {
    document.cookie = `dashboard_user_data=${JSON.stringify(userData)}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; samesite=lax`;
  };

  const removeUserCookie = () => {
    document.cookie = "dashboard_user_data=; max-age=-1; path=/";
  };

  const setCompanyCookie = (companyData: Company) => {
    document.cookie = `dashboard_company_data=${JSON.stringify(companyData)}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; samesite=lax`;
  };

  const removeCompanyCookie = () => {
    document.cookie = "dashboard_company_data=; max-age=-1; path=/";
  };

  const fetchCurrentCompany = async (token: string): Promise<Company> => {
    try {
      const response = await api.get("/admin/companies/current/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching current company:", error);
      throw error;
    }
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await api.get("/admin/users/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return response.status === 200;
    } catch {
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
              .find((row) => row.startsWith("dashboard_user_data="))
              ?.split("=")[1] ?? "";

          const companyData =
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("dashboard_company_data="))
              ?.split("=")[1] ?? "";

          try {
            const parsedUser = JSON.parse(decodeURIComponent(userData));
            setUser(parsedUser);

            // Try to get company from cookie, if not available fetch it
            if (companyData) {
              try {
                const parsedCompany = JSON.parse(decodeURIComponent(companyData));
                setCompany(parsedCompany);
              } catch (error) {
                console.error("Error parsing company data from cookie:", error);
                // Fetch company if cookie is corrupted
                const companyFromApi = await fetchCurrentCompany(token);
                if (companyFromApi) {
                  setCompany(companyFromApi);
                  setCompanyCookie(companyFromApi);
                }
              }
            } else {
              // Fetch company if not in cookie
              const companyFromApi = await fetchCurrentCompany(token);
              if (companyFromApi) {
                setCompany(companyFromApi);
                setCompanyCookie(companyFromApi);
              }
            }
          } catch (error) {
            console.error("Error parsing user data from cookie:", error);
            // If user data is corrupted, clear everything
            removeToken();
            removeUserCookie();
            removeCompanyCookie();
            setUser(null);
            setCompany(null);
          }
        } else {
          // Token is invalid, clear everything
          removeToken();
          removeUserCookie();
          removeCompanyCookie();
          setUser(null);
          setCompany(null);
        }
      } else {
        setUser(null);
        setCompany(null);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (token: string, userData: User) => {
    setToken(token);
    setUser(userData);
    setUserCookie(userData);
    
    // Fetch and store company data
    const companyData = await fetchCurrentCompany(token);
    if (companyData) {
      setCompany(companyData);
      setCompanyCookie(companyData);
    }
  };

  const logout = () => {
    removeToken();
    removeUserCookie();
    removeCompanyCookie();
    setUser(null);
    setCompany(null);
    queryClient.clear();
  };

  const value: AuthContextType = {
    user,
    company,
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
