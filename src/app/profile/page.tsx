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
    <div key={wallet.id} className="bg-[#141414] rounded-lg overflow-hidden shadow-md p-4 border border-[#2A2A2E] mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-[22%] overflow-hidden mr-3">
            <Image src={wallet.icon} alt={wallet.name} width={40} height={40} className="object-cover" />
          </div>
          <h3 className="text-lg font-bold titanium-gradient">{wallet.name}</h3>
        </div>
        <span className="text-yellow-400 font-semibold text-xs bg-yellow-400/10 px-2 py-1 rounded-full">
          {wallet.priceRange}
        </span>
      </div>
      
      <div className="flex items-center text-gray-300 mb-2 text-sm">
        {isPurchase ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>Purchased: {wallet.createdAt}</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span>Viewed recently</span>
          </>
        )}
      </div>
      
      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{wallet.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold titanium-gradient">${wallet.priceUSD}</span>
        {isPurchase && (
          <div className="flex items-center text-green-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Delivered</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-6 px-4 mt-16 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#141414] rounded-lg overflow-hidden shadow-xl p-6 mb-6 border border-[#2A2A2E]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
              <Avatar
                size={80}
                name={address}
                variant="beam"
                colors={['#3AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0']}
                className="mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold titanium-gradient mb-1">
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
                    ? 'text-[#3AABEE] border-b-2 border-[#3AABEE]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                My Purchases
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 font-semibold text-sm ${
                  activeTab === 'history'
                    ? 'text-[#3AABEE] border-b-2 border-[#3AABEE]'
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
                  : <div className="col-span-full bg-[#1A1A1A] rounded-lg p-4 text-center">
                      <Image 
                        src="/history.gif" 
                        alt="История просмотров" 
                        width={120} 
                        height={120} 
                        className="mx-auto mb-4"
                      />
                      <p className="text-gray-300 text-sm">You haven't viewed any offers yet.</p>
                    </div>
              )}
            </div>
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
};

export default ProfilePage;
