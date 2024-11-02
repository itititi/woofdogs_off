'use client';

import { TonConnectButton } from '@tonconnect/ui-react';
import Avatar from 'boring-avatars';
import Link from 'next/link';
import { useTonWallet } from '@/hooks/useTonWallet';
import { useEffect, useState } from 'react';

export const CustomTonConnect = () => {
  const { isConnected, walletAddress, walletColors } = useTonWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <TonConnectButton />;
  }

  if (!isConnected || !walletAddress) {
    return <TonConnectButton />;
  }

  return (
    <div className="flex items-center space-x-2">
      <Link 
        href="/profile" 
        className="flex items-center space-x-2 bg-[#141414] rounded-xl px-3 py-2 border border-[#2A2A2E]/50 hover:bg-[#1A1A1A] transition-all duration-300"
      >
        <Avatar
          size={32}
          name={walletAddress}
          variant="beam"
          colors={walletColors}
        />
        <span className="text-[14px] text-gray-400">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </span>
      </Link>
      <div className="hidden">
        <TonConnectButton />
      </div>
    </div>
  );
};

export const MobileProfileButton = () => {
  const { isConnected, walletAddress, walletColors } = useTonWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isConnected || !walletAddress) {
    return null;
  }

  return (
    <Link 
      href="/profile"
      className="flex items-center space-x-3 px-4 py-3 bg-[#141414] rounded-xl border border-[#2A2A2E]/50 hover:bg-[#1A1A1A] transition-all duration-300"
    >
      <Avatar
        size={40}
        name={walletAddress}
        variant="beam"
        colors={walletColors}
      />
      <div>
        <span className="text-[16px] font-semibold text-white">My Profile</span>
        <p className="text-[14px] text-gray-400">
          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      </div>
    </Link>
  );
}; 