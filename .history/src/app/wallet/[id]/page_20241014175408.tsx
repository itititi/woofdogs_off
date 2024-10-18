import React from 'react';
import Image from 'next/image';
import { getWalletData } from '@/data/getWalletData';
import { notFound } from 'next/navigation';

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
        <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image src={wallet.icon} alt={wallet.name} width={200} height={200} className="h-48 w-full object-cover md:w-48" />
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-2">{wallet.name}</h1>
                <span className="text-yellow-400 font-semibold text-lg bg-yellow-400/10 px-3 py-1 rounded-full">
                  {wallet.priceRange}
                </span>
              </div>
              <p className="text-gray-400 text-xl mb-4">{wallet.description}</p>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Цена:</h2>
                <p className="text-3xl font-bold">${wallet.priceUSD}</p>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Доступно:</h2>
                <p className="text-xl">{wallet.available}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Создано:</h2>
                <p className="text-xl">{wallet.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
