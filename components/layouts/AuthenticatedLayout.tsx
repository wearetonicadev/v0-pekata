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

            <div className="h-5 w-full relative overflow-hidden">
              <div className="h-5 bg-[#D9E2EE] w-full"></div>
              <div
                className="h-5 bg-[#4370A8] absolute top-0 right-0 w-1/2"
                style={{
                  clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              ></div>
            </div>

            <Footer />
          </SidebarInset>
        </SidebarProvider>
      </>
    );
  }

  return null;
};
