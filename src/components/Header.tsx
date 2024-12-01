'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import {TonConnectButton} from "@tonconnect/ui-react";
const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(() => [
    { href: '/', label: 'TON Wallets', isActive: pathname === '/' },
    { label: 'Ethereum Wallets', soon: true },
    { label: 'Solana Wallets', soon: true },
    { href: 'https://t.me/woodogs_support', label: 'Support', external: true },
    { href: '/airdrop', label: 'Airdrop', isButton: true },
  ], [pathname]);

  return (
      <header
          className="bg-black/80 backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2E]/50 ">
          <div className="max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="flex items-center h-16 gap-9">
                  <Link href="/" className="flex items-center flex-shrink-0">
                      <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={32} height={32} className="mr-2 invert"/>
                      <span className="font-bold text-[20px] whitespace-nowrap">WooDogs</span>
                  </Link>
                  <TonConnectButton/>
                  <div className="flex items-center justify-between space-x-3">
                      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white flex-shrink-0">
                          {isMenuOpen ? <X size={22}/> : <Menu size={22}/>}
                      </button>
                  </div>
              </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 pt-20">
                  <div className="max-w-md mx-auto px-4 bg-black/95 h-[calc(100vh-80px)] flex flex-col">
                      <nav className="flex flex-col space-y-6 flex-1 bg-black/95">
                          {navItems.map((item, index) => (
                              <Link
                                  key={index}
                                  href={item.href || '#'}
                                  className={`group flex items-center justify-between rounded-full p-4 py-2 bg-[#2A2A2E]/30 ${
                                      item.isActive ? 'text-[#3AABEE]' : 'text-white/90'
                                  } ${item.soon ? 'cursor-not-allowed' : ''}`}
                                  onClick={() => item.soon ? null : setIsMenuOpen(false)}
                                  target={item.external ? "_blank" : undefined}
                                  rel={item.external ? "noopener noreferrer" : undefined}
                              >
                  <span className="text-[18px] font-medium relative ">
                    {item.label}
                      {item.isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3AABEE] rounded-full"></span>
                      )}
                  </span>
                                  {item.soon && (
                                      <span
                                          className="text-sm font-medium px-3 py-1 rounded-full bg-[#2A2A2E]/80 text-white backdrop-blur-sm border border-[#2A2A2E]  bg-gradient-to-r from-[#FF3366] via-[#FF6B6B] to-[#FF3366] group-hover:from-[#FF6B6B] group-hover:via-[#FF3366] group-hover:to-[#FF6B6B] transition-all duration-500 bg-[length:200%_100%] animate-gradient">
                      Soon
                    </span>
                                  )}
                              </Link>
                          ))}
                      </nav>
                      <div className="pb-[calc(120px+env(safe-area-inset-bottom))]">
                          <button
                              onClick={() => setIsMenuOpen(false)}
                              className="relative group h-12 rounded-xl overflow-hidden flex items-center justify-center bg-[#141414] hover:bg-[#2A2A2E] border border-[#2A2A2E]/50 transition-all duration-300 w-full"
                          >
                              <span
                                  className="text-[16px] font-semibold text-white/90 group-hover:text-white z-10">Close</span>
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </header>
  );
};

export default Header;