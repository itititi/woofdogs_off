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
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search wallets"
          className="w-full py-3.5 px-5 pr-[120px] rounded-xl bg-[#141414]/80 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none text-[16px] h-12 leading-tight border border-[#2A2A2E]/50 transition-all duration-300 focus:border-[#3AABEE]/50 hover:bg-[#1A1A1A]/80"
          style={{ 
            WebkitTextSizeAdjust: 'none',
            fontSize: '16px'
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <div className="hidden sm:flex items-center gap-3 translate-y-[1px]">
            <span className="text-[12px] text-gray-400/70 bg-[#2A2A2E] px-2 py-0.5 rounded-xl">
              cmd+K
            </span>
            <div className="w-px h-4 bg-[#2A2A2E]"></div>
          </div>
          <button className="text-white/50 hover:text-white/70 focus:outline-none transition-colors duration-300 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
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
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, rgba(255,255,255,${Math.max(0.9 - scrollPosition / 1000, 0.5)}) 0%, rgba(255,255,255,${Math.max(0.6 - scrollPosition / 1000, 0.3)}) 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'background-image 0.3s ease-out',
    lineHeight: '1.2',
  };

  return (
    <div className="bg-black pt-[16px] sm:pt-16 lg:pt-20 2xl:pt-24 pb-0 sm:pb-8 lg:pb-10 2xl:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center">
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <Image 
              src="/flag.gif" 
              alt="Flag GIF" 
              width={140} 
              height={140} 
              className="mx-auto object-contain rounded-[22%]"
              priority
            />
          </div>
          <h1 className="mb-4 sm:mb-5 lg:mb-6 flex items-center justify-center gap-3">
            <span 
              className="text-[28px] sm:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] font-bold whitespace-nowrap inline-block"
              style={gradientStyle}
            >
              Buy and Sell
            </span>
            <span className="text-[28px] sm:text-[32px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] font-bold whitespace-nowrap inline-block leading-[1.2]">
              <AnimatedTitle />
            </span>
          </h1>
          <p className="text-[14px] sm:text-[16px] lg:text-[18px] mb-8 sm:mb-10 lg:mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Secure your assets with blockchain wallets in an ecosystem of over 950 million users. 
            Manage your TON with unparalleled security and convenience.
          </p>
          <div className="-mb-4 sm:mb-0">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
