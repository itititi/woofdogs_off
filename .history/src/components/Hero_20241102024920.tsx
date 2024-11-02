'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useSearch } from './SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative max-w-xl mx-auto w-full">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3AABEE] via-[#2691D9] to-[#1E88E5] rounded-full opacity-30 group-hover:opacity-50 transition duration-300 blur"></div>
        <input
          type="text"
          placeholder="Search wallets"
          className="w-full py-3.5 px-5 pr-12 rounded-full bg-[#141414]/80 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none text-[16px] h-12 leading-tight border border-[#2A2A2E]/50 relative z-10 transition-all duration-300 focus:border-[#3AABEE]/50"
          style={{ WebkitTextSizeAdjust: 'none' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none z-10 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
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

  return (
    <span className="relative">
      <span className="absolute -inset-1 bg-gradient-to-r from-[#3AABEE]/20 to-transparent blur"></span>
      <span className="relative">{currentTitle}</span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(58,171,238,0.1),transparent_50%)]"></div>
      
      <div className="max-w-4xl mx-auto w-full relative">
        <div className="text-center">
          <div className="mb-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3AABEE]/20 via-[#2691D9]/20 to-[#1E88E5]/20 rounded-[22%] blur-md opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <Image 
              src="/flag.gif" 
              alt="Flag GIF" 
              width={140} 
              height={140} 
              className="mx-auto object-contain rounded-[22%] relative"
              priority
            />
          </div>
          
          <div className="mb-5 leading-[1.1] relative">
            <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold space-x-3">
              <span className="bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text">
                Buy and Sell
              </span>{' '}
              <AnimatedTitle />
            </h1>
          </div>
          
          <p className="text-[14px] sm:text-[16px] mb-8 text-gray-300/90 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm relative">
            <span className="absolute -inset-1 bg-gradient-to-r from-[#3AABEE]/5 to-transparent blur"></span>
            <span className="relative">
              Secure your assets with blockchain wallets in an ecosystem of over 950 million users. 
              Manage your TON with unparalleled security and convenience.
            </span>
          </p>
          
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;
