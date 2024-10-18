'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react/dist/esm/icons';
import { useSearch } from './SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search for TON, Ethereum, or Solana wallets"
        className="w-full py-3 px-4 pr-10 rounded-full bg-[#1C1C1E] text-white placeholder-gray-500 focus:outline-none text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Search className="w-5 h-5 text-gray-400" />
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
    <span className="inline-block text-blue-500">
      {currentTitle}
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
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
  );
};

export default Hero;
