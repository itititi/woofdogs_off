'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 mr-2">
              <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={32} height={32} className="invert" />
            </div>
            <span className="text-lg font-bold">WooDogs</span>
          </Link>
          <div className="flex items-center space-x-2">
            <TonConnectButton />
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/' ? 'text-blue-400' : 'text-white hover:text-blue-400'
              }`}
              onClick={toggleMenu}
            >
              TON Wallets
            </Link>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 cursor-not-allowed">
              Ethereum Wallets 
              <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Soon</span>
            </span>
            <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 cursor-not-allowed">
              Solana Wallets 
              <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded">Soon</span>
            </span>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300" onClick={toggleMenu}>Support</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
