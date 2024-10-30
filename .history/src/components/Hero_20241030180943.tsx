'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useSearch } from './SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative max-w-xl mx-auto w-full">
      <input
        type="text"
        placeholder="Search wallets"
        className="w-full py-4 px-6 pr-12 rounded-full bg-[#141414] text-white placeholder-gray-400 focus:outline-none text-[20px] h-14 leading-tight border border-[#2A2A2E]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
        onClick={() => {/* Добавьте здесь логику поиска, если необходимо */}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </button>
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
    <span className="inline-block relative text-[64px] sm:text-4xl md:text-5xl lg:text-6xl">
      <span className="text-white">
        {currentTitle}
      </span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black pt-24 pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center">
          <div className="mb-8 sm:mb-10">
            <Image 
              src="/flag.gif" 
              alt="Flag GIF" 
              width={220} 
              height={220} 
              className="mx-auto object-contain rounded-[22%]"
              priority
            />
          </div>
          <h1 className="text-[64px] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-8 leading-[1.1]">
            <span className="titanium-gradient inline-block">
              Buy and Sell
            </span>{' '}
            <AnimatedTitle />
          </h1>
          <p className="text-[24px] sm:text-lg md:text-xl lg:text-2xl mb-10 sm:mb-10 text-gray-300 max-w-2xl mx-auto leading-relaxed">
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
