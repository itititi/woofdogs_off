'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { finalWalletOffers, WalletOffer } from '@/data/walletOffers';
import { Calendar } from 'lucide-react';

const WalletCard: React.FC<{ offer: WalletOffer }> = ({ offer }) => {
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

  return (
    <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
              <Image src={offer.icon} alt={offer.name} width={48} height={48} className="object-cover" />
            </div>
            <Link href={`/wallet/${offer.id}`}>
              <h3 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors cursor-pointer">
                {offer.name}
              </h3>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 font-semibold text-lg bg-yellow-400/10 px-3 py-1 rounded-full">
              {offer.priceRange}
            </span>
            {offer.isHot ? (
              <span className="text-orange-500 font-semibold text-lg bg-orange-500/10 px-3 py-1 rounded-full">
                🔥
              </span>
            ) : (
              <span className="text-green-500 font-semibold text-lg bg-green-500/10 px-3 py-1 rounded-full">
                🐸
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center text-gray-400 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{offer.createdAt}</span>
        </div>
        <p className="text-gray-400 mb-6 flex-grow">{offer.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-2xl font-bold text-white">${offer.priceUSD}</span>
            {tonPrice && (
              <span className="text-sm text-gray-400 ml-2">
                ≈ {(offer.priceUSD / tonPrice).toFixed(2)} TON
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Available:</span>
            <span className="text-green-500 font-semibold">{offer.available}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WalletShowcase: React.FC = () => {
  const hotOffers = finalWalletOffers.filter(offer => offer.isHot);
  const regularOffers = finalWalletOffers.filter(offer => !offer.isHot);

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Hot TON Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {hotOffers.map((offer) => (
            <WalletCard key={offer.id} offer={offer} />
          ))}
        </div>
        
        <div className="border-t border-[#1C1C1E] my-16"></div>
        
        <h2 className="text-3xl font-bold text-white mb-8 text-center">More TON Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularOffers.map((offer) => (
            <WalletCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletShowcase;
