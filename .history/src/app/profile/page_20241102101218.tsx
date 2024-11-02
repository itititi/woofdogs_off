'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Avatar from 'boring-avatars';
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
    <div key={wallet.id} className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 border border-[#2A2A2E] hover:border-[#2A2A2E] hover:shadow-[0_0_20px_rgba(42,42,46,0.7)] hover:bg-[#1A1A1A] transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-[22%] overflow-hidden mr-3">
            <Image src={wallet.icon} alt={wallet.name} width={48} height={48} className="object-cover" />
          </div>
          <h3 className="text-[20px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">{wallet.name}</h3>
        </div>
        <span className="text-[14px] text-yellow-400 font-medium bg-yellow-400/10 px-2.5 py-0.5 rounded-xl">
          {wallet.priceRange}
        </span>
      </div>
      
      <div className="flex items-center text-gray-300 mb-3 text-[14px]">
        {isPurchase ? (
          <div className="flex items-center text-[#3AABEE]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>Purchased: {new Date().toLocaleDateString()}</span>
          </div>
        ) : (
          <div className="flex items-center text-[#3AABEE]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span>Viewed recently</span>
          </div>
        )}
      </div>
      
      <p className="text-[14px] text-gray-300 mb-3 line-clamp-1">{wallet.description}</p>
      
      <div className="bg-[#1A1A1A] rounded-xl p-3">
        <div className="flex justify-between items-center">
          <span className="text-[18px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">${wallet.priceUSD}</span>
          {isPurchase && (
            <div className="flex items-center text-green-500 text-[14px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Delivered</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-[72px] sm:mt-20 lg:mt-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 mb-4 border border-[#2A2A2E]">
            <div className="flex flex-col items-center mb-6">
              <Avatar
                size={56}
                name={address}
                variant="beam"
                colors={['#3AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0']}
                className="mb-4"
              />
              <div className="text-center">
                <h1 className="text-[24px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text mb-1">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </h1>
                <p className="text-[14px] text-gray-300">ID: {profileId}</p>
              </div>
            </div>

            <div className="flex justify-center mb-6 border-b border-[#2A2A2E]/50">
              <button
                onClick={() => setActiveTab('purchases')}
                className={`py-2 px-4 text-[14px] font-medium relative ${
                  activeTab === 'purchases' ? 'text-[#3AABEE]' : 'text-white/80 hover:text-white'
                }`}
              >
                My Purchases
                {activeTab === 'purchases' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3AABEE] rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-4 text-[14px] font-medium relative ${
                  activeTab === 'history' ? 'text-[#3AABEE]' : 'text-white/80 hover:text-white'
                }`}
              >
                View History
                {activeTab === 'history' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3AABEE] rounded-full"></span>
                )}
              </button>
            </div>

            <div className="space-y-4">
              {activeTab === 'purchases' && purchases.map((wallet) => renderWalletCard(wallet, true))}
              {activeTab === 'history' && (
                viewHistory.length > 0 
                  ? viewHistory.map((wallet) => renderWalletCard(wallet, false))
                  : <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
                      <Image 
                        src="/history.gif" 
                        alt="История просмотров" 
                        width={80} 
                        height={80} 
                        className="mx-auto mb-4"
                      />
                      <p className="text-[14px] text-gray-300">You haven't viewed any offers yet.</p>
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
