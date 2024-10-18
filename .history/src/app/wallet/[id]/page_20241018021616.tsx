'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getWalletData } from '@/data/getWalletData';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const walletData = await getWalletData(params.id);
      if (!walletData) {
        notFound();
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
  }, [params.id]);

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
    return notFound();
  }

  const walletContents = getWalletContents(wallet.name);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-8 px-4 sm:py-12 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-xl p-6 sm:p-8 mb-6 sm:mb-8 border border-[#2A2A2E]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden mr-4 sm:mr-6">
                  <Image src={wallet.icon} alt={wallet.name} width={64} height={64} className="object-cover" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">{wallet.name}</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-yellow-400 font-semibold text-sm sm:text-xl bg-yellow-400/10 px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                  {wallet.priceRange}
                </span>
                {wallet.isHot ? (
                  <span className="text-orange-500 font-semibold text-sm sm:text-xl bg-orange-500/10 px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                    🔥
                  </span>
                ) : (
                  <span className="text-green-500 font-semibold text-sm sm:text-xl bg-green-500/10 px-2 sm:px-4 py-1 sm:py-2 rounded-full">
                    🐸
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center text-gray-400 mb-4 sm:mb-6">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-lg">{wallet.createdAt}</span>
            </div>
            
            <p className="text-gray-300 text-base sm:text-xl mb-6 sm:mb-8">{wallet.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
              <div className="mb-4 sm:mb-0">
                <span className="text-2xl sm:text-3xl font-bold text-white">${wallet.priceUSD}</span>
                {tonPrice && (
                  <span className="text-sm sm:text-lg text-gray-400 ml-2">
                    ≈ {(wallet.priceUSD / tonPrice).toFixed(2)} TON
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2 text-sm sm:text-lg">Available:</span>
                <span className="text-green-500 font-semibold text-base sm:text-xl">{wallet.available}</span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full hover:brightness-110 transition-all duration-300">
              Order Now
            </button>
          </div>

          {/* Card for wallet contents */}
          <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-xl p-6 sm:p-8 border border-[#2A2A2E]">
            <div className="flex items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">What&apos;s Inside</h2>
            </div>
            <p className="text-gray-300 text-base sm:text-xl mb-4">
              After ordering, you will receive:
            </p>
            <ul className="list-disc list-inside text-gray-300 text-sm sm:text-lg">
              <li className="mb-2">{walletContents}</li>
              <li className="mb-2">Detailed instructions for wallet setup and usage</li>
              <li className="mb-2">24/7 customer support</li>
            </ul>
            <p className="text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base">
              Note: All sensitive information will be securely delivered to you via encrypted channels.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
