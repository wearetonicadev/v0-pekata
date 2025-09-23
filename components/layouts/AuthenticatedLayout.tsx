"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePathname } from "next/navigation";
import { BrandSeparator } from "@/components/BrandSeparator";

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

  // Don't render anything for non-protected routes (like 404)
  if (!isProtectedRoute) {
    return children;
  }

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <div className="bg-[#FCFCFC]">
        <Header />

        <div className="w-full max-w-7xl min-h-screen mx-auto">{children}</div>

        <BrandSeparator />

        <Footer />
      </div>
    );
  }

  return null;
};
