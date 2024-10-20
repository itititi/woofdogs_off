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
    icon: "/ton-wallet.jpg",
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
    icon: "/ton-space.jpg",
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
];

export const finalWalletOffers = walletOffers;

export const getWalletOfferById = (id: string): WalletOffer | undefined => {
  return walletOffers.find(offer => offer.id === id);
};
