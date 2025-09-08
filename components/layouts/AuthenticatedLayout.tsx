"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  const protectedRoutes = ["/", "/employees"];
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!isProtectedRoute) {
    return children;
  }

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <>
        <SidebarProvider>
          <SidebarInset>
            <Header />

            <div className="flex flex-row w-full max-w-7xl mx-auto">
              <AppSidebar />

              <div className="min-h-screen flex-1">{children}</div>
            </div>
            <Footer />
          </SidebarInset>
        </SidebarProvider>
      </>
    );
  }

  return null;
};
