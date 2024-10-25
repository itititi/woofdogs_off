import { getAllWalletOffers, WalletOffer } from './walletOffers';

export async function getWalletData(id: string): Promise<WalletOffer | null> {
  // Имитация задержки загрузки
  await new Promise(resolve => setTimeout(resolve, 100));

  const allWalletOffers = getAllWalletOffers();
  const wallet = allWalletOffers.find(offer => offer.id === id);
  return wallet || null;
}
