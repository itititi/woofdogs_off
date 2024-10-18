import { NextApiRequest, NextApiResponse } from 'next';

let cachedPrice: number | null = null;
let lastUpdateTime: number = 0;

async function fetchTONPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
    const data = await response.json();
    return data['the-open-network'].usd;
  } catch (error) {
    console.error('Ошибка при получении цены TON:', error);
    throw error;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = Date.now();
  
  if (!cachedPrice || currentTime - lastUpdateTime > 60000) { // Обновляем цену каждую минуту
    try {
      cachedPrice = await fetchTONPrice();
      lastUpdateTime = currentTime;
    } catch (error) {
      console.error('Ошибка при обновлении кэшированной цены:', error);
      res.status(500).json({ error: 'Не удалось получить цену TON' });
      return;
    }
  }

  res.status(200).json({ price: cachedPrice });
}
