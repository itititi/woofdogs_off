import { tonTokens, TonToken } from './tonTokens';

export interface WalletOffer {
  id: string;
  name: string;
  icon: string;
  priceRange: string;
  priceUSD: number;
  isHot: boolean;
  createdAt: string;
  description: string;
  available: string;
  tokens: {
    token: TonToken;
    balance: number;
    address: string;
    value: number;
  }[];
}

const generateTokenData = (token: TonToken, seed: number): { balance: number; address: string; value: number } => {
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  return {
    balance: parseFloat((random() * 10000).toFixed(2)),
    address: `EQ${Array.from({length: 20}, () => '0123456789ABCDEF'[Math.floor(random() * 16)]).join('')}`,
    value: parseFloat((random() * 100).toFixed(2))
  };
};

export const walletOffers: WalletOffer[] = [
  {
    id: "ton-wallet-1",
    name: "TON Wallet",
    icon: "/tonwallet.jpg",
    priceRange: "~23kk",
    priceUSD: 2918,
    isHot: true,
    createdAt: "2024-07-03",
    description: "TON Wallet with various features and balance. Great for intermediate users.",
    available: "23/93",
    tokens: tonTokens.slice(0, 6).map((token, index) => ({
      token,
      ...generateTokenData(token, index)
    }))
  },
  {
    id: "cryptobot-1",
    name: "CryptoBot",
    icon: "/cryptobot.jpg",
    priceRange: "~15kk",
    priceUSD: 1890,
    isHot: true,
    createdAt: "2024-06-15",
    description: "CryptoBot wallet with Telegram integration. Perfect for beginners.",
    available: "45/100",
    tokens: tonTokens.slice(1, 5).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 10)
    }))
  },
  {
    id: "ton-space-1",
    name: "TON Space",
    icon: "/tonspace.jpg",
    priceRange: "~18kk",
    priceUSD: 2280,
    isHot: true,
    createdAt: "2024-07-10",
    description: "TON Space wallet with advanced features. Ideal for experienced traders.",
    available: "33/80",
    tokens: tonTokens.slice(2, 7).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 20)
    }))
  },
  // Добавьте здесь больше предложений кошельков по аналогии
  {
    id: "ton-wallet-2",
    name: "TON Wallet Pro",
    icon: "/tonwallet-pro.jpg",
    priceRange: "~30kk",
    priceUSD: 3750,
    isHot: false,
    createdAt: "2024-08-01",
    description: "Advanced TON Wallet with enhanced security features and larger balance.",
    available: "15/50",
    tokens: tonTokens.slice(0, 8).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 30)
    }))
  },
  {
    id: "tonkeeper-2",
    name: "Tonkeeper Plus",
    icon: "/tonkeeper-plus.jpg",
    priceRange: "~20kk",
    priceUSD: 2500,
    isHot: false,
    createdAt: "2024-07-20",
    description: "Enhanced Tonkeeper wallet with additional features for power users.",
    available: "28/75",
    tokens: tonTokens.slice(1, 7).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 40)
    }))
  },
  {
    id: "cryptobot-2",
    name: "CryptoBot Premium",
    icon: "/cryptobot-premium.jpg",
    priceRange: "~12kk",
    priceUSD: 1500,
    isHot: false,
    createdAt: "2024-06-25",
    description: "Premium version of CryptoBot with extended functionality and higher limits.",
    available: "55/120",
    tokens: tonTokens.slice(2, 6).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 50)
    }))
  },
  {
    id: "ton-diamond",
    name: "TON Diamond",
    icon: "/ton-diamond.jpg",
    priceRange: "~40kk",
    priceUSD: 5000,
    isHot: false,
    createdAt: "2024-08-15",
    description: "Exclusive TON wallet with the highest balance and premium support.",
    available: "5/20",
    tokens: tonTokens.map((token, index) => ({
      token,
      ...generateTokenData(token, index + 60)
    }))
  },
  {
    id: "ton-lite",
    name: "TON Lite",
    icon: "/ton-lite.jpg",
    priceRange: "~5kk",
    priceUSD: 625,
    isHot: false,
    createdAt: "2024-05-10",
    description: "Lightweight TON wallet for newcomers with a smaller initial balance.",
    available: "100/200",
    tokens: tonTokens.slice(0, 4).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 70)
    }))
  },
  {
    id: "ton-business",
    name: "TON Business",
    icon: "/ton-business.jpg",
    priceRange: "~35kk",
    priceUSD: 4375,
    isHot: false,
    createdAt: "2024-07-30",
    description: "TON wallet tailored for business users with advanced reporting features.",
    available: "18/60",
    tokens: tonTokens.slice(0, 9).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 80)
    }))
  },
  {
    id: "ton-secure",
    name: "TON Secure",
    icon: "/ton-secure.jpg",
    priceRange: "~28kk",
    priceUSD: 3500,
    isHot: false,
    createdAt: "2024-08-05",
    description: "High-security TON wallet with multi-signature support and cold storage options.",
    available: "22/70",
    tokens: tonTokens.slice(1, 8).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 90)
    }))
  },
  {
    id: "ton-trader",
    name: "TON Trader",
    icon: "/ton-trader.jpg",
    priceRange: "~25kk",
    priceUSD: 3125,
    isHot: false,
    createdAt: "2024-07-15",
    description: "TON wallet optimized for frequent traders with advanced market analysis tools.",
    available: "30/80",
    tokens: tonTokens.slice(2, 9).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 100)
    }))
  },
  {
    id: "ton-savings",
    name: "TON Savings",
    icon: "/ton-savings.jpg",
    priceRange: "~15kk",
    priceUSD: 1875,
    isHot: false,
    createdAt: "2024-06-20",
    description: "TON wallet focused on long-term savings with built-in staking features.",
    available: "40/100",
    tokens: tonTokens.slice(0, 5).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 110)
    }))
  },
  {
    id: "ton-mobile",
    name: "TON Mobile",
    icon: "/ton-mobile.jpg",
    priceRange: "~10kk",
    priceUSD: 1250,
    isHot: false,
    createdAt: "2024-06-01",
    description: "Mobile-optimized TON wallet for users on the go.",
    available: "60/150",
    tokens: tonTokens.slice(1, 6).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 120)
    }))
  },
  {
    id: "ton-defi",
    name: "TON DeFi",
    icon: "/ton-defi.jpg",
    priceRange: "~22kk",
    priceUSD: 2750,
    isHot: false,
    createdAt: "2024-07-25",
    description: "TON wallet with integrated DeFi protocols for yield farming and liquidity provision.",
    available: "25/75",
    tokens: tonTokens.slice(0, 7).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 130)
    }))
  },
  {
    id: "ton-nft",
    name: "TON NFT",
    icon: "/ton-nft.jpg",
    priceRange: "~18kk",
    priceUSD: 2250,
    isHot: false,
    createdAt: "2024-07-05",
    description: "TON wallet specialized in NFT storage, trading, and showcase.",
    available: "35/90",
    tokens: tonTokens.slice(2, 8).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 140)
    }))
  },
  {
    id: "ton-institutional",
    name: "TON Institutional",
    icon: "/ton-institutional.jpg",
    priceRange: "~50kk",
    priceUSD: 6250,
    isHot: false,
    createdAt: "2024-08-20",
    description: "TON wallet designed for institutional investors with advanced security and compliance features.",
    available: "3/15",
    tokens: tonTokens.map((token, index) => ({
      token,
      ...generateTokenData(token, index + 150)
    }))
  },
  {
    id: "ton-beginner",
    name: "TON Beginner",
    icon: "/ton-beginner.jpg",
    priceRange: "~3kk",
    priceUSD: 375,
    isHot: false,
    createdAt: "2024-05-01",
    description: "Entry-level TON wallet with educational resources for cryptocurrency newcomers.",
    available: "150/300",
    tokens: tonTokens.slice(0, 3).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 160)
    }))
  }
];

export const finalWalletOffers = walletOffers;

export const getWalletOfferById = (id: string): WalletOffer | undefined => {
  return walletOffers.find(offer => offer.id === id);
};
