'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import TonConnectButton from './TonConnectButton';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const AirdropButton = () => (
    <Link href="/airdrop">
      <button className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] text-white py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:brightness-110 h-10 leading-tight min-h-[40px] max-h-[40px] text-sm">
        Airdrop
      </button>
    </Link>
  );

  return (
    <>
      <header className="bg-black text-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 xl:h-20">
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
                <span className="text-gray-400 cursor-not-allowed text-sm leading-tight whitespace-nowrap bg-[#1C1C1E] px-3 py-1 rounded-full">
                  Ethereum Wallets 
                  <span className="text-xs ml-1 bg-[#2A2A2E] text-gray-400 px-1 py-0.5 rounded-full leading-none">Soon</span>
                </span>
                <span className="text-gray-400 cursor-not-allowed text-sm leading-tight whitespace-nowrap bg-[#1C1C1E] px-3 py-1 rounded-full">
                  Solana Wallets 
                  <span className="text-xs ml-1 bg-[#2A2A2E] text-gray-400 px-1 py-0.5 rounded-full leading-none">Soon</span>
                </span>
                <a href="#" className="text-white hover:text-gray-300 transition-colors text-sm leading-tight whitespace-nowrap">Support</a>
              </nav>
              <AirdropButton />
            </div>
            <div className="flex items-center space-x-2">
              <div className="lg:hidden">
                <AirdropButton />
              </div>
              {!isMobile && <TonConnectButton />}
              <button onClick={toggleMenu} className="lg:hidden text-white ml-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800">
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
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 cursor-not-allowed bg-[#1C1C1E]">
                Ethereum Wallets 
                <span className="text-xs ml-1 bg-[#2A2A2E] text-gray-400 px-1 py-0.5 rounded-full">Soon</span>
              </span>
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 cursor-not-allowed bg-[#1C1C1E]">
                Solana Wallets 
                <span className="text-xs ml-1 bg-[#2A2A2E] text-gray-400 px-1 py-0.5 rounded-full">Soon</span>
              </span>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300" onClick={toggleMenu}>Support</a>
            </div>
          </div>
        )}
      </header>
      {isMobile && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black bg-opacity-80 rounded-full p-2 shadow-lg">
            <TonConnectButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
