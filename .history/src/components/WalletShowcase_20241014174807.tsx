'use client';

import React from 'react';
import { finalWalletOffers, WalletOffer } from '@/data/walletOffers';
import OfferCard from './OfferCard';

const WalletShowcase: React.FC = () => {
  const [tonPrice, setTonPrice] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchTonPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        const data = await response.json();
        setTonPrice(data['the-open-network'].usd);
      } catch (error) {
        console.error('Error fetching TON price:', error);
      }
    };

    fetchTonPrice();
    const interval = setInterval(fetchTonPrice, 60000); // Обновляем цену каждую минуту

    return () => clearInterval(interval);
  }, []);

  const renderOfferCard = (offer: WalletOffer) => {
    const tonAmount = tonPrice ? (offer.priceUSD / tonPrice).toFixed(2) : '...';
    const price = `$${offer.priceUSD} (≈${tonAmount} TON)`;

    return (
      <OfferCard
        key={offer.id}
        title={offer.name}
        description={offer.description}
        imageUrl={offer.icon}
        price={price}
        link={`/wallet/${offer.id}`}
      />
    );
  };

  const hotOffers = finalWalletOffers.filter(offer => offer.isHot);
  const regularOffers = finalWalletOffers.filter(offer => !offer.isHot);

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Hot TON Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {hotOffers.map(renderOfferCard)}
        </div>
        
        <div className="border-t border-[#1C1C1E] my-16"></div>
        
        <h2 className="text-3xl font-bold text-white mb-8 text-center">More TON Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularOffers.map(renderOfferCard)}
        </div>
      </div>
    </div>
  );
};

export default WalletShowcase;
