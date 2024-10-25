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

  const walletContents = getWalletContents(wallet.name);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 mb-4 border border-[#2A2A2E] relative">
            <div className="flex justify-end mb-2">
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-[22%] overflow-hidden mr-4 shadow-lg">
                  <Image src={wallet.icon} alt={wallet.name} width={64} height={64} className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold titanium-gradient">{wallet.name}</h1>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-yellow-400 font-semibold text-sm bg-yellow-400/10 px-2 py-1 rounded-full shadow-md mb-1">
                  {wallet.priceRange}
                </span>
                {wallet.isHot ? (
                  <span className="text-orange-500 font-semibold text-sm bg-orange-500/10 px-2 py-1 rounded-full shadow-md animate-pulse">
                    🔥 Hot
                  </span>
                ) : (
                  <span className="text-green-500 font-semibold text-sm bg-green-500/10 px-2 py-1 rounded-full shadow-md">
                    🐸 Cool
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-gray-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Created on {wallet.createdAt}</span>
            </div>
            
            <p className="text-gray-300 text-base mb-6 leading-relaxed">{wallet.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 bg-[#1A1A1A] p-4 rounded-lg shadow-inner">
              <div className="mb-2 sm:mb-0">
                <div className="mb-2">
                  <span className="text-2xl sm:text-3xl font-bold titanium-gradient">${wallet.priceUSD}</span>
                  <span className="text-sm sm:text-base text-gray-300 ml-2">
                    ≈ {tonAmount} TON
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-sm sm:text-base text-gray-300">Текущая ставка:</span>
                  <span className="text-lg sm:text-xl font-semibold text-green-500 ml-2">${bidPrice ?? 'N/A'}</span>
                  {bidPrice !== null && (
                    <span className="text-sm sm:text-base text-green-500 ml-2">
                      (Экономия ${(wallet.priceUSD - bidPrice).toFixed(2)})
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-sm sm:text-base text-gray-300">Купить сейчас:</span>
                  <span className="text-lg sm:text-xl font-semibold text-yellow-500 ml-2">${blitzPrice ?? 'N/A'}</span>
                  {blitzPrice !== null && (
                    <span className="text-sm sm:text-base text-red-500 ml-2">
                      (Премиум ${(blitzPrice - wallet.priceUSD).toFixed(2)})
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <span className="text-gray-300 text-sm sm:text-base">
                  {isAuctionEnded ? 'Аукцион завершен' : 'Аукцион завершится через:'}
                </span>
                <span className="font-semibold text-base sm:text-lg text-[#FFA500]">
                  {timeLeft}
                </span>
              </div>
            </div>

            {/* Tokens list */}
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold titanium-gradient mb-3">Included Tokens</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {wallet.tokens.map((tokenData, index) => (
                  <div key={index} className="bg-[#1A1A1A] rounded-lg p-2 flex items-center shadow-md">
                    <Image
                      src={tokenData.token.logo}
                      alt={tokenData.token.name}
                      width={20}
                      height={20}
                      className="rounded-full mr-2"
                    />
                    <span className="font-medium text-xs sm:text-sm">{tokenData.token.symbol}</span>
                  </div>
                ))}
                <div className="bg-[#1A1A1A] rounded-lg p-2 flex items-center justify-center shadow-md">
                  <span className="font-medium text-xs sm:text-sm text-[#3AABEE]">
                    {additionalTokensCount} more...
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mb-4">
              <button 
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B4513] text-lg font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Place Bid: ${bidPrice ?? 'N/A'} {bidPrice !== null && `(Save $${(wallet.priceUSD - bidPrice).toFixed(2)})`}
              </button>
              <button 
                className="w-full bg-gradient-to-r from-[#3AABEE] to-[#1E90FF] text-white text-lg font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Buy Now: ${blitzPrice ?? 'N/A'}
              </button>
            </div>
          </div>

          {/* Card for wallet contents */}
          <div className="bg-[#141414] rounded-lg overflow-hidden shadow-2xl p-4 sm:p-6 border border-[#2A2A2E]">
            <div className="flex items-center mb-4 sm:mb-6">
              <Image
                src="/inside.gif"
                alt="What's Inside"
                width={36}
                height={36}
                className="mr-3 sm:mr-4"
              />
              <h2 className="text-xl sm:text-2xl font-bold titanium-gradient">What You'll Get</h2>
            </div>
            <ul className="space-y-3 text-gray-200 text-sm sm:text-base mb-6">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{walletContents}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Detailed setup and usage instructions</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span>Access to exclusive trading opportunities</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                  <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>
                <span>Bonus: Secret tips from top TON traders</span>
              </li>
            </ul>
            <p className="text-gray-300 text-sm sm:text-base bg-[#1A1A1A] p-3 sm:p-4 rounded-lg">
              <strong>Security Guarantee:</strong> All sensitive information is delivered via military-grade encrypted channels. Your privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </main>
      <style jsx global>{`
        .titanium-gradient {
          background: linear-gradient(
            45deg,
            #E8E8E8,
            #D3D3D3,
            #BEBEBE,
            #A9A9A9
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: titanium 10s ease infinite;
        }

        @keyframes titanium {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
