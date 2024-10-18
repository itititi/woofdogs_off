export interface WalletOffer {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
  priceRange: string;
  description: string;
  priceUSD: number;
  available: string;
  isHot?: boolean;
}

const generateRandomPrice = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1) + min);

const generateOffer = (name: string, index: number, isHot: boolean = false): WalletOffer => ({
  id: `${name.toLowerCase().replace(' ', '')}-${index}`,
  name,
  icon: `/${name.toLowerCase().replace(' ', '')}.jpg`,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  priceRange: `~${generateRandomPrice(10, 120)}kk`,
  description: `${name} with various features and balance. Great for ${['beginners', 'intermediate users', 'advanced traders'][index % 3]}.`,
  priceUSD: generateRandomPrice(500, 5000),
  available: `${generateRandomPrice(1, 50)}/${generateRandomPrice(50, 100)}`,
  isHot,
});

export const walletOffers: WalletOffer[] = [
  // Hot offers
  generateOffer('TON Wallet', 1, true),
  generateOffer('CryptoBot', 2, true),
  generateOffer('TON Space', 3, true),
  
  // Regular offers
  ...Array(4).fill(null).map((_, i) => generateOffer('TON Wallet', i + 4)),
  ...Array(3).fill(null).map((_, i) => generateOffer('CryptoBot', i + 8)),
  ...Array(3).fill(null).map((_, i) => generateOffer('TON Space', i + 11)),
];

// Shuffle the regular offers to make them appear more random
const hotOffers = walletOffers.slice(0, 3);
const shuffledRegularOffers = walletOffers.slice(3).sort(() => Math.random() - 0.5);

export const finalWalletOffers = [...hotOffers, ...shuffledRegularOffers];
