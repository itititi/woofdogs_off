'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { useSearch } from './SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search for TON, Ethereum, or Solana wallets"
        className="w-full py-4 px-6 pr-12 rounded-full bg-[#1C1C1E] text-white placeholder-gray-400 focus:outline-none text-lg h-16 leading-tight min-h-[64px] max-h-[64px] border border-[#2A2A2E]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <Search className="w-8 h-8 text-gray-400" />
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gifSize = Math.max(200 - scrollY / 2, 100); // Уменьшаем размер GIF от 200px до минимум 100px

  return (
    <div className="bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="mb-8 transition-all duration-300" style={{ height: `${gifSize}px` }}>
            <Image 
              src="/money.gif" 
              alt="Money GIF" 
              width={200} 
              height={200} 
              className="mx-auto object-contain"
              style={{ width: `${gifSize}px`, height: `${gifSize}px` }}
            />
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-white">
            Buy and Sell <AnimatedTitle />
          </h1>
          <p className="text-xl sm:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto">
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
