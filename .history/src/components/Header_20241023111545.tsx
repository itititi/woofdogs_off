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
  const [isConnected, setIsConnected] = useState(false);

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

    // Восстановление состояния подключения
    const savedConnectionState = localStorage.getItem('walletConnected');
    if (savedConnectionState === 'true') {
      setIsConnected(true);
    }

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

  const renderDropdown = () => (
    <div className={`${isMobileOrTablet ? 'absolute bottom-full mb-2' : 'absolute top-full mt-2'} right-0 w-48 rounded-md shadow-lg bg-[#1A1A1A] ring-1 ring-black ring-opacity-5`}>
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2E] hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          Profile
        </Link>
        <button 
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2E] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  const renderConnectWallet = () => (
    <button
      onClick={handleConnect}
      className="bg-[#31A6F5] text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-[#2995E0] transition-colors duration-300 h-10 flex items-center justify-center"
    >
      Connect Wallet
    </button>
  );

  const renderConnectedWallet = () => (
    <button 
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="bg-[#1A1A1A] text-white py-2 px-4 rounded-full text-sm font-semibold flex items-center hover:bg-[#2A2A2E] transition-colors duration-300 h-10"
    >
      <Avatar
        size={24}
        name="EQD....abc"
        variant="beam"
        colors={['#3AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0']}
        className="mr-2"
      />
      <span>EQD....abc</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );

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
                  item.isButton ? (
                    <Link key={index} href={item.href}>
                      <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-6 rounded-full text-sm font-semibold relative overflow-hidden group transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
                        <span className="relative z-10">{item.label}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></span>
                      </button>
                    </Link>
                  ) : (
                    <Link 
                      key={index}
                      href={item.href || '#'}
                      className={`text-sm xl:text-base font-medium ${
                        item.isActive ? 'text-[#3AABEE]' : 'text-white hover:text-[#3AABEE]'
                      } ${item.soon ? 'opacity-50 cursor-not-allowed' : ''}`}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                      {item.soon && <span className="ml-1 text-xs bg-[#2A2A2E] px-1 py-0.5 rounded">Soon</span>}
                    </Link>
                  )
                ))}
              </nav>
            )}
            <div className="flex items-center space-x-4">
              {!isMobileOrTablet && (
                <div className="relative">
                  {isConnected ? renderConnectedWallet() : renderConnectWallet()}
                  {isConnected && isDropdownOpen && renderDropdown()}
                </div>
              )}
              {isMobileOrTablet && (
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      {isMenuOpen && isMobileOrTablet && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-40 pt-16 md:pt-18">
          <div className="max-w-md mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                item.isButton ? (
                  <Link 
                    key={index}
                    href={item.href}
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-6 rounded-full text-sm font-semibold text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link 
                    key={index}
                    href={item.href || '#'}
                    className={`text-lg font-semibold ${
                      item.isActive ? 'text-[#3AABEE]' : 'text-white'
                    } ${item.soon ? 'opacity-50' : ''}`}
                    onClick={() => item.soon ? null : setIsMenuOpen(false)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                    {item.soon && <span className="ml-2 text-xs bg-[#2A2A2E] px-1 py-0.5 rounded">Soon</span>}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      )}
      {isMobileOrTablet && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-black bg-opacity-80 rounded-full p-2 shadow-lg relative">
            {isConnected ? renderConnectedWallet() : renderConnectWallet()}
            {isConnected && isDropdownOpen && renderDropdown()}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
