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
      'placehold.co', // Добавляем placehold.co в список разрешенных доменов
    ],
  },
};

export default nextConfig;
