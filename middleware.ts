import { NextRequest, NextResponse } from "next/server";
import { getCompanySlugFromHost } from "@/lib/utils";

const protectedRoutes = ["/dashboard", "/dashboard/employees"];
const publicRoutes = ["/dashboard/login"];

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

  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  // Si es ruta pública, manejar lógica de redirección
  if (isPublicRoute && token) {
    const isValidToken = await validateToken(token, req);

    if (isValidToken) {
      console.log(`✅ Authenticated user on public route, redirecting to /dashboard`);
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/dashboard/login", req.nextUrl));
    }

    const isValidToken = await validateToken(token, req);

    if (!isValidToken) {
      const response = NextResponse.redirect(new URL("/dashboard/login", req.nextUrl));

      response.cookies.set("auth_token", "", { maxAge: -1, path: "/" });
      response.cookies.set("user_data", "", { maxAge: -1, path: "/" });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
