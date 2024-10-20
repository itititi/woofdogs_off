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
];

// Создаем дополнительные предложения для раздела "More TON Wallets"
const createMoreOffers = (baseOffers: WalletOffer[]): WalletOffer[] => {
  const moreOffers: WalletOffer[] = [];
  for (let i = 0; i < 14; i++) {
    const baseOffer = baseOffers[i % 3];
    moreOffers.push({
      ...baseOffer,
      id: `${baseOffer.id}-${i + 2}`,
      isHot: false,
      priceUSD: Math.round(baseOffer.priceUSD * (0.8 + Math.random() * 0.4)), // Варьируем цену на ±20%
      priceRange: `~${Math.round(baseOffer.priceUSD * (0.8 + Math.random() * 0.4) / 100)}kk`,
      available: `${Math.floor(Math.random() * 50 + 10)}/${Math.floor(Math.random() * 50 + 50)}`,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tokens: baseOffer.tokens.map(t => ({...t, ...generateTokenData(t.token, i * 100 + t.token.symbol.charCodeAt(0))}))
    });
  }
  return moreOffers;
};

export const moreWalletOffers = createMoreOffers(walletOffers);

export const finalWalletOffers = [...walletOffers, ...moreWalletOffers];

export const getWalletOfferById = (id: string): WalletOffer | undefined => {
  return finalWalletOffers.find(offer => offer.id === id);
};
