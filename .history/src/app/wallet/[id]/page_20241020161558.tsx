'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getWalletData } from '@/data/getWalletData';
import { useRouter } from 'next/navigation';
import { Calendar, Shield, Zap, DollarSign, Gift, X } from 'lucide-react';
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
  const [tonPrice, setTonPrice] = useState<number | null>(null);
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
      setIsLoading(false);
    };

    const fetchTonPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
        const data = await response.json();
        setTonPrice(data['the-open-network'].usd);
      } catch (error) {
        console.error('Error fetching TON price:', error);
      }
    };

    fetchData();
    fetchTonPrice();
  }, [params.id, router]);

  const handleClose = () => {
    router.push('/'); // Предполагается, что главная страница находится по пути '/'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-grow py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow py-8 px-4 sm:py-12 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-[#3A3A3E] relative">
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden mr-4 sm:mr-6 border-2 border-[#2AABEE] shadow-lg">
                  <Image src={wallet.icon} alt={wallet.name} width={80} height={80} className="object-cover" />
                </div>
                <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">{wallet.name}</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-yellow-400 font-semibold text-lg sm:text-2xl bg-yellow-400/10 px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md">
                  {wallet.priceRange}
                </span>
                {wallet.isHot ? (
                  <span className="text-orange-500 font-semibold text-lg sm:text-2xl bg-orange-500/10 px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md animate-pulse">
                    🔥 Hot
                  </span>
                ) : (
                  <span className="text-green-500 font-semibold text-lg sm:text-2xl bg-green-500/10 px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md">
                    🐸 Cool
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-gray-300 mb-4 sm:mb-6">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#2AABEE]" />
              <span className="text-base sm:text-xl">Created on {wallet.createdAt}</span>
            </div>
            
            <p className="text-gray-200 text-lg sm:text-2xl mb-6 sm:mb-8 leading-relaxed">{wallet.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 bg-[#2A2A2E] p-4 rounded-lg shadow-inner">
              <div className="mb-4 sm:mb-0">
                <span className="text-3xl sm:text-4xl font-bold text-white">${wallet.priceUSD}</span>
                {tonPrice && (
                  <span className="text-base sm:text-xl text-gray-300 ml-2">
                    ≈ {(wallet.priceUSD / tonPrice).toFixed(2)} TON
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-gray-300 mr-2 text-base sm:text-xl">Available:</span>
                <span className="text-green-400 font-semibold text-xl sm:text-2xl">{wallet.available}</span>
              </div>
            </div>

            {/* Tokens list */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">Included Tokens</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wallet.tokens.map((tokenData, index) => (
                  <div key={index} className="bg-[#2A2A2E] rounded-lg p-3 flex items-center shadow-md hover:shadow-lg transition-all duration-300">
                    <Image
                      src={tokenData.token.logo}
                      alt={tokenData.token.name}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <span className="font-semibold text-lg">{tokenData.token.symbol}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white text-xl sm:text-2xl font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl">
              Order Now and Get Instant Access
            </button>
          </div>

          {/* Card for wallet contents */}
          <div className="bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 border border-[#3A3A3E]">
            <div className="flex items-center mb-6 sm:mb-8">
              <Image
                src="/inside.gif"
                alt="What's Inside"
                width={48}
                height={48}
                className="mr-4 sm:mr-6"
              />
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">What You'll Get</h2>
            </div>
            <ul className="space-y-4 text-gray-200 text-lg sm:text-xl mb-6">
              <li className="flex items-center">
                <Shield className="w-6 h-6 mr-3 text-[#2AABEE]" />
                <span>{walletContents}</span>
              </li>
              <li className="flex items-center">
                <Zap className="w-6 h-6 mr-3 text-[#2AABEE]" />
                <span>Detailed setup and usage instructions</span>
              </li>
              <li className="flex items-center">
                <DollarSign className="w-6 h-6 mr-3 text-[#2AABEE]" />
                <span>Access to exclusive trading opportunities</span>
              </li>
              <li className="flex items-center">
                <Gift className="w-6 h-6 mr-3 text-[#2AABEE]" />
                <span>Bonus: Secret tips from top TON traders</span>
              </li>
            </ul>
            <p className="text-gray-300 mt-6 sm:mt-8 text-base sm:text-lg bg-[#2A2A2E] p-4 rounded-lg">
              <strong>Security Guarantee:</strong> All sensitive information is delivered via military-grade encrypted channels. Your privacy and security are our top priorities.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
