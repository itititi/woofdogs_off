import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background text-foreground">
      <div className="flex items-center">
        <Image src="/dog-paw.svg" alt="WooDogs Logo" width={40} height={40} className="mr-2" />
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
