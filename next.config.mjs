/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false };
    return config;
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
