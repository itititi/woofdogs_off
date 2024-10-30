'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Avatar from 'boring-avatars';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | 'large'>('desktop');
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedConnectionState = localStorage.getItem('walletConnected');
    setIsConnected(savedConnectionState === 'true');
    setMounted(true);
  }, []);

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
    { href: 'https://t.me/woodogs_support', label: 'Support', external: true },
    { href: '/airdrop', label: 'Airdrop', isButton: true },
  ], [pathname]);

  const isMobileOrTablet = deviceType === 'mobile' || deviceType === 'tablet';

  const handleConnect = () => {
    setIsConnected(true);
    localStorage.setItem('walletConnected', 'true');
  };

  const handleLogout = () => {
    setIsConnected(false);
    setIsDropdownOpen(false);
    localStorage.removeItem('walletConnected');
  };

  const renderWalletButton = () => {
    if (!mounted || isConnected === null) {
      return (
        <div className="bg-[#141414] text-white py-2.5 px-4 rounded-full text-[18px] font-semibold h-10 w-[160px] border border-[#2A2A2E] flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-[#3AABEE] border-t-transparent animate-spin"></div>
        </div>
      );
    }

    if (isConnected) {
      return (
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-[#141414] text-white py-2.5 px-4 rounded-full text-[18px] font-semibold flex items-center hover:bg-[#2A2A2E] transition-colors duration-300 h-10 border border-[#2A2A2E]"
        >
          <Avatar
            size={24}
            name="EQD....abc"
            variant="beam"
            colors={['#3AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0']}
            className="mr-2"
          />
          <span>EQD....abc</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      );
    }

    return (
      <button
        onClick={handleConnect}
        className="bg-[#31A6F5] text-white py-2.5 px-5 rounded-full text-[18px] font-semibold hover:bg-[#2691D9] transition-colors duration-300 h-10"
      >
        Connect Wallet
      </button>
    );
  };

  return (
    <>
      <header className="bg-black bg-opacity-70 backdrop-filter backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-16">
            <Link href="/" className="flex items-center">
              <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={28} height={28} className="mr-3 invert" />
              <span className="font-bold text-[20px]">WooDogs</span>
            </Link>
            {!isMobileOrTablet && (
              <nav className="hidden lg:flex items-center space-x-6">
                {navItems.map((item, index) => (
                  item.isButton ? (
                    <Link key={index} href={item.href}>
                      <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2.5 px-5 rounded-full text-[18px] font-semibold h-10 flex items-center justify-center hover:brightness-110 transition-all duration-300">
                        <span>{item.label}</span>
                      </button>
                    </Link>
                  ) : (
                    <Link 
                      key={index}
                      href={item.href || '#'}
                      className={`text-[18px] font-medium ${
                        item.isActive ? 'text-[#3AABEE]' : 'text-white hover:text-[#3AABEE]'
                      } ${item.soon ? 'opacity-50 cursor-not-allowed' : ''}`}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                      {item.soon && <span className="ml-2 text-[16px] bg-[#2A2A2E] px-2 py-1 rounded">Soon</span>}
                    </Link>
                  )
                ))}
              </nav>
            )}
            <div className="flex items-center space-x-4">
              {!isMobileOrTablet && (
                <div className="relative">
                  {renderWalletButton()}
                  {isConnected && isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#141414] border border-[#2A2A2E] shadow-lg">
                      <div className="py-1">
                        <Link href="/profile" className="block px-4 py-2.5 text-[18px] text-gray-300 hover:bg-[#2A2A2E] hover:text-white">
                          Profile
                        </Link>
                        <Link href="/settings" className="block px-4 py-2.5 text-[18px] text-gray-300 hover:bg-[#2A2A2E] hover:text-white">
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2.5 text-[18px] text-red-400 hover:bg-[#2A2A2E] hover:text-red-500"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {isMobileOrTablet && (
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && isMobileOrTablet && (
        <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-filter backdrop-blur-md z-40 pt-16">
          <div className="max-w-md mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                item.isButton ? (
                  <Link 
                    key={index}
                    href={item.href}
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2.5 px-5 rounded-full text-[18px] font-semibold h-10 flex items-center justify-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link 
                    key={index}
                    href={item.href || '#'}
                    className={`text-[20px] font-semibold ${
                      item.isActive ? 'text-[#3AABEE]' : 'text-white'
                    } ${item.soon ? 'opacity-50' : ''}`}
                    onClick={() => item.soon ? null : setIsMenuOpen(false)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                    {item.soon && <span className="ml-2 text-[16px] bg-[#2A2A2E] px-2 py-1 rounded">Soon</span>}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Wallet Button */}
      {isMobileOrTablet && mounted && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black bg-opacity-80 backdrop-filter backdrop-blur-md rounded-full p-2 shadow-lg">
            {renderWalletButton()}
            {isConnected && isDropdownOpen && (
              <div className="absolute bottom-full mb-2 right-0 w-56 rounded-xl bg-[#141414] border border-[#2A2A2E] shadow-lg">
                <div className="py-1">
                  <Link href="/profile" className="block px-4 py-2.5 text-[18px] text-gray-300 hover:bg-[#2A2A2E] hover:text-white">
                    Profile
                  </Link>
                  <Link href="/settings" className="block px-4 py-2.5 text-[18px] text-gray-300 hover:bg-[#2A2A2E] hover:text-white">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 text-[18px] text-red-400 hover:bg-[#2A2A2E] hover:text-red-500"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
