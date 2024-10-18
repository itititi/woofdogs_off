import { NextApiRequest, NextApiResponse } from 'next';

let cachedPrice: number | null = null;
let lastUpdateTime: number = 0;

async function fetchTONPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
    if (!response.ok) {
      throw new Error('Failed to fetch TON price');
    }
    const data = await response.json();
    return data['the-open-network'].usd;
  } catch (error) {
    console.error('Error fetching TON price:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = Date.now();
  const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

  if (!cachedPrice || currentTime - lastUpdateTime > thirtyMinutes) {
    try {
      cachedPrice = await fetchTONPrice();
      lastUpdateTime = currentTime;
    } catch (error) {
      console.error('Error updating cached price:', error);
      res.status(500).json({ error: 'Failed to fetch TON price' });
      return;
    }
  }

  res.status(200).json({ price: cachedPrice });
}
