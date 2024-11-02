'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllWalletOffers, WalletOffer } from '@/data/walletOffers';
import { useSearch } from './SearchContext';

interface IPhoneOffer {
  id: string;
  name: string;
  description: string;
  icon: string;
  priceUSD: number;
  auctionPriceUSD: number;
  priceRange: string;
  isHot: boolean;
  storage: string;
  color: string;
}

const WalletCard: React.FC<{ offer: WalletOffer | IPhoneOffer }> = ({ offer }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getStatus = (id: string) => {
    const statusMap: { [key: string]: { emoji: string; text: string; color: string } | null } = {
      'ton-wallet-1': { emoji: '🛡️', text: 'Secure', color: 'text-blue-400 bg-blue-400/10' },
      'cryptobot-1': { emoji: '🍅', text: 'Fresh', color: 'text-red-400 bg-red-400/10' },
      'ton-space-1': { emoji: '⚡️', text: 'Fast', color: 'text-yellow-400 bg-yellow-400/10' },
      'ton-wallet-1-2': { emoji: '💎', text: 'Premium', color: 'text-purple-400 bg-purple-400/10' },
      'cryptobot-1-2': { emoji: '🚀', text: 'Powerful', color: 'text-green-400 bg-green-400/10' },
      'iphone-15-pro-1': { emoji: '⚡️', text: 'Pro', color: 'text-purple-400 bg-purple-400/10' },
      'iphone-15-1': { emoji: '💫', text: 'New', color: 'text-blue-400 bg-blue-400/10' },
      'iphone-15-plus-1': { emoji: '🔥', text: 'Plus', color: 'text-orange-400 bg-orange-400/10' },
    };
    return statusMap[id] || null;
  };

  const status = getStatus(offer.id);

  if (isLargeScreen) {
    return (
      <Link href={`/wallet/${offer.id}`}>
        <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-5 border border-[#2A2A2E] hover:border-[#3AABEE]/20 hover:shadow-[0_0_20px_rgba(58,171,238,0.1)] hover:bg-[#1A1A1A] transition-all duration-300 flex items-center group">
          <div className="flex items-center flex-1">
            <div className="w-14 h-14 rounded-[22%] overflow-hidden mr-4 shadow-lg relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image 
                src={offer.icon} 
                alt={offer.name} 
                width={56} 
                height={56} 
                className="object-cover w-full h-full" 
              />
            </div>
            <div className="flex-1">
              <h1 className="text-[20px] font-bold titanium-gradient mb-1.5 group-hover:text-[#3AABEE] transition-colors duration-300">{offer.name}</h1>
              <p className="text-[14px] text-gray-400 group-hover:text-gray-300 transition-colors duration-300 line-clamp-1">{offer.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-yellow-400 font-medium bg-yellow-400/10 px-3 py-1.5 rounded-xl border border-yellow-400/20">
                {offer.priceRange}
              </span>
              {offer.isHot && (
                <span className="text-[14px] text-orange-500 font-medium bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-500/20 animate-pulse">
                  🔥 Hot
                </span>
              )}
              {status && (
                <span className={`text-[14px] font-medium px-3 py-1.5 rounded-xl border ${status.color} border-current/20`}>
                  {status.emoji} {status.text}
                </span>
              )}
            </div>

            <div className="flex items-center gap-8 min-w-[300px]">
              <div className="flex flex-col">
                <span className="text-[24px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text group-hover:from-[#3AABEE] group-hover:to-[#2691D9] transition-all duration-300">
                  ${offer.priceUSD}
                </span>
                <div className="flex items-center gap-6 text-[14px]">
                  <div className="flex items-center">
                    <span className="text-gray-400">Bid:</span>
                    <span className="text-green-500 font-semibold ml-2">${offer.auctionPriceUSD}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-400">Buy:</span>
                    <span className="text-yellow-500 font-semibold ml-2">
                      ${Math.round((offer.priceUSD + offer.auctionPriceUSD) / 2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="relative group h-11 px-6 rounded-xl overflow-hidden flex items-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] hover:from-[#2691D9] hover:to-[#1E88E5] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                <span className="text-[14px] font-semibold text-white z-10">View Details</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/wallet/${offer.id}`}>
      <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 border border-[#2A2A2E] hover:border-[#2A2A2E] hover:shadow-[0_0_20px_rgba(42,42,46,0.7)] hover:bg-[#1A1A1A] transition-all duration-300 h-[260px] sm:h-[260px] flex flex-col">
        {/* Header section */}
        <div className="flex items-center mb-3">
          <div className="w-14 h-14 sm:w-14 sm:h-14 rounded-[22%] overflow-hidden mr-3 shadow-lg">
            <Image 
              src={offer.icon} 
              alt={offer.name} 
              width={56} 
              height={56} 
              className="object-cover w-full h-full" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[20px] sm:text-[24px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text mb-2 truncate">
              {offer.name}
            </h1>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[14px] sm:text-[14px] text-yellow-400 font-medium bg-yellow-400/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                {offer.priceRange}
              </span>
              {'storage' in offer && (
                <span className="text-[14px] sm:text-[14px] text-blue-400 font-medium bg-blue-400/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                  {offer.storage}
                </span>
              )}
              {status && (
                <span className={`text-[14px] sm:text-[14px] font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full ${status.color} flex-shrink-0`}>
                  {status.emoji} {status.text}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[14px] text-gray-300 mb-4 line-clamp-1 overflow-hidden text-ellipsis">
          {offer.description}
        </p>

        {/* Price section */}
        <div className="bg-[#1A1A1A] rounded-xl p-4 mt-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[24px] sm:text-[24px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">
                ${offer.priceUSD}
              </span>
              <span className="text-[14px] text-gray-400">Price</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[14px] text-gray-400">Bid:</span>
                <span className="text-[16px] font-semibold text-green-500 ml-1.5 sm:ml-2">${offer.auctionPriceUSD}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[14px] text-gray-400">Buy:</span>
                <span className="text-[16px] font-semibold text-yellow-500 ml-1.5 sm:ml-2">
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
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (isLargeScreen) {
    return (
      <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 border border-[#2A2A2E] animate-pulse flex items-center">
        <div className="flex items-center flex-1">
          <div className="w-12 h-12 bg-[#2A2A2E] rounded-[22%] mr-4"></div>
          <div className="flex-1">
            <div className="h-5 w-32 bg-[#2A2A2E] rounded-xl mb-2"></div>
            <div className="h-4 w-2/3 bg-[#2A2A2E] rounded-xl"></div>
          </div>
        </div>

        <div className="flex items-center gap-6 ml-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-24 bg-[#2A2A2E] rounded-xl"></div>
            <div className="h-6 w-20 bg-[#2A2A2E] rounded-xl"></div>
            <div className="h-6 w-24 bg-[#2A2A2E] rounded-xl"></div>
          </div>

          <div className="flex items-center gap-8 min-w-[300px]">
            <div className="flex flex-col gap-2">
              <div className="h-6 w-20 bg-[#2A2A2E] rounded-xl"></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="h-4 w-8 bg-[#2A2A2E] rounded-xl"></div>
                  <div className="h-4 w-12 bg-[#2A2A2E] rounded-xl"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-8 bg-[#2A2A2E] rounded-xl"></div>
                  <div className="h-4 w-12 bg-[#2A2A2E] rounded-xl"></div>
                </div>
              </div>
            </div>

            <div className="h-10 w-[120px] bg-[#2A2A2E] rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 border border-[#2A2A2E] animate-pulse h-[240px] sm:h-[260px] flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#2A2A2E] rounded-[22%] mr-3"></div>
        <div className="flex-1">
          <div className="h-6 w-32 bg-[#2A2A2E] rounded-xl mb-2"></div>
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-[#2A2A2E] rounded-xl"></div>
            <div className="h-6 w-16 bg-[#2A2A2E] rounded-xl"></div>
          </div>
        </div>
      </div>
      
      <div className="h-4 bg-[#2A2A2E] rounded-xl w-full mb-2"></div>
      <div className="h-4 bg-[#2A2A2E] rounded-xl w-5/6 mb-6"></div>
      
      <div className="mt-auto bg-[#1A1A1A] rounded-xl p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-center gap-2">
              <div className="h-5 w-16 bg-[#2A2A2E] rounded-xl"></div>
              <div className="h-4 w-14 bg-[#2A2A2E] rounded-xl"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="h-4 w-6 bg-[#2A2A2E] rounded-xl"></div>
              <div className="h-4 w-12 bg-[#2A2A2E] rounded-xl"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-6 bg-[#2A2A2E] rounded-xl"></div>
              <div className="h-4 w-12 bg-[#2A2A2E] rounded-xl"></div>
            </div>
          </div>
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
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredOffers = useMemo(() => {
    return walletOffers.filter((offer: WalletOffer | IPhoneOffer) =>
      offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [walletOffers, searchTerm]);

  const offersWithTonAmount = useMemo(() => {
    return filteredOffers.map((offer: WalletOffer | IPhoneOffer) => ({
      ...offer,
      tonAmount: tonPrice ? (offer.priceUSD / tonPrice).toFixed(2) : 'N/A'
    }));
  }, [filteredOffers, tonPrice]);

  const hotOffers = useMemo(() => offersWithTonAmount.filter((offer: WalletOffer | IPhoneOffer) => offer.isHot), [offersWithTonAmount]);
  const regularOffers = useMemo(() => offersWithTonAmount.filter((offer: WalletOffer | IPhoneOffer) => !offer.isHot), [offersWithTonAmount]);

  if (isLoading) {
    return (
      <div className="bg-black flex-grow py-4 mt-14 sm:mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-[#2A2A2E]/50 backdrop-blur-sm"></div>
          <div className="px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">
              Hot TON Wallets
            </h2>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 mb-12 sm:mb-14 lg:mb-16">
              {[...Array(4)].map((_, index) => (
                <WalletCardSkeleton key={index} />
              ))}
            </div>
          </div>
          
          <div className="border-t border-[#2A2A2E]/50 backdrop-blur-sm"></div>
          <div className="px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">
              More TON Wallets
            </h2>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4">
              {[...Array(8)].map((_, index) => (
                <WalletCardSkeleton key={index} />
              ))}
            </div>
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
    <div className="bg-black flex-grow py-4 mt-[72px] sm:mt-20 lg:mt-24">
      <div className="max-w-7xl mx-auto">
        {hotOffers.length > 0 && (
          <>
            <div className="border-t border-[#2A2A2E]/50 backdrop-blur-sm"></div>
            <div className="px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">
                Hot TON Wallets
              </h2>
              <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 mb-12 sm:mb-14 lg:mb-16">
                {hotOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)}
              </div>
            </div>
          </>
        )}
        
        {regularOffers.length > 0 && (
          <>
            <div className="border-t border-[#2A2A2E]/50 backdrop-blur-sm"></div>
            <div className="px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 lg:pt-12 pb-8">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">
                More TON Wallets
              </h2>
              <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                {regularOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletShowcase;
