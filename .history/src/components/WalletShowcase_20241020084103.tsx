'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { walletOffers, WalletOffer } from '@/data/walletOffers';
import { Calendar } from 'lucide-react';
import WalletCardSkeleton from './WalletCardSkeleton';
import { useSearch } from './SearchContext';

const WalletCard: React.FC<{ offer: WalletOffer }> = ({ offer }) => {
  const [tonPrice, setTonPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTonPrice = async () => {
      try {
        const response = await fetch('/api/ton-price');
        if (!response.ok) {
          throw new Error('Error fetching TON price');
        }
        const data = await response.json();
        setTonPrice(data.price);
        setError(null);
      } catch (error) {
        console.error('Error fetching TON price:', error);
        setError('Failed to fetch TON price');
      }
    };

    fetchTonPrice();
    const interval = setInterval(fetchTonPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Link href={`/wallet/${offer.id}`}>
      <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col h-full cursor-pointer border border-[#2A2A2E]">
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
                <Image src={offer.icon} alt={offer.name} width={48} height={48} className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">
                {offer.name}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 font-semibold text-sm bg-yellow-400/10 px-2 py-1 rounded-full">
                {offer.priceRange}
              </span>
              {offer.isHot ? (
                <span className="text-orange-500 font-semibold text-sm bg-orange-500/10 px-2 py-1 rounded-full">
                  🔥
                </span>
              ) : (
                <span className="text-green-500 font-semibold text-sm bg-green-500/10 px-2 py-1 rounded-full">
                  🐸
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center text-gray-400 mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{offer.createdAt}</span>
          </div>
          <p className="text-gray-300 mb-6 flex-grow">{offer.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <div>
              <span className="text-2xl font-bold text-white">${offer.priceUSD}</span>
              {tonPrice ? (
                <span className="text-sm text-gray-400 ml-2">
                  ≈ {(offer.priceUSD / tonPrice).toFixed(2)} TON
                </span>
              ) : error ? (
                <span className="text-sm text-red-400 ml-2">{error}</span>
              ) : (
                <span className="text-sm text-gray-400 ml-2">Загрузка...</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2 text-sm">Available:</span>
              <span className="text-green-500 font-semibold">{offer.available}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const WalletShowcase: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredOffers = walletOffers.filter(offer =>
    offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hotOffers = filteredOffers.filter(offer => offer.isHot);
  const regularOffers = filteredOffers.filter(offer => !offer.isHot);

  if (isLoading) {
    return (
      <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text mb-8 text-center">Hot TON Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, index) => (
              <WalletCardSkeleton key={index} />
            ))}
          </div>
          
          <div className="border-t border-[#2A2A2E] my-16"></div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text mb-8 text-center">More TON Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <WalletCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text mb-8 text-center">Hot TON Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading
            ? [...Array(3)].map((_, index) => <WalletCardSkeleton key={index} />)
            : hotOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)
          }
        </div>
        
        <div className="border-t border-[#2A2A2E] my-16"></div>
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text mb-8 text-center">More TON Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? [...Array(6)].map((_, index) => <WalletCardSkeleton key={index} />)
            : regularOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)
          }
        </div>
      </div>
    </div>
  );
};

export default WalletShowcase;
