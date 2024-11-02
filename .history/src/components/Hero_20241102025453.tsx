'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useSearch } from './SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const searchRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative max-w-xl mx-auto w-full">
      <div className="relative">
        <div className="relative flex items-center">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search wallets"
            className="w-full py-3.5 px-5 pr-28 rounded-lg bg-[#141414]/80 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none text-[14px] h-12 leading-tight border border-[#2A2A2E]/50 relative z-10 transition-all duration-300 focus:border-[#3AABEE]/50 hover:bg-[#1A1A1A]/80"
            style={{ WebkitTextSizeAdjust: 'none' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-4 flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <kbd className="hidden sm:flex items-center gap-0.5 px-2 py-0.5 text-[12px] font-medium text-gray-400 bg-[#1A1A1A] rounded border border-[#2A2A2E]/50">
                <span className="text-[10px]">⌘</span>K
              </kbd>
              <div className="w-px h-4 bg-[#2A2A2E]"></div>
            </div>
            <button className="text-white/50 hover:text-white/70 focus:outline-none z-10 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedTitle: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState('TON Wallets');
  const titles = useMemo(() => ['TON Wallets', 'CryptoBot', 'TON Space'], []);

  const rotateTitle = useCallback(() => {
    setCurrentTitle(prev => {
      const currentIndex = titles.indexOf(prev);
      return titles[(currentIndex + 1) % titles.length];
    });
  }, [titles]);

  useEffect(() => {
    const interval = setInterval(rotateTitle, 3000);
    return () => clearInterval(interval);
  }, [rotateTitle]);

  return currentTitle;
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center">
          <div className="mb-6">
            <Image 
              src="/flag.gif" 
              alt="Flag GIF" 
              width={140} 
              height={140} 
              className="mx-auto object-contain rounded-[22%]"
              priority
            />
          </div>
          <div className="mb-5 leading-[1.1] whitespace-nowrap">
            <span className="titanium-gradient inline text-[28px] sm:text-[32px] lg:text-[36px] font-bold">
              Buy and Sell
            </span>{' '}
            <span className="text-white inline text-[28px] sm:text-[32px] lg:text-[36px] font-bold">
              <AnimatedTitle />
            </span>
          </div>
          <p className="text-[14px] sm:text-[16px] mb-6 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Secure your assets with blockchain wallets in an ecosystem of over 950 million users. 
            Manage your TON with unparalleled security and convenience.
          </p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
