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
        className="w-full py-2.5 px-4 pr-10 rounded-full bg-[#141414] text-white placeholder-gray-400 focus:outline-none text-[14px] h-10 leading-tight border border-[#2A2A2E]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
        onClick={() => {/* Добавьте здесь логику поиска, если необходимо */}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
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
            <span className="titanium-gradient inline text-[28px] sm:text-[32px] font-bold">
              Buy and Sell
            </span>{' '}
            <span className="text-white inline text-[28px] sm:text-[32px] font-bold">
              <AnimatedTitle />
            </span>
          </div>
          <p className="text-[16px] sm:text-[14px] mb-6 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Secure your assets with blockchain wallets in an ecosystem of over 950 million users. 
            Manage your TON with unparalleled security and convenience.
          </p>
          <SearchBar />
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

export default Hero;
