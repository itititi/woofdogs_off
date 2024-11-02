'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllWalletOffers, WalletOffer } from '@/data/walletOffers';
import { useSearch } from './SearchContext';

interface WalletCardProps {
  offer: WalletOffer;
}

const WalletCard: React.FC<WalletCardProps> = ({ offer }) => {
  const isLargeScreen = window.innerWidth >= 1920;

  if (isLargeScreen) {
    return (
      <Link href={`/wallet/${offer.id}`}>
        <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 border border-[#2A2A2E] hover:border-[#3AABEE]/20 transition-all duration-300 flex items-center">
          <div className="flex items-center flex-1">
            <div className="w-12 h-12 rounded-[22%] overflow-hidden mr-4 shadow-lg">
              <Image 
                src={offer.icon} 
                alt={offer.name} 
                width={48} 
                height={48} 
                className="object-cover" 
              />
            </div>
            <div className="flex-1">
              <h1 className="text-[20px] font-bold titanium-gradient mb-1">{offer.name}</h1>
              <p className="text-[14px] text-gray-300 line-clamp-1">{offer.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-6">
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-yellow-400 font-medium bg-yellow-400/10 px-3 py-1 rounded-full">
                {offer.priceRange}
              </span>
              {offer.isHot && (
                <span className="text-[14px] text-orange-500 font-medium bg-orange-500/10 px-3 py-1 rounded-full animate-pulse">
                  🔥 Hot
                </span>
              )}
            </div>

            <div className="flex items-center gap-8 min-w-[300px]">
              <div className="flex flex-col">
                <span className="text-[20px] font-bold bg-gradient-to-br from-[#A0D8EF] via-[#3AABEE] to-[#1E90FF] text-transparent bg-clip-text">
                  ${offer.priceUSD}
                </span>
                <div className="flex items-center gap-4 text-[14px]">
                  <div className="flex items-center">
                    <span className="text-gray-400">Bid:</span>
                    <span className="text-green-500 font-semibold ml-1">${offer.auctionPriceUSD}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400">Buy:</span>
                    <span className="text-yellow-500 font-semibold ml-1">
                      ${Math.round((offer.priceUSD + offer.auctionPriceUSD) / 2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="bg-[#3AABEE] text-white py-2 px-4 rounded-full text-[14px] font-medium hover:bg-[#2691D9] transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/wallet/${offer.id}`}>
      <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 border border-[#2A2A2E] hover:border-[#3AABEE]/20 transition-all duration-300 h-[240px] sm:h-[260px] flex flex-col">
        {/* Header section */}
        <div className="flex items-center mb-3 sm:mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[22%] overflow-hidden mr-3 shadow-lg">
            <Image 
              src={offer.icon} 
              alt={offer.name} 
              width={56} 
              height={56} 
              className="object-cover sm:scale-100 scale-75" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[20px] sm:text-[24px] font-bold titanium-gradient mb-2 truncate">{offer.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-[14px] sm:text-[14px] text-yellow-400 font-medium bg-yellow-400/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                {offer.priceRange}
              </span>
              {offer.isHot && (
                <span className="text-[14px] sm:text-[14px] text-orange-500 font-medium bg-orange-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full animate-pulse">
                  🔥 Hot
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] sm:text-[14px] text-gray-300 mb-6 line-clamp-2 leading-relaxed">{offer.description}</p>

        {/* Price section */}
        <div className="bg-[#1A1A1A] rounded-2xl p-3 sm:p-4 mt-auto">
          <div className="flex flex-col sm:flex-col gap-2">
            <div className="flex items-baseline">
              <span className="text-[18px] sm:text-[20px] font-bold bg-gradient-to-br from-[#A0D8EF] via-[#3AABEE] to-[#1E90FF] text-transparent bg-clip-text">
                ${offer.priceUSD}
              </span>
              <span className="text-[14px] text-gray-400 ml-1.5 sm:ml-2">Balance</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[14px] text-gray-400">Bid:</span>
                <span className="text-[14px] font-semibold text-green-500 ml-1.5 sm:ml-2">${offer.auctionPriceUSD}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[14px] text-gray-400">Buy:</span>
                <span className="text-[14px] font-semibold text-yellow-500 ml-1.5 sm:ml-2">
                  ${Math.round((offer.priceUSD + offer.auctionPriceUSD) / 2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const WalletCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-md flex flex-col h-full border border-[#2A2A2E] animate-pulse">
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-[22%] mr-3"></div>
            <div className="h-6 w-24 bg-gray-700 rounded"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-12 bg-gray-700 rounded-full"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-3"></div>
        <div className="flex justify-between items-center mt-auto">
          <div>
            <div className="h-5 w-16 bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-12 bg-gray-700 rounded"></div>
          </div>
          <div>
            <div className="h-5 w-16 bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-12 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="h-4 w-16 bg-gray-700 rounded mr-2"></div>
          <div className="h-4 w-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const WalletShowcase: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tonPrice, setTonPrice] = useState<number | null>(null);
  const { searchTerm } = useSearch();
  const [walletOffers, setWalletOffers] = useState<WalletOffer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ton-price');
        if (!response.ok) {
          throw new Error('Error fetching TON price');
        }
        const data = await response.json();
        setTonPrice(data.price);
        setWalletOffers(getAllWalletOffers());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredOffers = useMemo(() => {
    return walletOffers.filter((offer: WalletOffer) =>
      offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [walletOffers, searchTerm]);

  const offersWithTonAmount = useMemo(() => {
    return filteredOffers.map((offer: WalletOffer) => ({
      ...offer,
      tonAmount: tonPrice ? (offer.priceUSD / tonPrice).toFixed(2) : 'N/A'
    }));
  }, [filteredOffers, tonPrice]);

  const hotOffers = useMemo(() => offersWithTonAmount.filter((offer: WalletOffer) => offer.isHot), [offersWithTonAmount]);
  const regularOffers = useMemo(() => offersWithTonAmount.filter((offer: WalletOffer) => !offer.isHot), [offersWithTonAmount]);

  if (isLoading) {
    return (
      <div className="bg-black flex-grow pt-6 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-[#2A2A2E] mb-6"></div>
          <h2 className="text-2xl font-bold titanium-gradient mb-4 text-center">Hot TON Wallets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, index) => (
              <WalletCardSkeleton key={index} />
            ))}
          </div>
          
          <div className="border-t border-[#2A2A2E] my-6"></div>
          
          <h2 className="text-2xl font-bold titanium-gradient mb-4 text-center">More TON Wallets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <WalletCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (filteredOffers.length === 0) {
    return (
      <div className="bg-black min-h-screen pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full text-center">
          <div className="mb-6 transition-all duration-300" style={{ height: '160px' }}>
            <Image 
              src="/notfound.gif" 
              alt="Not Found" 
              width={160} 
              height={160} 
              className="mx-auto object-contain rounded-[22%]"
            />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="titanium-gradient">Oops, nothing found</span>
          </h2>
          <p className="text-sm sm:text-base mb-4 text-gray-300 max-w-2xl mx-auto">
            We couldn't find any wallets matching your search. Try different keywords or browse our available options.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black flex-grow py-4 mt-14 sm:mt-16">
      <div className="max-w-7xl mx-auto">
        {hotOffers.length > 0 && (
          <>
            <div className="border-t border-[#2A2A2E] mb-6"></div>
            <h2 className="text-[32px] font-bold titanium-gradient mb-6 text-center">Hot TON Wallets</h2>
            <div className="grid grid-cols-1 gap-4 px-6 sm:px-8 lg:px-10 mb-10">
              {hotOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)}
            </div>
          </>
        )}
        
        {regularOffers.length > 0 && (
          <>
            <div className="border-t border-[#2A2A2E] mb-6"></div>
            <h2 className="text-[32px] font-bold titanium-gradient mb-6 text-center">More TON Wallets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-1 gap-4 px-6 sm:px-8 lg:px-10">
              {regularOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletShowcase;
