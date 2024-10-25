'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { getWalletData } from '@/data/getWalletData';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import WalletSkeleton from '@/components/WalletSkeleton';
import { WalletOffer } from '@/data/walletOffers';

interface WalletPageProps {
  params: {
    id: string;
  };
}

const getWalletContents = (walletName: string) => {
  switch (walletName) {
    case 'CryptoBot':
      return "Telegram account with CryptoBot wallet";
    case 'TON Wallet':
      return "TON Wallet account";
    case 'TON Space':
      return "Seed phrases for TON Space wallet";
    default:
      return "Wallet account details";
  }
};

export default function WalletPage({ params }: WalletPageProps) {
  const [wallet, setWallet] = useState<WalletOffer | null>(null);
  const [tonAmount, setTonAmount] = useState<string>('N/A');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [bidPrice, setBidPrice] = useState<number | null>(null);
  const [blitzPrice, setBlitzPrice] = useState<number | null>(null);

  const additionalTokensCount = useMemo(() => {
    if (!wallet) return 5;
    // Используем id кошелька для генерации псевдослучайного числа
    const seed = params.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 5 + (seed % 6); // Генерируем число от 5 до 10
  }, [params.id, wallet]);

  const auctionEndTime = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const storedEndTime = localStorage.getItem(`auctionEndTime_${params.id}`);
    if (storedEndTime) {
      return parseInt(storedEndTime, 10);
    }
    // Если нет сохраненного времени, генерируем новое
    const seed = params.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = Math.sin(seed) * 10000;
    const hours = Math.floor(random % 48); // От 0 до 47 часов
    const endTime = Date.now() + hours * 3600000;
    localStorage.setItem(`auctionEndTime_${params.id}`, endTime.toString());
    return endTime;
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const walletData = await getWalletData(params.id);
      if (!walletData) {
        router.push('/404');
        return;
      }
      setWallet(walletData);

      const storedBidPrice = localStorage.getItem(`bidPrice_${params.id}`);
      if (storedBidPrice) {
        setBidPrice(parseFloat(storedBidPrice));
      } else {
        const newBidPrice = Math.round(walletData.priceUSD * (1.05 + Math.random() * 0.1)); // 105-115% от priceUSD
        setBidPrice(newBidPrice);
        localStorage.setItem(`bidPrice_${params.id}`, newBidPrice.toString());
      }

      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        const data = await response.json();
        const tonPrice = data['the-open-network'].usd;
        setTonAmount((walletData.priceUSD / tonPrice).toFixed(2));
      } catch (error) {
        console.error('Error fetching TON price:', error);
      }

      // Генерация цен
      const basePrice = walletData.priceUSD;
      setBlitzPrice(Math.round(basePrice * 1.2)); // Блиц-цена еще выше

      setIsLoading(false);
    };

    fetchData();
  }, [params.id, router]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const difference = auctionEndTime - now;

      if (difference <= 0) {
        setIsAuctionEnded(true);
        setTimeLeft('Auction ended');
      } else {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        setIsAuctionEnded(false);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [auctionEndTime]);

  const handleClose = () => {
    router.push('/');
  };

  if (isLoading) {
    return <WalletSkeleton />;
  }

  if (!wallet) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src={wallet.icon}
              alt={wallet.name}
              layout="fill"
              objectFit="cover"
              className="opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">{wallet.name}</h1>
              <p className="text-xl sm:text-2xl text-gray-300">{wallet.description}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div className="w-full sm:w-auto mb-4 sm:mb-0">
                <span className="text-3xl sm:text-4xl font-bold">${wallet.priceUSD}</span>
                <span className="text-xl text-gray-400 ml-2">≈ {tonAmount} TON</span>
              </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full mb-2 sm:mb-0 sm:mr-2">
                  {wallet.priceRange}
                </span>
                {wallet.isHot ? (
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full animate-pulse">
                    🔥 Hot
                  </span>
                ) : (
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full">
                    🐸 Cool
                  </span>
                )}
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Auction Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400">Current Bid</p>
                  <p className="text-2xl font-bold text-green-400">${bidPrice}</p>
                  <p className="text-sm text-green-400">Save ${(wallet.priceUSD - bidPrice).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Buy Now Price</p>
                  <p className="text-2xl font-bold text-yellow-400">${blitzPrice}</p>
                  <p className="text-sm text-red-400">Premium ${(blitzPrice - wallet.priceUSD).toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-bold mb-2">{isAuctionEnded ? 'Auction Ended' : 'Time Left'}</p>
                <p className="text-3xl font-bold text-blue-400">{timeLeft}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:-translate-y-1">
                Place Bid: ${bidPrice}
              </button>
              <button className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-700 text-white text-xl font-bold py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-yellow-800 transition duration-300 ease-in-out transform hover:-translate-y-1">
                Buy Now: ${blitzPrice}
              </button>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Included Tokens</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {wallet.tokens.map((tokenData, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-3 flex items-center">
                    <Image
                      src={tokenData.token.logo}
                      alt={tokenData.token.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <span className="font-medium">{tokenData.token.symbol}</span>
                  </div>
                ))}
                <div className="bg-gray-700 rounded-lg p-3 flex items-center justify-center">
                  <span className="font-medium text-blue-400">
                    +{additionalTokensCount} more
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">What You'll Get</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{getWalletContents(wallet.name)}</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Detailed setup and usage instructions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access to exclusive trading opportunities</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bonus: Secret tips from top TON traders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
