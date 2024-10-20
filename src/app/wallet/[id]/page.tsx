'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getWalletData } from '@/data/getWalletData';
import { useRouter } from 'next/navigation';
import { Calendar, X } from 'lucide-react';
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
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-grow py-6 px-4 mt-16 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <WalletSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (!wallet) {
    return null;
  }

  const walletContents = getWalletContents(wallet.name);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-6 px-4 mt-16 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-[#3A3A3E] relative">
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden mr-4 border-2 border-[#2AABEE] shadow-lg">
                  <Image src={wallet.icon} alt={wallet.name} width={64} height={64} className="object-cover" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2AABEE]">{wallet.name}</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-yellow-400 font-semibold text-sm sm:text-base bg-yellow-400/10 px-2 py-1 rounded-full shadow-md">
                  {wallet.priceRange}
                </span>
                {wallet.isHot ? (
                  <span className="text-orange-500 font-semibold text-sm sm:text-base bg-orange-500/10 px-2 py-1 rounded-full shadow-md animate-pulse">
                    🔥 Hot
                  </span>
                ) : (
                  <span className="text-green-500 font-semibold text-sm sm:text-base bg-green-500/10 px-2 py-1 rounded-full shadow-md">
                    🐸 Cool
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-gray-300 mb-4">
              <Calendar className="w-4 h-4 mr-2 text-[#2AABEE]" />
              <span className="text-sm">Created on {wallet.createdAt}</span>
            </div>
            
            <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">{wallet.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 bg-[#2A2A2E] p-4 rounded-lg shadow-inner">
              <div className="mb-2 sm:mb-0">
                <span className="text-2xl sm:text-3xl font-bold text-white">${wallet.priceUSD}</span>
                <span className="text-sm sm:text-base text-gray-300 ml-2">
                  ≈ {tonAmount} TON
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-300 mr-2 text-sm sm:text-base">Available:</span>
                <span className="text-green-400 font-semibold text-base sm:text-lg">{wallet.available}</span>
              </div>
            </div>

            {/* Tokens list */}
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#2AABEE]">Included Tokens</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {wallet.tokens.map((tokenData, index) => (
                  <div key={index} className="bg-[#2A2A2E] rounded-lg p-2 flex items-center shadow-md">
                    <Image
                      src={tokenData.token.logo}
                      alt={tokenData.token.name}
                      width={24}
                      height={24}
                      className="rounded-full mr-2"
                    />
                    <span className="font-medium text-sm">{tokenData.token.symbol}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl">
              Order Now and Get Instant Access
            </button>
          </div>

          {/* Card for wallet contents */}
          <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 border border-[#3A3A3E]">
            <div className="flex items-center mb-4 sm:mb-6">
              <Image
                src="/inside.gif"
                alt="What's Inside"
                width={36}
                height={36}
                className="mr-3 sm:mr-4"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-[#2AABEE]">What You'll Get</h2>
            </div>
            <ul className="space-y-3 text-gray-200 text-sm sm:text-base mb-6">
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-[#2AABEE]">🛡️</span>
                <span>{walletContents}</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-[#2AABEE]">⚡</span>
                <span>Detailed setup and usage instructions</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-[#2AABEE]">💲</span>
                <span>Access to exclusive trading opportunities</span>
              </li>
              <li className="flex items-center">
                <span className="w-5 h-5 mr-2 text-[#2AABEE]">🎁</span>
                <span>Bonus: Secret tips from top TON traders</span>
              </li>
            </ul>
            <p className="text-gray-300 text-sm sm:text-base bg-[#2A2A2E] p-3 sm:p-4 rounded-lg">
              <strong>Security Guarantee:</strong> All sensitive information is delivered via military-grade encrypted channels. Your privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
