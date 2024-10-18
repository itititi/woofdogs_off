'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TonConnectButton } from '@tonconnect/ui-react';

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-black text-white">
      <Link href="/" className="flex items-center">
        <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={40} height={40} className="mr-3 invert" />
        <span className="text-2xl font-bold">WooDogs</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-10">
        <Link 
          href="/" 
          className={`hover:text-gray-300 transition-colors ${
            pathname === '/' ? 'text-blue-400' : 'border-b-2 border-transparent hover:border-white pb-1'
          }`}
        >
          TON Wallets
        </Link>
        <span className="text-gray-500 cursor-not-allowed">
          Ethereum Wallets 
          <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Soon</span>
        </span>
        <span className="text-gray-500 cursor-not-allowed">
          Solana Wallets 
          <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Soon</span>
        </span>
        <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
      </nav>
      <TonConnectButton />
    </header>
  );
};

export default Header;
