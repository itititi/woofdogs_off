'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';

const slogans = [
  "WOOFWOOFBONANZA",
  "BARKBARKBONANZA",
  "PAWSOMEPARTY",
  "TAILWAGGINTIME",
  "HOWLHAPPYHOUR",
  "SNOUTSNIFFINSUCCESS",
  "FURBULOUSFIESTA",
  "CANINECRAZE",
  "PUPPYPALOOZA",
  "DOGGODAYDELIGHT",
  "BONEAPPETITBASH"
];

const RainbowText: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const intervalOffset = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 1) % 3);
    }, 100);

    return () => {
      clearInterval(intervalOffset);
    };
  }, []);

  const getColor = (index: number) => {
    const colors = ['#D3D3D3', '#A9A9A9', '#808080'];
    return colors[(index + offset) % 3];
  };

  const repeatedSlogans = [...slogans, ...slogans];

  return (
    <div className="overflow-hidden py-4 sm:py-6">
      <div className="whitespace-nowrap inline-block animate-marquee">
        {repeatedSlogans.map((slogan, sloganIndex) => (
          <span key={sloganIndex} className="inline-block mx-4 sm:mx-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            {slogan.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block metallic-text"
                style={{
                  '--color': getColor(charIndex + sloganIndex * slogan.length),
                } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
      <style jsx>{`
        .metallic-text {
          color: var(--color);
          text-shadow: 
            0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0,0,0,.1),
            0 0 5px rgba(0,0,0,.1),
            0 1px 3px rgba(0,0,0,.3),
            0 3px 5px rgba(0,0,0,.2),
            0 5px 10px rgba(0,0,0,.25),
            0 10px 10px rgba(0,0,0,.2),
            0 20px 20px rgba(0,0,0,.15);
          transform: skew(-15deg);
          transition: all 0.3s ease;
        }
        .metallic-text:hover {
          text-shadow: 
            0 1px 0 #ccc,
            0 2px 0 #c9c9c9,
            0 3px 0 #bbb,
            0 4px 0 #b9b9b9,
            0 5px 0 #aaa,
            0 6px 1px rgba(0,0,0,.1),
            0 0 5px rgba(0,0,0,.1),
            0 1px 3px rgba(0,0,0,.3),
            0 3px 5px rgba(0,0,0,.2),
            0 5px 10px rgba(0,0,0,.25),
            0 10px 10px rgba(0,0,0,.2),
            0 20px 20px rgba(0,0,0,.15),
            0 0 20px rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
};

const AirdropPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mint');
  const [mintResult, setMintResult] = useState<string | null>(null);

  const handleMint = () => {
    const random = Math.random();
    if (random < 0.1) {
      const amount = Math.floor(Math.random() * (120000 - 86000 + 1) + 86000);
      setMintResult(`Congratulations! You've won ${amount} $WOOF tokens!`);
    } else {
      setMintResult("Sorry, you didn't win any tokens this time.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-14 sm:mt-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <RainbowText />
          
          <div className="mb-6">
            <div className="flex justify-center border-b border-[#2A2A2E]">
              <button
                className={`py-2 px-4 text-xs sm:text-sm ${activeTab === 'mint' ? 'text-[#3AABEE] border-b-2 border-[#3AABEE]' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('mint')}
              >
                Mint $WOOF
              </button>
              <button
                className={`py-2 px-4 text-xs sm:text-sm ${activeTab === 'invite' ? 'text-[#3AABEE] border-b-2 border-[#3AABEE]' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('invite')}
              >
                Invite & Earn
              </button>
            </div>
          </div>

          {activeTab === 'mint' && (
            <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 mb-6 border border-[#2A2A2E]">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
                <div className="mb-4 sm:mb-0 w-full sm:w-1/3">
                  <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
                    <Image 
                      src="/dogs.gif" 
                      alt="Dogs GIF" 
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-lg"
                      priority
                    />
                  </div>
                </div>
                <div className="w-full sm:w-2/3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3AABEE] mb-3">Mint $WOOF Tokens</h2>
                  <p className="text-xs sm:text-sm mb-4 text-gray-300">
                    Mint 1000 $WOOF tokens and get a chance to win a random wallet with $86k-$120k worth of tokens!
                  </p>
                  <button
                    onClick={handleMint}
                    className="w-full bg-gradient-to-r from-[#3AABEE] to-[#1E90FF] text-white text-xs sm:text-sm font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
                  >
                    Mint $WOOF
                  </button>
                  {mintResult && (
                    <p className="text-xs sm:text-sm font-semibold text-[#3AABEE] mb-4">{mintResult}</p>
                  )}
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    <span className="font-semibold text-gray-300">Warning:</span> By participating, you acknowledge that you're risking your funds. You may win or lose your investment. Proceed at your own risk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invite' && (
            <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 mb-6 border border-[#2A2A2E]">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
                <div className="mb-4 sm:mb-0 w-full sm:w-1/3">
                  <div className="relative w-full pt-[100%] rounded-lg overflow-hidden">
                    <Image 
                      src="/invite.gif" 
                      alt="Invite GIF" 
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-lg"
                      priority
                    />
                  </div>
                </div>
                <div className="w-full sm:w-2/3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3AABEE] mb-3">Invite & Earn</h2>
                  <p className="text-xs sm:text-sm mb-4 text-gray-300">
                    Invite your friends and earn additional $WOOF tokens! For each friend who successfully mints $WOOF tokens, you'll receive a 5% bonus.
                  </p>
                  <div className="bg-[#1A1A1A] p-3 sm:p-4 mb-4 rounded-lg">
                    <p className="font-semibold mb-2 text-[10px] sm:text-xs text-gray-200">Your Referral Link:</p>
                    <div className="flex">
                      <input
                        type="text"
                        value="https://woodogs.com/airdrop?ref=YOUR_ID"
                        readOnly
                        className="w-full bg-[#141414] text-gray-200 py-2 px-3 rounded-l text-[10px] sm:text-xs border border-[#2A2A2E]"
                      />
                      <button
                        className="bg-[#3AABEE] text-white px-3 sm:px-4 py-2 rounded-r hover:bg-[#1E90FF] transition-colors duration-300 text-[10px] sm:text-xs"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    Share your referral link with friends to start earning bonuses!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AirdropPage;
