'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from 'boring-avatars';
import { useRouter } from 'next/navigation';

const TonConnectButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedProfile = sessionStorage.getItem('profileData');
    if (savedProfile) {
      const { address } = JSON.parse(savedProfile);
      setIsConnected(true);
      setAddress(address);
    }
  }, []);

  const generateProfileId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleConnect = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newAddress = 'EQD...abc';
    const newProfileId = generateProfileId();
    setIsLoading(false);
    setIsConnected(true);
    setAddress(newAddress);
    sessionStorage.setItem('profileData', JSON.stringify({ address: newAddress, id: newProfileId }));
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress('');
    sessionStorage.removeItem('profileData');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center h-10 min-h-[40px] max-h-[40px] text-sm w-[140px]"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </>
        ) : (
          'Connect Wallet'
        )}
      </button>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-[#2A2A2E] hover:bg-[#3A3A3E] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center h-10 min-h-[40px] max-h-[40px] text-sm">
          <Avatar
            size={24}
            name={address}
            variant="beam"
            colors={['#2AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0']}
          />
          <span className="ml-2 mr-1">{address.slice(0, 4)}...{address.slice(-3)}</span>
          <span className="h-4 w-4">▼</span>
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-[#2A2A2E] border border-[#3A3A3E] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-[#3A3A3E]">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-sm font-medium text-white truncate">{address}</p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleProfileClick}
                  className={`${
                    active ? 'bg-[#3A3A3E] text-white' : 'text-gray-300'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <span className="mr-3">👤</span>
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSettingsClick}
                  className={`${
                    active ? 'bg-[#3A3A3E] text-white' : 'text-gray-300'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <span className="mr-3">⚙️</span>
                  Settings
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDisconnect}
                  className={`${
                    active ? 'bg-red-600 text-white' : 'text-red-400'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  <span className="mr-3">🚪</span>
                  Disconnect
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TonConnectButton;
