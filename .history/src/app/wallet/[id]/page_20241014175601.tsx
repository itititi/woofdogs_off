import React from 'react';
import Image from 'next/image';
import { getWalletData } from '@/data/getWalletData';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';

interface WalletPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: WalletPageProps) {
  const wallet = await getWalletData(params.id);
  if (!wallet) return { title: 'Wallet Not Found' };
  return { title: `${wallet.name} | WooDogs` };
}

export default async function WalletPage({ params }: WalletPageProps) {
  const wallet = await getWalletData(params.id);

  if (!wallet) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-lg overflow-hidden mr-6">
                <Image src={wallet.icon} alt={wallet.name} width={64} height={64} className="object-cover" />
              </div>
              <h1 className="text-4xl font-bold text-white">{wallet.name}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-yellow-400 font-semibold text-xl bg-yellow-400/10 px-4 py-2 rounded-full">
                {wallet.priceRange}
              </span>
              {wallet.isHot ? (
                <span className="text-orange-500 font-semibold text-xl bg-orange-500/10 px-4 py-2 rounded-full">
                  🔥 Hot
                </span>
              ) : (
                <span className="text-green-500 font-semibold text-xl bg-green-500/10 px-4 py-2 rounded-full">
                  🐸 Cool
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-gray-400 mb-6">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-lg">Created on: {wallet.createdAt}</span>
          </div>
          
          <p className="text-gray-300 text-xl mb-8">{wallet.description}</p>
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="text-3xl font-bold text-white">${wallet.priceUSD}</span>
              <span className="text-lg text-gray-400 ml-2">
                ≈ {(wallet.priceUSD / 2.5).toFixed(2)} TON
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2 text-lg">Available:</span>
              <span className="text-green-500 font-semibold text-xl">{wallet.available}</span>
            </div>
          </div>
          
          <button className="w-full bg-blue-600 text-white text-xl font-bold py-4 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
