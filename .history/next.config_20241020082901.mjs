/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, tls: false };
    return config;
  },
  transpilePackages: ['lucide-react'],
  images: {
    domains: [
      'ton.org',
      'kingycoin.org',
      'notcoin.io',
      'bolt.ton.org',
      'gram.org',
      'jetton.live',
      'tonex.io',
      'scale.exchange',
      'orbitchain.io',
      'tegro.io',
      // Добавьте здесь другие домены, если они понадобятся в будущем
    ],
  },
};

export default nextConfig;
