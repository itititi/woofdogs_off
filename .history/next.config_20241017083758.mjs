/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, fs: false };
    return config;
  },
  transpilePackages: ['@tonconnect/ui-react'],
};

export default nextConfig;