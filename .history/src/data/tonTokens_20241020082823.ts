export interface TonToken {
  symbol: string;
  name: string;
  logo: string;
}

export const tonTokens: TonToken[] = [
  { symbol: 'TON', name: 'Toncoin', logo: 'https://ton.org/download/ton_symbol.png' },
  { symbol: 'KINGY', name: 'Kingycoin', logo: 'https://kingycoin.org/logo.png' },
  { symbol: 'NOTCOIN', name: 'Notcoin', logo: 'https://notcoin.io/logo.png' },
  { symbol: 'BOLT', name: 'Bolt', logo: 'https://bolt.ton.org/logo.png' },
  { symbol: 'GRAM', name: 'Gram', logo: 'https://gram.org/logo.png' },
  { symbol: 'JETTON', name: 'Jetton', logo: 'https://jetton.live/logo.png' },
  { symbol: 'TONEX', name: 'TonEx', logo: 'https://tonex.io/logo.png' },
  { symbol: 'SCALE', name: 'Scale', logo: 'https://scale.exchange/logo.png' },
  { symbol: 'ORBIT', name: 'Orbit', logo: 'https://orbitchain.io/logo.png' },
  { symbol: 'TEGRO', name: 'Tegro', logo: 'https://tegro.io/logo.png' },
  // Добавьте еще токены по необходимости
];
