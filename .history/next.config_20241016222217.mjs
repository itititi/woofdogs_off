/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, fs: false };
    return config;
  },
  transpilePackages: ['@tonconnect/ui', '@tonconnect/ui-react'],
  swcMinify: true,
};

export default nextConfig;
