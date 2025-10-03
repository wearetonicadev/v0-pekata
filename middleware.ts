import { NextRequest, NextResponse } from "next/server";
import { getCompanySlugFromHost } from "@/lib/utils";

const protectedRoutes = ["/", "/employees", "/dashboard", "/dashboard/employees"];
const publicRoutes = ["/login", "/dashboard/login"];

async function validateToken(token: string, request: NextRequest): Promise<boolean> {
  try {
    const response = await fetch(
      "https://backend.pekatafoods.com/api/v1/admin/users/me/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          "X-Company-Slug": getCompanySlugFromHost(request),
        },
      }
    );

    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("auth_token")?.value;

  console.log(`🔍 Middleware: path=${path}, token=${token ? 'exists' : 'none'}`);

  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  console.log(`🔍 Middleware: isPublicRoute=${isPublicRoute}, isProtectedRoute=${isProtectedRoute}`);

  // Si es ruta pública, manejar lógica de redirección
  if (isPublicRoute) {
    console.log(`🔍 Middleware: Handling public route`);
    if (token) {
      const isValidToken = await validateToken(token, req);
      if (isValidToken) {
        console.log(`✅ Authenticated user on public route, redirecting to /dashboard`);
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
      }
    }
    // Si es ruta pública y no hay token válido, permitir acceso
    console.log(`🔍 Middleware: Allowing access to public route`);
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    console.log(`🔍 Middleware: Handling protected route`);
    if (!token) {
      // Redirigir a /dashboard/login si viene de /dashboard, sino a /login
      const redirectPath = path.startsWith('/dashboard') ? '/dashboard/login' : '/login';
      console.log(`🔍 Middleware: No token, redirecting to ${redirectPath}`);
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }

    const isValidToken = await validateToken(token, req);

    if (!isValidToken) {
      // Redirigir a /dashboard/login si viene de /dashboard, sino a /login
      const redirectPath = path.startsWith('/dashboard') ? '/dashboard/login' : '/login';
      console.log(`🔍 Middleware: Invalid token, redirecting to ${redirectPath}`);
      const response = NextResponse.redirect(new URL(redirectPath, req.nextUrl));

      response.cookies.set("auth_token", "", { maxAge: -1, path: "/" });
      response.cookies.set("user_data", "", { maxAge: -1, path: "/" });

      return response;
    }
  }

  console.log(`🔍 Middleware: Allowing access`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
