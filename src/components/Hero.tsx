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
        className="w-full py-2 px-4 pr-10 rounded-full bg-[#141414] text-white placeholder-gray-400 focus:outline-none text-sm h-10 leading-tight border border-[#2A2A2E] text-[16px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
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
      <span className="text-white">
        {currentTitle}
      </span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="bg-black pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center">
          <div className="mb-4">
            <Image 
              src="/flag.gif" 
              alt="Flag GIF" 
              width={160} 
              height={160} 
              className="mx-auto object-contain rounded-[22%]"
            />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
            <span className="titanium-gradient">Buy and Sell</span>{' '}
            <AnimatedTitle />
          </h1>
          <p className="text-sm sm:text-base mb-4 text-gray-300 max-w-2xl mx-auto">
            Secure your assets with blockchain wallets in an ecosystem of over 950 million users. 
            Manage your TON with unparalleled security and convenience.
          </p>
          <SearchBar />
        </div>
      </div>
      <style jsx global>{`
        .titanium-gradient {
          background: linear-gradient(
            45deg,
            #E8E8E8,
            #D3D3D3,
            #BEBEBE,
            #A9A9A9
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: titanium 10s ease infinite;
        }

        @keyframes titanium {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
