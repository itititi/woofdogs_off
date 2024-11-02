'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleProfileClick = () => {
    sessionStorage.setItem('profileData', JSON.stringify({
      address: 'EQD....abc',
      id: Math.random().toString(36).substring(7)
    }));
    
    setIsDropdownOpen(false);
    router.push('/profile');
  };

  const renderWalletButton = () => {
    if (!mounted || isConnected === null) {
      return (
        <div className="bg-[#141414] text-white py-2 px-4 rounded-xl text-[14px] font-medium h-10 w-[140px] flex items-center justify-center border border-[#2A2A2E]">
          <div className="w-3 h-3 rounded-full border-2 border-[#3AABEE] border-t-transparent animate-spin"></div>
        </div>
      );
    }

    if (isConnected) {
      return (
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-[#141414]/80 backdrop-blur-md text-white py-2 px-4 rounded-xl text-[14px] font-medium flex items-center hover:bg-[#2A2A2E] transition-all duration-300 h-10 border border-[#2A2A2E]/50 min-w-[160px] justify-between group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#3AABEE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center space-x-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3AABEE] animate-pulse"></div>
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text font-semibold">
                  0xF13df1
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 z-10">
            <div className="w-px h-4 bg-[#2A2A2E]"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/50 group-hover:text-white/70 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </button>
      );
    }

    return (
      <button
        onClick={handleConnect}
        className="relative group h-10 px-6 rounded-xl overflow-hidden flex items-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] hover:from-[#2691D9] hover:to-[#1E88E5] transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
        <span className="text-[14px] font-semibold text-white z-10">Connect Wallet</span>
      </button>
    );
  };

  return (
    <>
      <header className="bg-black/80 backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2E]/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={36} height={36} className="mr-3 invert" />
              <span className="font-bold text-[22px] whitespace-nowrap">WooDogs</span>
            </Link>
            
            {!isMobileOrTablet && (
              <nav className="hidden lg:flex items-center space-x-8 flex-shrink-0">
                {navItems.map((item, index) => (
                  item.isButton ? (
                    <Link key={index} href={item.href} className="flex-shrink-0">
                      <button className="relative group h-10 px-6 rounded-xl overflow-hidden flex items-center bg-gradient-to-br from-[#FF3366] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#FF3366] transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                        <span className="text-[14px] font-semibold text-white z-10">{item.label}</span>
                      </button>
                    </Link>
                  ) : (
                    <Link 
                      key={index}
                      href={item.href || '#'}
                      className={`relative group flex items-center ${
                        item.isActive 
                          ? 'text-[#3AABEE]' 
                          : 'text-white/80 hover:text-white'
                      } ${item.soon ? 'cursor-not-allowed' : ''} flex-shrink-0`}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                    >
                      <span className="text-[14px] font-medium whitespace-nowrap relative">
                        {item.label}
                        {item.isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3AABEE] rounded-full transform scale-x-100 transition-transform duration-300"></span>
                        )}
                        {!item.isActive && !item.soon && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        )}
                      </span>
                      {item.soon && (
                        <span className="ml-2 text-[12px] font-medium px-2 py-0.5 rounded-full bg-[#2A2A2E]/80 text-white/60 backdrop-blur-sm border border-[#2A2A2E] whitespace-nowrap">
                          Soon
                        </span>
                      )}
                    </Link>
                  )
                ))}
              </nav>
            )}

            <div className="flex items-center space-x-4 flex-shrink-0">
              <div className="relative">
                {renderWalletButton()}
                {isConnected && isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#141414]/95 backdrop-blur-md border border-[#2A2A2E]/50 shadow-lg overflow-hidden">
                    <div className="py-1">
                      <button 
                        onClick={handleProfileClick}
                        className="flex items-center w-full px-4 py-3 text-[14px] text-gray-300 hover:bg-[#2A2A2E]/50 hover:text-white transition-all duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-[14px] text-red-400 hover:bg-[#2A2A2E]/50 hover:text-red-500 transition-all duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l-3-3a1 1 0 000-1.414l3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {isMobileOrTablet && (
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white flex-shrink-0">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && isMobileOrTablet && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 pt-20">
          <div className="max-w-md mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                item.isButton ? (
                  <Link 
                    key={index}
                    href={item.href}
                    className="relative group h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#FF3366] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#FF3366] transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                    <span className="text-[16px] font-semibold text-white z-10">{item.label}</span>
                  </Link>
                ) : (
                  <Link 
                    key={index}
                    href={item.href || '#'}
                    className={`group flex items-center justify-between ${
                      item.isActive ? 'text-[#3AABEE]' : 'text-white/90'
                    } ${item.soon ? 'cursor-not-allowed' : ''}`}
                    onClick={() => item.soon ? null : setIsMenuOpen(false)}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                  >
                    <span className="text-[18px] font-medium relative">
                      {item.label}
                      {item.isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3AABEE] rounded-full"></span>
                      )}
                    </span>
                    {item.soon && (
                      <span className="text-[14px] font-medium px-3 py-1 rounded-full bg-[#2A2A2E]/80 text-white/60 backdrop-blur-sm border border-[#2A2A2E]">
                        Soon
                      </span>
                    )}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
