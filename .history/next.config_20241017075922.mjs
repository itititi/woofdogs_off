/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, fs: false };
    config.resolve.alias = {
      ...config.resolve.alias,
      'lucide-react': 'lucide-react/dist/esm/icons',
    };
    return config;
  },
  transpilePackages: ['@tonconnect/ui-react'],
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
