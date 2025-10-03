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
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Configuración específica para exportación estática
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Deshabilitar características no compatibles con exportación estática
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;
