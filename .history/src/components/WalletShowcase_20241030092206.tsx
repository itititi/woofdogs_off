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
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [auctionPrice, setAuctionPrice] = useState<number>(offer.auctionPriceUSD);

  const auctionEndTime = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const storedEndTime = localStorage.getItem(`auctionEndTime_${offer.id}`);
    if (storedEndTime) {
      return parseInt(storedEndTime, 10);
    }
    const seed = offer.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = Math.sin(seed) * 10000;
    const hours = Math.floor(random % 48); // От 0 до 47 часов
    const endTime = Date.now() + hours * 3600000;
    localStorage.setItem(`auctionEndTime_${offer.id}`, endTime.toString());
    return endTime;
  }, [offer.id]);

  useEffect(() => {
    const storedAuctionPrice = localStorage.getItem(`auctionPrice_${offer.id}`);
    if (storedAuctionPrice) {
      setAuctionPrice(parseFloat(storedAuctionPrice));
    } else {
      localStorage.setItem(`auctionPrice_${offer.id}`, offer.auctionPriceUSD.toString());
    }
  }, [offer.id, offer.auctionPriceUSD]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const difference = auctionEndTime - now;

      if (difference <= 0) {
        setIsAuctionEnded(true);
        setTimeLeft('Ended');
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        setTimeLeft(`${hours}h ${minutes}m`);
        setIsAuctionEnded(false);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000); // Обновляем каждую минуту

    return () => clearInterval(timer);
  }, [auctionEndTime]);

  return (
    <Link href={`/wallet/${offer.id}`}>
      <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl flex flex-col h-full cursor-pointer border border-[#2A2A2E] hover:border-[#3AABEE]/20">
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[22%] overflow-hidden mr-3 shadow-lg">
              <Image src={offer.icon} alt={offer.name} width={64} height={64} className="object-cover" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg sm:text-xl font-bold titanium-gradient mb-1">{offer.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-yellow-400 font-medium bg-yellow-400/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {offer.priceRange}
                </span>
                {offer.isHot && (
                  <span className="text-xs text-orange-500 font-medium bg-orange-500/10 px-2 py-0.5 rounded-full animate-pulse whitespace-nowrap">
                    🔥 Hot
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4 line-clamp-2">{offer.description}</p>
          <div className="mt-auto">
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#A0D8EF] to-[#3AABEE] text-transparent bg-clip-text">
                  ${offer.priceUSD}
                </span>
                <span className="text-xs text-gray-400 ml-1">Balance</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-green-500">${auctionPrice}</span>
                <span className="text-xs text-gray-400 ml-1">Auction</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#1A1A1A] rounded-lg px-3 py-2">
              <span className="text-xs text-gray-400">Bid ends in:</span>
              <span className={`text-sm font-medium ${
                isAuctionEnded ? 'text-red-500' : 'text-[#3AABEE]'
              }`}>
                {timeLeft}
              </span>
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
          <h2 className="text-2xl font-bold titanium-gradient mb-4 text-center">Горячие TON кошельки</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, index) => (
              <WalletCardSkeleton key={index} />
            ))}
          </div>
          
          <div className="border-t border-[#2A2A2E] my-6"></div>
          
          <h2 className="text-2xl font-bold titanium-gradient mb-4 text-center">Больше TON кошельков</h2>
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
    <div className="bg-black flex-grow pt-6 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="border-t border-[#2A2A2E] mb-8"></div>
        {hotOffers.length > 0 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold titanium-gradient mb-6 text-center">Hot TON Wallets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
              {hotOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)}
            </div>
            
            <div className="border-t border-[#2A2A2E] my-8"></div>
          </>
        )}
        
        {regularOffers.length > 0 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold titanium-gradient mb-6 text-center">More TON Wallets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {regularOffers.map((offer) => <WalletCard key={offer.id} offer={offer} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletShowcase;
