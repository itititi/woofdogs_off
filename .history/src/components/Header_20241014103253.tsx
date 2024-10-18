import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background text-foreground">
      <div className="flex items-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z" fill="currentColor"/>
          <path d="M28 14a2 2 0 11-4 0 2 2 0 014 0zM16 14a2 2 0 11-4 0 2 2 0 014 0zM20 28c-3.314 0-6-2.686-6-6h12c0 3.314-2.686 6-6 6z" fill="currentColor"/>
        </svg>
        <span className="text-xl font-bold">WooDogs</span>
      </div>
      <nav className="hidden md:flex items-center space-x-4">
        <a href="#" className="hover:text-gray-300">TON Wallets</a>
        <a href="#" className="text-gray-500">Ethereum Wallets <span className="text-xs">[Soon]</span></a>
        <a href="#" className="text-gray-500">Solana Wallets <span className="text-xs">[Soon]</span></a>
        <a href="#" className="hover:text-gray-300">Support</a>
      </nav>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
        Connect Wallet
      </button>
    </header>
  );
};

export default Header;
