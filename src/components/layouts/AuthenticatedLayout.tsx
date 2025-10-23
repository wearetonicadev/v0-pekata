import { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SearchProvider } from "../../contexts/SearchContext";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { useLocation } from "react-router-dom";
import { BrandSeparator } from "../BrandSeparator";
import { Spinner } from "../ui/spinner";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export const AuthenticatedLayout = ({ children }: AuthenticatedLayoutProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const protectedRoutes = ["/", "/employees", "/employee" ];
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/")
  );

  // Don't render anything for non-protected routes (like 404)
  if (!isProtectedRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return (
      <SearchProvider>
        <div className="bg-[#FCFCFC]">
          <BrandSeparator leftColor="#D9E2EE" rightColor={"#D9E2EE"} height={10} />
          <Header />
          <div className="w-full max-w-7xl min-h-screen mx-auto px-4 md:px-6 lg:px-8">
            {children}
          </div>
          <BrandSeparator />
          <Footer />
        </div>
      </SearchProvider>
    );
  }

  return null;
};
