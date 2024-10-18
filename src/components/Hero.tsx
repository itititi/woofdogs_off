'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useSearch } from './SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search for TON, Ethereum, or Solana wallets"
        className="w-full py-3 px-6 pr-12 rounded-full bg-[#1C1C1E] text-white placeholder-gray-400 focus:outline-none text-base h-14 leading-tight min-h-[56px] max-h-[56px] border border-[#2A2A2E]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <Search className="w-6 h-6 text-gray-400" />
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
    <span className="inline-block relative">
      <span className="bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">
        {currentTitle}
      </span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-6">
            <Image src="/money.gif" alt="Money GIF" width={150} height={150} className="mx-auto" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Buy and Sell <AnimatedTitle />
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-3xl mx-auto">
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
