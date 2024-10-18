import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
    const data = await response.json();
    res.status(200).json({ price: data['the-open-network'].usd });
  } catch (error) {
    console.error('Ошибка при получении цены TON:', error);
    res.status(500).json({ error: 'Не удалось получить цену TON' });
  }
}
