'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react/dist/esm/icons';
import { THEME } from '@tonconnect/ui';
import { getTonConnectUI, setTonConnectUIOptions } from '../utils/tonConnectUI';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const AirdropButton = () => (
    <button className="bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:brightness-110">
      Airdrop
    </button>
  );

  useEffect(() => {
    const initTonConnect = async () => {
      const ui = await getTonConnectUI();
      if (ui) {
        setTonConnectUIOptions({
          buttonRootId: 'ton-connect-button',
          uiPreferences: {
            theme: THEME.DARK,
          }
        });
      }
    };
  
    initTonConnect();
  }, []);

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={28} height={28} className="mr-3 invert" />
              <span className="text-lg font-bold leading-tight">WooDogs</span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link 
                href="/" 
                className={`hover:text-gray-300 transition-colors text-sm leading-tight whitespace-nowrap ${
                  pathname === '/' ? 'text-blue-400' : 'text-white hover:text-blue-400'
                }`}
              >
                TON Wallets
              </Link>
              <span className="text-gray-500 cursor-not-allowed text-sm leading-tight whitespace-nowrap">
                Ethereum Wallets 
                <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded leading-none">Soon</span>
              </span>
              <span className="text-gray-500 cursor-not-allowed text-sm leading-tight whitespace-nowrap">
                Solana Wallets 
                <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded leading-none">Soon</span>
              </span>
              <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm leading-tight whitespace-nowrap">Support</a>
            </nav>
            <AirdropButton />
          </div>
          <div className="flex items-center space-x-2">
            <div id="ton-connect-button" className="w-[120px] h-[36px] lg:w-[160px] lg:h-[40px]" />
            <button onClick={toggleMenu} className="lg:hidden text-white ml-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden">
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
            <div className="mt-4 px-3">
              <AirdropButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
