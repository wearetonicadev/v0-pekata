"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <>
        <Header />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
        <Footer />
      </>
    );
  }

  return children;
}
