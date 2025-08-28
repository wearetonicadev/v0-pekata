import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/", "/employees"];
const publicRoutes = ["/login"];

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://backend.pekatafoods.com/api/v1/admin/users/me/",
      {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          "X-Company-Slug": process.env.NEXT_PUBLIC_X_COMPANY_SLUG ?? "",
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

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );
  const isPublicRoute = publicRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const isValidToken = await validateToken(token);

    if (!isValidToken) {
      const response = NextResponse.redirect(new URL("/login", req.nextUrl));

      response.cookies.set("auth_token", "", { maxAge: -1, path: "/" });
      response.cookies.set("user_data", "", { maxAge: -1, path: "/" });

      return response;
    }
  }

  if (isPublicRoute && token) {
    const isValidToken = await validateToken(token);

    if (isValidToken) {
      console.log(`✅ Authenticated user on public route, redirecting to /`);
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
