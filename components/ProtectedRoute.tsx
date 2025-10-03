"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const protectedRoutes = ["/", "/employees", "/dashboard", "/dashboard/employees"];
  const publicRoutes = ["/login", "/dashboard/login"];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  useEffect(() => {
    if (loading) return;

    if (isProtectedRoute && !isAuthenticated) {
      // Redirigir a login
      const loginPath = pathname.startsWith('/dashboard') ? '/dashboard/login' : '/login';
      router.push(loginPath);
      return;
    }

    if (isPublicRoute && isAuthenticated) {
      // Si está autenticado y está en una ruta pública, redirigir al dashboard
      router.push('/dashboard');
      return;
    }

    setIsChecking(false);
  }, [isAuthenticated, loading, pathname, router, isProtectedRoute, isPublicRoute]);

  // Mostrar spinner mientras se verifica la autenticación
  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Si es ruta protegida y no está autenticado, no mostrar nada (ya se redirigió)
  if (isProtectedRoute && !isAuthenticated) {
    return null;
  }

  // Si es ruta pública y está autenticado, no mostrar nada (ya se redirigió)
  if (isPublicRoute && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
