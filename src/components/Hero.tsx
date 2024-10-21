'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useSearch } from './SearchContext';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search for TON, Ethereum, or Solana wallets"
        className="w-full py-4 px-6 pr-12 rounded-full bg-[#141414] text-white placeholder-gray-400 focus:outline-none text-lg h-16 leading-tight min-h-[64px] max-h-[64px] border border-[#2A2A2E]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
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
      <span className="psychedelic-gradient">
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
              className="mx-auto object-contain rounded-[22%]"
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
      <style jsx global>{`
        @keyframes psychedelic {
          0% {
            filter: hue-rotate(0deg) saturate(100%);
          }
          25% {
            filter: hue-rotate(90deg) saturate(150%);
          }
          50% {
            filter: hue-rotate(180deg) saturate(200%);
          }
          75% {
            filter: hue-rotate(270deg) saturate(150%);
          }
          100% {
            filter: hue-rotate(360deg) saturate(100%);
          }
        }
        .psychedelic-gradient {
          background: linear-gradient(
            45deg,
            #ff00ff,
            #00ffff,
            #ffff00,
            #ff00ff
          );
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: psychedelic 15s ease infinite;
        }
        .psychedelic-gradient::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: inherit;
          filter: blur(8px);
          opacity: 0.8;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default Hero;
