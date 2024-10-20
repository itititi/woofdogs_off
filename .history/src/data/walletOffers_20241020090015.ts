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

const generateTokenData = (token: TonToken, seed: number, targetValue: number): { balance: number; address: string; value: number } => {
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const tokenPrice = token.price || 1; // Используем цену токена или 1, если цена не указана
  const balance = parseFloat((random() * targetValue / tokenPrice).toFixed(2));
  const value = parseFloat((balance * tokenPrice).toFixed(2));

  return {
    balance,
    address: `EQ${Array.from({length: 20}, () => '0123456789ABCDEF'[Math.floor(random() * 16)]).join('')}`,
    value
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
): WalletOffer => {
  const tokens = tonTokens.slice(0, 6).map((token, index) => {
    const targetValue = priceUSD / 6; // Распределяем общую стоимость равномерно между токенами
    return {
      token,
      ...generateTokenData(token, tokenStartIndex + index, targetValue)
    };
  });

  return {
    id,
    name,
    icon,
    priceRange,
    priceUSD,
    isHot,
    createdAt,
    description,
    available,
    tokens
  };
};

export const walletOffers: WalletOffer[] = [
  createWalletOffer(
    "ton-wallet-1",
    "TON Wallet",
    "/tonwallet.jpg",
    "~23kk",
    23000,
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
    15000,
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
    18000,
    true,
    "2024-07-10",
    "TON Space wallet with advanced features. Ideal for experienced traders.",
    "33/80",
    20
  ),
];

// Функция для создания псевдослучайного числа на основе строки
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Преобразование в 32-битное целое число
  }
  return hash;
};

// Функция для перемешивания массива с использованием фиксированного сида
const shuffleArray = <T>(array: T[], seed: number): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seedRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Простой генератор псевдослучайных чисел на основе сида
const seedRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Создаем дополнительные предложения для раздела "More TON Wallets"
const createMoreOffers = (baseOffers: WalletOffer[]): WalletOffer[] => {
  const moreOffers: WalletOffer[] = [];
  const seed = hashString("WooDogs More Offers"); // Фиксированный сид для стабильного порядка

  for (let i = 0; i < 14; i++) {
    const baseOffer = baseOffers[i % 3];
    const priceUSD = Math.round(baseOffer.priceUSD * (0.8 + seedRandom(seed + i) * 0.4));
    const newOffer: WalletOffer = {
      ...baseOffer,
      id: `${baseOffer.id}-${i + 2}`,
      isHot: false,
      priceUSD: priceUSD,
      priceRange: `~${Math.round(priceUSD / 1000)}kk`,
      available: `${Math.floor(seedRandom(seed + i * 2) * 50 + 10)}/${Math.floor(seedRandom(seed + i * 3) * 50 + 50)}`,
      createdAt: new Date(Date.now() - seedRandom(seed + i * 4) * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tokens: baseOffer.tokens.map((t, index) => {
        const targetValue = priceUSD / 6; // Распределяем общую стоимость равномерно между токенами
        return {
          ...t,
          ...generateTokenData(t.token, hashString(t.token.symbol + i), targetValue)
        };
      })
    };
    moreOffers.push(newOffer);
  }

  // Перемешиваем массив с использованием фиксированного сида
  return shuffleArray(moreOffers, seed);
};

export const moreWalletOffers = createMoreOffers(walletOffers);

export const finalWalletOffers = [...walletOffers, ...moreWalletOffers];

export const getWalletOfferById = (id: string): WalletOffer | undefined => {
  return finalWalletOffers.find(offer => offer.id === id);
};
