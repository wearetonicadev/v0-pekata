/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  rewrites: () => [
    {
      source: "/proxy/:path*",
      destination: "https://backend.pekatafoods.com/api/v1/:path*/",
    },
  ],
};

export default nextConfig;
