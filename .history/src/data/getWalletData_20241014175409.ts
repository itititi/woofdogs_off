import { finalWalletOffers, WalletOffer } from './walletOffers';

export async function getWalletData(id: string): Promise<WalletOffer | null> {
  // Имитация задержки запроса к API
  await new Promise(resolve => setTimeout(resolve, 100));

  const wallet = finalWalletOffers.find(offer => offer.id === id);
  return wallet || null;
}
