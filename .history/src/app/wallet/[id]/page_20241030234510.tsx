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

  const additionalTokensCount = useMemo(() => {
    if (!wallet) return 5;
    const seed = params.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 5 + (seed % 6);
  }, [params.id, wallet]);

  const auctionEndTime = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const storedEndTime = localStorage.getItem(`auctionEndTime_${params.id}`);
    if (storedEndTime) {
      return parseInt(storedEndTime, 10);
    }
    const seed = params.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = Math.sin(seed) * 10000;
    const hours = Math.floor(random % 48);
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

      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        const data = await response.json();
        const tonPrice = data['the-open-network'].usd;
        setTonAmount((walletData.priceUSD / tonPrice).toFixed(2));
      } catch (error) {
        console.error('Error fetching TON price:', error);
      }

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

  const walletContents = getWalletContents(wallet.name);
  const buyNowPrice = Math.round((wallet.priceUSD + wallet.auctionPriceUSD) / 2);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-14 sm:mt-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 mb-4 border border-[#2A2A2E]">
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Header section */}
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-[22%] overflow-hidden mr-3 shadow-lg">
                <Image src={wallet.icon} alt={wallet.name} width={64} height={64} className="object-cover" />
              </div>
              <div>
                <h1 className="text-[28px] font-bold titanium-gradient mb-2">{wallet.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] text-yellow-400 font-medium bg-yellow-400/10 px-3 py-1 rounded-full shadow-md">
                    {wallet.priceRange}
                  </span>
                  {wallet.isHot && (
                    <span className="text-[16px] text-orange-500 font-medium bg-orange-500/10 px-3 py-1 rounded-full animate-pulse">
                      🔥 Hot
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-[16px] text-gray-300 mb-4 leading-relaxed">{wallet.description}</p>
            
            {/* Tokens section */}
            <div className="mb-4">
              <h3 className="text-[20px] font-bold titanium-gradient mb-3">Included Tokens</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {wallet.tokens.map((tokenData, index) => (
                  <div key={index} className="bg-[#1A1A1A] rounded-lg p-2.5 flex items-center shadow-md">
                    <Image
                      src={tokenData.token.logo}
                      alt={tokenData.token.name}
                      width={20}
                      height={20}
                      className="rounded-full mr-2"
                    />
                    <span className="text-[16px] font-medium">{tokenData.token.symbol}</span>
                  </div>
                ))}
                <div className="bg-[#1A1A1A] rounded-lg p-2.5 flex items-center justify-center">
                  <span className="text-[16px] font-medium text-[#3AABEE]">
                    +{additionalTokensCount} more
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 mb-4 border border-[#2A2A2E]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline">
                  <span className="text-[24px] font-bold bg-gradient-to-r from-[#A0D8EF] to-[#3AABEE] text-transparent bg-clip-text">
                    ${wallet.priceUSD}
                  </span>
                  <span className="text-[14px] text-gray-400 ml-2">
                    ≈ {tonAmount} TON
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-[14px] text-gray-400 mr-2">
                    {isAuctionEnded ? 'Ended' : 'Ends:'}
                  </span>
                  <span className="text-[16px] font-semibold text-[#3AABEE]">
                    {timeLeft}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-[14px] text-gray-400">Bid:</span>
                    <span className="text-[16px] font-semibold text-green-500 ml-2">${wallet.auctionPriceUSD}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[14px] text-gray-400">Buy:</span>
                    <span className="text-[16px] font-semibold text-yellow-500 ml-2">${buyNowPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-4">
              <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black text-[18px] font-bold py-3.5 px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                Place Bid: ${wallet.auctionPriceUSD}
              </button>
              <button className="w-full bg-gradient-to-r from-[#3AABEE] to-[#1E90FF] text-white text-[18px] font-bold py-3.5 px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                Buy Now: ${buyNowPrice}
              </button>
            </div>
          </div>

          <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 border border-[#2A2A2E]">
            <div className="flex items-center mb-4">
              <Image
                src="/inside.gif"
                alt="What's Inside"
                width={28}
                height={28}
                className="mr-3"
              />
              <h2 className="text-[24px] font-bold titanium-gradient">What You'll Get</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[16px]">{walletContents}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Detailed setup and usage instructions</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span>Access to exclusive trading opportunities</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
                <span>Bonus: Secret tips from top TON traders</span>
              </li>
            </ul>
            <div className="mt-4 bg-[#1A1A1A] p-4 rounded-xl">
              <p className="text-[14px] text-gray-300">
                <strong className="text-white">Security Guarantee:</strong> All sensitive information is delivered via military-grade encrypted channels. Your privacy and security are our top priorities.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
