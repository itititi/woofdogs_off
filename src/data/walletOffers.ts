import { tonTokens, TonToken } from './tonTokens';

export interface WalletOffer {
  id: string;
  name: string;
  icon: string;
  priceRange: string;
  priceUSD: number;
  auctionPriceUSD: number;
  isHot: boolean;
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

const createInitialWalletOffer = (
  id: string,
  name: string,
  icon: string,
  priceRange: string,
  priceUSD: number,
  isHot: boolean,
  description: string,
  available: string,
  tokenStartIndex: number
): WalletOffer => {
  const auctionPriceUSD = Math.round(priceUSD * (0.8 + Math.random() * 0.15));

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
    auctionPriceUSD,
    isHot,
    description,
    available,
    tokens
  };
};

const initialWalletOffers: WalletOffer[] = [
  createInitialWalletOffer(
    "ton-wallet-1",
    "TON Wallet",
    "/tonwallet.jpg",
    "~200",
    200,
    true,
    "TON Wallet with various features and balance. Great for intermediate users.",
    "23/93",
    0
  ),
  createInitialWalletOffer(
    "cryptobot-1",
    "CryptoBot",
    "/cryptobot.jpg",
    "~1.5k",
    1500,
    true,
    "CryptoBot wallet with Telegram integration. Perfect for beginners.",
    "45/100",
    10
  ),
  createInitialWalletOffer(
    "ton-space-1",
    "TON Space",
    "/tonspace.jpg",
    "~25",
    25,
    true,
    "TON Space wallet with advanced features. Ideal for experienced traders.",
    "33/80",
    20
  ),
];

export const getWalletOffers = (): WalletOffer[] => {
  if (typeof window !== 'undefined') {
    // const storedOffers = localStorage.getItem('walletOffers');
    // if (storedOffers) {
    //   return JSON.parse(storedOffers);
    // }
    // localStorage.setItem('walletOffers', JSON.stringify(initialWalletOffers));
    localStorage.setItem('walletOffers', JSON.stringify(initialWalletOffers));
  }
  return initialWalletOffers;
};

// export const updateWalletOffer = (updatedOffer: WalletOffer) => {
//   if (typeof window !== 'undefined') {
//     const offers = getWalletOffers();
//     const index = offers.findIndex(offer => offer.id === updatedOffer.id);
//     if (index !== -1) {
//       offers[index] = updatedOffer;
//       localStorage.setItem('walletOffers', JSON.stringify(offers));
//     }
//   }
// };
//
// export const getWalletOfferById = (id: string): WalletOffer | undefined => {
//   const offers = getWalletOffers();
//   return offers.find(offer => offer.id === id);
// };

// Функция для создания дополнительных предложений
const createMoreOffers = (baseOffers: WalletOffer[]): WalletOffer[] => {
  const moreOffers: WalletOffer[] = [];
  const seed = hashString("WooDogs More Offers");

  for (let i = 0; i < 14; i++) {
    const baseOffer = baseOffers[i % 3];
    const isNew = seedRandom(seed + i) < 0.3; // 30% шанс быть новым предложением

    const newOffer: WalletOffer = {
      ...baseOffer,
      id: `${baseOffer.id}-${i + 2}`,
      isHot: isNew, // Новые предложения помечаются как "горячие"
      available: `${Math.floor(seedRandom(seed + i * 2) * 50 + 10)}/${Math.floor(seedRandom(seed + i * 3) * 50 + 50)}`,
      tokens: baseOffer.tokens.map(t => ({
        ...t,
        ...generateTokenData(t.token, hashString(t.token.symbol + i))
      }))
    };
    moreOffers.push(newOffer);
  }

  return shuffleArray(moreOffers, seed);
};

export const getMoreWalletOffers = (): WalletOffer[] => {
  if (typeof window !== 'undefined') {
    const storedMoreOffers = localStorage.getItem('moreWalletOffers');
    if (storedMoreOffers) {
      return JSON.parse(storedMoreOffers);
    }
    const moreOffers = createMoreOffers(getWalletOffers());
    localStorage.setItem('moreWalletOffers', JSON.stringify(moreOffers));
    return moreOffers;
  }
  return createMoreOffers(initialWalletOffers);
};

export const getAllWalletOffers = (): WalletOffer[] => {
  return [...getWalletOffers(), ...getMoreWalletOffers()];
};

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
