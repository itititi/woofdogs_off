'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Avatar from 'boring-avatars';
import { Calendar, Eye } from 'lucide-react';
import { WalletOffer } from '@/data/walletOffers';
import { getWalletData } from '@/data/getWalletData';

const ProfilePage: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [profileId, setProfileId] = useState<string>('');
  const [purchases, setPurchases] = useState<WalletOffer[]>([]);
  const [viewHistory, setViewHistory] = useState<WalletOffer[]>([]);
  const [activeTab, setActiveTab] = useState<'purchases' | 'history'>('purchases');
  const router = useRouter();

  useEffect(() => {
    const savedProfile = sessionStorage.getItem('profileData');
    if (savedProfile) {
      const { address, id } = JSON.parse(savedProfile);
      setAddress(address);
      setProfileId(id);
      const fetchPurchases = async () => {
        const purchaseIds = ['ton-wallet-1', 'cryptobot-1', 'ton-space-1'];
        const purchasedWallets = await Promise.all(
          purchaseIds.map(id => getWalletData(id))
        );
        setPurchases(purchasedWallets.filter((wallet): wallet is WalletOffer => wallet !== null));
      };
      fetchPurchases();

      const savedHistory = localStorage.getItem('viewHistory');
      if (savedHistory) {
        setViewHistory(JSON.parse(savedHistory));
      }
    } else {
      router.push('/');
    }
  }, [router]);

  if (!address) {
    return null;
  }

  const renderWalletCard = (wallet: WalletOffer, isPurchase: boolean) => (
    <div key={wallet.id} className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-md p-4 border border-[#3A3A3E] mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg overflow-hidden mr-3">
            <Image src={wallet.icon} alt={wallet.name} width={40} height={40} className="object-cover" />
          </div>
          <h3 className="text-lg font-bold text-[#2AABEE]">{wallet.name}</h3>
        </div>
        <span className="text-yellow-400 font-semibold text-xs bg-yellow-400/10 px-2 py-1 rounded-full">
          {wallet.priceRange}
        </span>
      </div>
      
      <div className="flex items-center text-gray-300 mb-2 text-sm">
        {isPurchase ? (
          <>
            <Calendar className="w-4 h-4 mr-2" />
            <span>Purchased: {wallet.createdAt}</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4 mr-2" />
            <span>Viewed recently</span>
          </>
        )}
      </div>
      
      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{wallet.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-white">${wallet.priceUSD}</span>
        {isPurchase && (
          <div className="flex items-center text-green-500 text-sm">
            <span className="w-4 h-4 mr-1">✓</span>
            <span>Delivered</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-6 mt-16 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-xl p-6 mb-6 border border-[#3A3A3E]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
              <Avatar
                size={80}
                name={address}
                variant="beam"
                colors={['#2AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0']}
                className="mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-[#2AABEE] mb-1">
                  {address}
                </h1>
                <p className="text-gray-300 text-sm">ID: {profileId}</p>
              </div>
            </div>

            <div className="flex justify-center sm:justify-start mb-6">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`px-4 py-2 font-semibold text-sm ${
                  activeTab === 'purchases'
                    ? 'text-[#2AABEE] border-b-2 border-[#2AABEE]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                My Purchases
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 font-semibold text-sm ${
                  activeTab === 'history'
                    ? 'text-[#2AABEE] border-b-2 border-[#2AABEE]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                View History
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTab === 'purchases' && purchases.map((wallet) => renderWalletCard(wallet, true))}
              {activeTab === 'history' && (
                viewHistory.length > 0 
                  ? viewHistory.map((wallet) => renderWalletCard(wallet, false))
                  : <div className="col-span-full bg-[#2A2A2E] rounded-lg p-4 text-center">
                      <p className="text-gray-300 text-sm">You haven't viewed any offers yet.</p>
                    </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
