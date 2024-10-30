'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

const AirdropPage: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Participate in our TON Airdrop",
    "Join the TON Community",
    "Get Free TON Tokens",
    "Be Part of the Future"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-14 sm:mt-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 border border-[#2A2A2E]">
            <div className="text-center mb-6">
              <div className="mb-4">
                <Image 
                  src="/airdrop.gif" 
                  alt="Airdrop" 
                  width={100} 
                  height={100} 
                  className="mx-auto object-contain rounded-[22%]"
                  priority
                />
              </div>
              <div className="h-[32px] sm:h-[36px] mb-2">
                <h1 className="text-[20px] sm:text-[24px] font-bold titanium-gradient">
                  {texts[currentText]}
                </h1>
              </div>
              <p className="text-[14px] text-gray-300 max-w-lg mx-auto">
                Join our community and get a chance to receive TON tokens. 
                Connect your wallet or enter your TON address to participate.
              </p>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-4 mb-4 shadow-inner">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[14px] text-gray-400 mb-2">
                    TON Wallet Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your TON address"
                    className="w-full bg-[#141414] text-white rounded-xl px-4 py-3 text-[14px] border border-[#2A2A2E] focus:outline-none focus:border-[#3AABEE]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3AABEE] to-[#1E90FF] text-white text-[14px] font-semibold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300"
                >
                  Participate in Airdrop
                </button>
              </form>
            </div>

            <div className="space-y-3">
              <h3 className="text-[16px] font-bold titanium-gradient">Requirements:</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-[14px] text-gray-300">
                  <svg className="h-5 w-5 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Have a valid TON wallet address
                </li>
                <li className="flex items-center text-[14px] text-gray-300">
                  <svg className="h-5 w-5 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Join our Telegram community
                </li>
                <li className="flex items-center text-[14px] text-gray-300">
                  <svg className="h-5 w-5 mr-2 text-[#3AABEE]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Follow our social media channels
                </li>
              </ul>
            </div>

            <div className="mt-4 bg-[#1A1A1A] p-4 rounded-xl">
              <p className="text-[12px] text-gray-300">
                <strong className="text-white">Note:</strong> We never ask for your private keys or seed phrases. Stay safe and verify all links.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AirdropPage;
