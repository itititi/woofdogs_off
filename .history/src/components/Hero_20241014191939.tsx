'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search for TON, Ethereum, or Solana wallets"
        className="w-full py-4 px-6 pr-12 rounded-full bg-[#1C1C1E] text-white placeholder-gray-500 focus:outline-none"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Search className="w-6 h-6 text-gray-400" />
      </div>
    </div>
  );
};

const AnimatedTitle: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState('TON Wallets');
  const titles = ['TON Wallets', 'CryptoBot', 'TON Space'];

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
    <span className="inline-block">
      {currentTitle}
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <Image src="/money.gif" alt="Money GIF" width={200} height={200} className="mx-auto" />
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
          Buy and Sell <AnimatedTitle />
        </h1>
        <p className="text-xl sm:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
          Secure your assets with blockchain wallets in an ecosystem of over 950 million users. 
          Manage your TON with unparalleled security and convenience.
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Hero;
