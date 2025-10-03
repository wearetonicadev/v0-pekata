import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { CampaignProvider } from "../../contexts/CampaignContext";
import { useLocation } from "react-router-dom";

function ConditionalCampaignProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  const protectedRoutes = ["/", "/employees"];
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/")
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
