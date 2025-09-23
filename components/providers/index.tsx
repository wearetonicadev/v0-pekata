"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CampaignProvider } from "@/contexts/CampaignContext";
import { usePathname } from "next/navigation";

function ConditionalCampaignProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const protectedRoutes = ["/", "/employees"];
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtectedRoute) {
    return <CampaignProvider>{children}</CampaignProvider>;
  }

  return <>{children}</>;
}

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConditionalCampaignProvider>{children}</ConditionalCampaignProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
