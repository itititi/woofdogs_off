'use client';

import React from 'react';

const TonConnectButton: React.FC = () => {
  return (
    <button className="bg-[#2AABEE] hover:bg-[#229ED9] text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center justify-center h-10 min-h-[40px] max-h-[40px] text-sm w-[140px]">
      Connect Wallet
    </button>
  );
};

export default TonConnectButton;
