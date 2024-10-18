'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react/dist/esm/icons';
const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const AirdropButton = () => (
    <button className="bg-gradient-to-r from-[#39FF14] via-[#00FF7F] to-[#32CD32] hover:from-[#32CD32] hover:via-[#00FF7F] hover:to-[#39FF14] text-black font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-lg w-full">
      Airdrop
    </button>
  );

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={28} height={28} className="mr-2 invert" />
              <span className="text-lg font-bold leading-tight">WooDogs</span>
            </Link>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-6 mr-6">
              <Link 
                href="/" 
                className={`hover:text-gray-300 transition-colors text-sm leading-tight ${
                  pathname === '/' ? 'text-blue-400' : 'text-white hover:text-blue-400'
                }`}
              >
                TON Wallets
              </Link>
              <span className="text-gray-500 cursor-not-allowed text-sm leading-tight">
                Ethereum Wallets 
                <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded leading-none">Soon</span>
              </span>
              <span className="text-gray-500 cursor-not-allowed text-sm leading-tight">
                Solana Wallets 
                <span className="text-xs ml-1 bg-gray-800 text-gray-400 px-1 py-0.5 rounded leading-none">Soon</span>
              </span>
              <a href="#" className="hover:text-gray-300 transition-colors text-sm leading-tight">Support</a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <AirdropButton />
              {typeof window !== 'undefined' && (
                <div className="ton-connect-button-wrapper">
                </div>
              )}
            </div>
            <button onClick={toggleMenu} className="md:hidden text-white ml-4">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
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
            <div className="mt-4 space-y-2 px-3">
              <AirdropButton />
              {typeof window !== 'undefined' && (
                <div className="ton-connect-button-wrapper">
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
