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

const createWalletOffer = (
  id: string,
  name: string,
  icon: string,
  priceRange: string,
  priceUSD: number,
  isHot: boolean,
  createdAt: string,
  description: string,
  available: string,
  tokenStartIndex: number
): WalletOffer => ({
  id,
  name,
  icon,
  priceRange,
  priceUSD,
  isHot,
  createdAt,
  description,
  available,
  tokens: tonTokens.slice(0, 6).map((token, index) => ({
    token,
    ...generateTokenData(token, index + tokenStartIndex)
  }))
});

export const walletOffers: WalletOffer[] = [
  createWalletOffer(
    "ton-wallet-1",
    "TON Wallet",
    "/tonwallet.jpg",
    "~23kk",
    2918,
    true,
    "2024-07-03",
    "TON Wallet with various features and balance. Great for intermediate users.",
    "23/93",
    0
  ),
  createWalletOffer(
    "cryptobot-1",
    "CryptoBot",
    "/cryptobot.jpg",
    "~15kk",
    1890,
    true,
    "2024-06-15",
    "CryptoBot wallet with Telegram integration. Perfect for beginners.",
    "45/100",
    10
  ),
  createWalletOffer(
    "ton-space-1",
    "TON Space",
    "/tonspace.jpg",
    "~18kk",
    2280,
    true,
    "2024-07-10",
    "TON Space wallet with advanced features. Ideal for experienced traders.",
    "33/80",
    20
  ),
  createWalletOffer(
    "ton-wallet-2",
    "TON Wallet Pro",
    "/tonwallet-pro.jpg",
    "~30kk",
    3750,
    false,
    "2024-08-01",
    "Advanced TON Wallet with enhanced security features and larger balance.",
    "15/50",
    30
  ),
  createWalletOffer(
    "tonkeeper-2",
    "Tonkeeper Plus",
    "/tonkeeper-plus.jpg",
    "~20kk",
    2500,
    false,
    "2024-07-20",
    "Enhanced Tonkeeper wallet with additional features for power users.",
    "28/75",
    40
  ),
  createWalletOffer(
    "cryptobot-2",
    "CryptoBot Premium",
    "/cryptobot-premium.jpg",
    "~12kk",
    1500,
    false,
    "2024-06-25",
    "Premium version of CryptoBot with extended functionality and higher limits.",
    "55/120",
    50
  ),
];

// Перемешиваем предложения для раздела "More TON Wallets"
export const moreWalletOffers = [...walletOffers]
  .sort(() => Math.random() - 0.5)
  .map(offer => ({ ...offer, isHot: false }));

export const finalWalletOffers = [...walletOffers, ...moreWalletOffers];

export const getWalletOfferById = (id: string): WalletOffer | undefined => {
  return finalWalletOffers.find(offer => offer.id === id);
};
