import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxyRequest(request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxyRequest(request, params.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxyRequest(request, params.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleProxyRequest(request, params.path);
}

async function handleProxyRequest(
  request: NextRequest,
  pathSegments: string[]
) {
  const apiOrigin = "https://backend.pekatafoods.com";
  const path = pathSegments.join("/");

  // Build target URL and preserve search params
  const targetUrl = new URL(`${apiOrigin}/${path}`);
  targetUrl.search = request.nextUrl.search;

  const method = request.method;

  // Clone and forward headers (omit host)
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "host") {
      headers.set(key, value);
    }
  });

  // Ensure upstream receives expected tenant header (adjust/remove if not needed)
  headers.set("X-Company-Slug", headers.get("X-Company-Slug") || "tonica");

  // Stream original body for non-GET/HEAD requests to preserve multipart boundaries
  const body = method === "GET" || method === "HEAD" ? undefined : request.body;

  try {
    const upstreamResponse = await fetch(targetUrl.toString(), {
      method,
      headers,
      body,
      // Avoid automatic following which may hide upstream redirects
      redirect: "manual",
      // Avoid caching issues while proxying
      cache: "no-store",
    });

    // Pass-through response body and headers
    const responseHeaders = new Headers();
    upstreamResponse.headers.forEach((value, key) =>
      responseHeaders.set(key, value)
    );

    // If it's a 401 error, clear auth cookies
    if (upstreamResponse.status === 401) {
      responseHeaders.set(
        "Set-Cookie",
        [
          "auth_token=; max-age=-1; path=/",
          "user_data=; max-age=-1; path=/",
        ].join(", ")
      );
    }

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);

    // On any error, clear auth cookies as a safety measure
    const responseHeaders = new Headers();
    responseHeaders.set(
      "Set-Cookie",
      [
        "auth_token=; max-age=-1; path=/",
        "user_data=; max-age=-1; path=/",
      ].join(", ")
    );

    return new NextResponse(JSON.stringify({ error: "Proxy request failed" }), {
      status: 500,
      headers: responseHeaders,
    });
  }
}
