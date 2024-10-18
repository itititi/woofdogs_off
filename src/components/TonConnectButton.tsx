'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Avatar from 'boring-avatars';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import User from 'lucide-react/dist/esm/icons/user';
import Settings from 'lucide-react/dist/esm/icons/settings';
import LogOut from 'lucide-react/dist/esm/icons/log-out';

const TonConnectButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    const savedProfile = sessionStorage.getItem('profileData');
    if (savedProfile) {
      const { address, id } = JSON.parse(savedProfile);
      setIsConnected(true);
      setAddress(address);
      setProfileId(id);
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
    setProfileId(newProfileId);
    sessionStorage.setItem('profileData', JSON.stringify({ address: newAddress, id: newProfileId }));
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress('');
    setProfileId('');
    sessionStorage.removeItem('profileData');
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
          <span className="ml-2">{address.slice(0, 4)}...{address.slice(-3)}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-[#2A2A2E] border border-[#3A3A3E] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-[#3A3A3E] text-white' : 'text-gray-300'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-[#3A3A3E] text-white' : 'text-gray-300'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="border-t border-[#3A3A3E] px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDisconnect}
                  className={`${
                    active ? 'bg-red-700 text-white' : 'text-red-400'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors duration-150 ease-in-out hover:bg-red-600`}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Disconnect
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="px-2 py-1 text-xs text-gray-500 flex justify-between items-center">
            <span>ID:</span>
            <span className="font-mono">{profileId}</span>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TonConnectButton;
