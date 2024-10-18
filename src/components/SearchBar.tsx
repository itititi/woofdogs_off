import React from 'react';
import Image from 'next/image';

const SearchBar: React.FC = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search for TON, Ethereum, or Solana wallets"
        className="w-full py-4 px-6 pr-12 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Image src="/search-icon.svg" alt="Search" width={24} height={24} />
      </div>
    </div>
  );
};

export default SearchBar;
