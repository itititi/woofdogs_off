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
    icon: "/ton-wallet-icon.png",
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
    id: "tonkeeper-1",
    name: "Tonkeeper",
    icon: "/tonkeeper-icon.png",
    priceRange: "~15kk",
    priceUSD: 1890,
    isHot: true,
    createdAt: "2024-06-15",
    description: "Secure and user-friendly Tonkeeper wallet with a sleek interface.",
    available: "45/100",
    tokens: tonTokens.slice(0, 5).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 10)
    }))
  },
  {
    id: "cryptobot-1",
    name: "CryptoBot",
    icon: "/cryptobot-icon.png",
    priceRange: "~10kk",
    priceUSD: 1250,
    isHot: false,
    createdAt: "2024-05-20",
    description: "Telegram-based CryptoBot wallet for easy crypto transactions.",
    available: "67/150",
    tokens: tonTokens.slice(1, 4).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 20)
    }))
  },
  {
    id: "tonhub-1",
    name: "Tonhub",
    icon: "/tonhub-icon.png",
    priceRange: "~18kk",
    priceUSD: 2280,
    isHot: true,
    createdAt: "2024-07-10",
    description: "Feature-rich Tonhub wallet with advanced trading capabilities.",
    available: "33/80",
    tokens: tonTokens.slice(2, 7).map((token, index) => ({
      token,
      ...generateTokenData(token, index + 30)
    }))
  },
  {
    id: "tonwallet-2",
    name: "TON Wallet Pro",
    icon: "/ton-wallet-pro-icon.png",
    priceRange: "~30kk",
    priceUSD: 3750,
    isHot: false,
    createdAt: "2024-08-01",
    description: "Premium TON Wallet with enhanced security features and larger balance.",
    available: "12/50",
    tokens: tonTokens.map((token, index) => ({
      token,
      ...generateTokenData(token, index + 40)
    }))
  }
];

export const getWalletOfferById = (id: string): WalletOffer | undefined => {
  return walletOffers.find(offer => offer.id === id);
};
