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
    address: string;
  }[];
}

const generateTokenData = (token: TonToken, seed: number): { address: string } => {
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  return {
    address: `EQ${Array.from({length: 20}, () => '0123456789ABCDEF'[Math.floor(random() * 16)]).join('')}`
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
  const tokens = tonTokens
    .filter(token => token.symbol !== 'BOLT')
    .slice(0, 5)
    .map((token, index) => ({
      token: {
        ...token,
        logo: token.symbol === 'JETTON' ? '/jetton.jpg' :
              token.symbol === 'KINGY' ? '/kingy.png' :
              token.symbol === 'NOTCOIN' ? '/notcoin.jpg' :
              token.symbol === 'GRAM' ? '/gram.webp' :
              token.logo
      },
      ...generateTokenData(token, tokenStartIndex + index)
    }));

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
    2300,
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
    1500,
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
    1800,
    true,
    "2024-07-10",
    "TON Space wallet with advanced features. Ideal for experienced traders.",
    "33/80",
    20
  ),
];

// Функция для содания псевдослучайного числ на основе строки
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
  const seed = hashString("WooDogs More Offers");
  const now = new Date();
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

  for (let i = 0; i < 14; i++) {
    const baseOffer = baseOffers[i % 3];
    const isNew = seedRandom(seed + i) < 0.3; // 30% шанс быть новым предложением

    let createdAt: Date;
    if (isNew) {
      // Новые предложения созданы от 0 до 2 дней назад
      createdAt = new Date(twoDaysAgo.getTime() + seedRandom(seed + i * 2) * 2 * 24 * 60 * 60 * 1000);
    } else {
      // Старые предложения созданы от 1 месяца до 1 месяца и 7 дней назад
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      createdAt = new Date(oneMonthAgo.getTime() - seedRandom(seed + i * 3) * sevenDaysInMs);
    }

    const newOffer: WalletOffer = {
      ...baseOffer,
      id: `${baseOffer.id}-${i + 2}`,
      isHot: isNew, // Новые предложения помечаются как "горячие"
      available: `${Math.floor(seedRandom(seed + i * 2) * 50 + 10)}/${Math.floor(seedRandom(seed + i * 3) * 50 + 50)}`,
      createdAt: createdAt.toISOString().split('T')[0],
      tokens: baseOffer.tokens.map(t => ({
        ...t,
        ...generateTokenData(t.token, hashString(t.token.symbol + i))
      }))
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
