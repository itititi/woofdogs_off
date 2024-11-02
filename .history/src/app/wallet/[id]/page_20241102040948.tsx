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

  const additionalTokensCount = useMemo(() => {
    if (!wallet) return 5;
    const seed = params.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 5 + (seed % 6);
  }, [params.id, wallet]);

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
      <main className="flex-grow py-4 px-4 mt-14 sm:mt-20 lg:mt-24 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 mb-4 border border-[#2A2A2E] relative">
            {/* Header section */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center flex-1">
                <div className="w-16 h-16 rounded-[22%] overflow-hidden mr-4 shadow-lg">
                  <Image src={wallet.icon} alt={wallet.name} width={64} height={64} className="object-cover" />
                </div>
                <div className="flex-1">
                  <h1 className="text-[28px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text mb-2">
                    {wallet.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-yellow-400 font-medium bg-yellow-400/10 px-3 py-1 rounded-xl">
                      {wallet.priceRange}
                    </span>
                    {wallet.isHot && (
                      <span className="text-[14px] text-orange-500 font-medium bg-orange-500/10 px-3 py-1 rounded-xl animate-pulse">
                        🔥 Hot
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="text-white/50 hover:text-white/70 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Description */}
            <p className="text-[16px] text-gray-300 mb-6 leading-relaxed">{wallet.description}</p>
            
            {/* Price section */}
            <div className="bg-[#1A1A1A] rounded-xl p-4 mb-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline">
                  <span className="text-[24px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">
                    ${wallet.priceUSD}
                  </span>
                  <span className="text-[14px] text-gray-400 ml-2">
                    ≈ {tonAmount} TON
                  </span>
                </div>
                <div className="flex items-center gap-6">
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

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button className="relative group h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#FFD700] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                <span className="text-[16px] font-semibold text-black z-10">Place Bid: ${wallet.auctionPriceUSD}</span>
              </button>
              <button className="relative group h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] hover:from-[#2691D9] hover:to-[#1E88E5] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                <span className="text-[16px] font-semibold text-white z-10">Buy Now: ${buyNowPrice}</span>
              </button>
            </div>

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

          {/* What's Inside section */}
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
