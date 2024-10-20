'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Avatar from 'boring-avatars';
import { Calendar, Package, X } from 'lucide-react';
import { WalletOffer } from '@/data/walletOffers';
import { getWalletData } from '@/data/getWalletData';

const ProfilePage: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [profileId, setProfileId] = useState<string>('');
  const [purchases, setPurchases] = useState<WalletOffer[]>([]);
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
    } else {
      router.push('/');
    }
  }, [router]);

  const handleClose = () => {
    router.push('/');
  };

  if (!address) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 mb-8 border border-[#3A3A3E] relative">
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center mb-6">
              <Avatar
                size={80}
                name={address}
                variant="beam"
                colors={['#2AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0']}
              />
              <div className="ml-6">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">
                  User Profile
                </h1>
                <p className="text-gray-300 mt-2 text-lg">Address: {address}</p>
                <p className="text-gray-300 text-lg">ID: {profileId}</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">
            My Purchases
          </h2>

          <div className="space-y-6">
            {purchases.map((wallet) => (
              <div key={wallet.id} className="bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2E] rounded-lg overflow-hidden shadow-xl p-6 border border-[#3A3A3E]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
                      <Image src={wallet.icon} alt={wallet.name} width={48} height={48} className="object-cover" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">
                      {wallet.name}
                    </h3>
                  </div>
                  <span className="text-yellow-400 font-semibold text-sm bg-yellow-400/10 px-2 py-1 rounded-full">
                    {wallet.priceRange}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-300 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Purchased: {wallet.createdAt}</span>
                </div>
                
                <p className="text-gray-300 mb-4">{wallet.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">${wallet.priceUSD}</span>
                  <div className="flex items-center text-green-500">
                    <Package className="w-4 h-4 mr-2" />
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
