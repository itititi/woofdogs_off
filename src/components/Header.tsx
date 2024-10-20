'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import TonConnectButton from './TonConnectButton';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | 'large'>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else if (width < 1920) {
        setDeviceType('desktop');
      } else {
        setDeviceType('large');
      }
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  const navItems = useMemo(() => [
    { href: '/', label: 'TON Wallets', isActive: pathname === '/' },
    { label: 'Ethereum Wallets', soon: true },
    { label: 'Solana Wallets', soon: true },
    { href: '#', label: 'Support' },
  ], [pathname]);

  const isMobileOrTablet = deviceType === 'mobile' || deviceType === 'tablet';

  return (
    <>
      <header className="bg-black text-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[2056px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between h-16 md:h-18 xl:h-20">
            <Link href="/" className="flex items-center">
              <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={28} height={28} className="mr-2 invert" />
              <span className="font-bold leading-tight text-lg xl:text-xl">WooDogs</span>
            </Link>
            {!isMobileOrTablet && (
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {navItems.map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href || '#'}
                    className={`text-sm xl:text-base font-medium ${
                      item.isActive ? 'text-[#2AABEE]' : 'text-white hover:text-[#2AABEE]'
                    } ${item.soon ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {item.label}
                    {item.soon && <span className="ml-1 text-xs bg-[#2A2A2E] px-1 py-0.5 rounded">Soon</span>}
                  </Link>
                ))}
              </nav>
            )}
            <div className="flex items-center space-x-4">
              <Link href="/airdrop">
                <button className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] text-white py-2 px-4 rounded-full text-sm font-semibold">
                  Airdrop
                </button>
              </Link>
              {isMobileOrTablet && (
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
              {!isMobileOrTablet && <TonConnectButton />}
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && isMobileOrTablet && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 pt-16 md:pt-18">
          <div className="max-w-md mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href || '#'}
                  className={`text-lg font-semibold ${
                    item.isActive ? 'text-[#2AABEE]' : 'text-white'
                  } ${item.soon ? 'opacity-50' : ''}`}
                  onClick={() => item.soon ? null : setIsMenuOpen(false)}
                >
                  {item.label}
                  {item.soon && <span className="ml-2 text-xs bg-[#2A2A2E] px-1 py-0.5 rounded">Soon</span>}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      {isMobileOrTablet && (
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
