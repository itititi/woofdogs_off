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
      setOffset((prevOffset) => (prevOffset + 1) % 360);
    }, 50);

    return () => {
      clearInterval(intervalOffset);
    };
  }, []);

  const getColor = (index: number) => {
    const hue = (offset + index * 30) % 360;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const repeatedSlogans = [...slogans, ...slogans];

  return (
    <div className="overflow-hidden py-4 sm:py-6">
      <div className="whitespace-nowrap inline-block animate-marquee">
        {repeatedSlogans.map((slogan, sloganIndex) => (
          <span key={sloganIndex} className="inline-block mx-4 sm:mx-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
            {slogan.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block sega-text"
                style={{
                  color: getColor(charIndex + sloganIndex * slogan.length),
                  textShadow: '0 0 10px currentColor',
                } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
      <style jsx>{`
        .sega-text {
          font-family: 'Arial Black', sans-serif;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          transform: skew(-5deg);
          transition: all 0.3s ease;
          animation: glow 1.5s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            filter: drop-shadow(0 0 2px currentColor);
          }
          to {
            filter: drop-shadow(0 0 10px currentColor);
          }
        }
      `}</style>
    </div>
  );
};

const AirdropPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('mint');
  const [mintResult, setMintResult] = useState<string | null>(null);
  const [mintCount, setMintCount] = useState(0);

  useEffect(() => {
    // Имитация загрузки данных только для mintCount
    setMintCount(Math.floor(Math.random() * 10000));
  }, []);

  const handleMint = () => {
    const random = Math.random();
    if (random < 0.1) {
      const amount = Math.floor(Math.random() * (120000 - 86000 + 1) + 86000);
      setMintResult(`Congratulations! You've won ${amount} $WOOF tokens!`);
    } else {
      setMintResult("Sorry, you didn't win any tokens this time.");
    }
    setMintCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-14 sm:mt-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <RainbowText />
          
          {/* Stats Card - оставляем только Total Mints */}
          <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 mb-6 border border-[#2A2A2E]">
            <div className="bg-[#1A1A1A] rounded-xl p-4 text-center">
              <h3 className="text-sm text-gray-400 mb-2">Total Mints</h3>
              <p className="text-2xl sm:text-3xl font-bold text-[#3AABEE]">{mintCount.toLocaleString()}</p>
            </div>
          </div>
          
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
                  <div className="mt-4 bg-[#1A1A1A] rounded-lg p-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-400">Total Mints:</span>
                      <span className="text-sm font-bold text-[#3AABEE]">5,760</span>
                    </div>
                    <h4 className="text-xs font-semibold text-gray-300 mb-2">Mint Progress</h4>
                    <div className="w-full bg-[#2A2A2E] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#3AABEE] to-[#1E90FF] h-2 rounded-full"
                        style={{ width: `${(5760 / 10000) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">5,760 / 10,000 minted</p>
                  </div>
                </div>
                <div className="w-full sm:w-2/3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3AABEE] mb-3">Mint $WOOF Tokens</h2>
                  <p className="text-xs sm:text-sm mb-4 text-gray-300">
                    Mint 1000 $WOOF tokens and get a chance to win a random wallet with $86k-$120k worth of tokens!
                  </p>
                  <div className="bg-[#1A1A1A] rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Mint Price:</span>
                      <span className="text-sm font-bold text-[#3AABEE]">1000 $WOOF</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Win Chance:</span>
                      <span className="text-sm font-bold text-green-500">10%</span>
                    </div>
                  </div>
                  <button
                    onClick={handleMint}
                    className="w-full bg-gradient-to-r from-[#3AABEE] to-[#1E90FF] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
                  >
                    Mint $WOOF
                  </button>
                  {mintResult && (
                    <div className={`p-4 rounded-lg mb-4 ${
                      mintResult.includes('Congratulations') 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      <p className="text-xs sm:text-sm font-semibold">{mintResult}</p>
                    </div>
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
                  <div className="mt-4 bg-[#1A1A1A] rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-gray-300 mb-2">Your Referrals</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Total Referrals:</span>
                      <span className="text-xs font-bold text-[#3AABEE]">{Math.floor(Math.random() * 10)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">Earned $WOOF:</span>
                      <span className="text-xs font-bold text-green-500">{Math.floor(Math.random() * 5000)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-2/3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#3AABEE] mb-3">Invite & Earn</h2>
                  <p className="text-xs sm:text-sm mb-4 text-gray-300">
                    Invite your friends and earn additional $WOOF tokens! For each friend who successfully mints $WOOF tokens, you'll receive a 5% bonus.
                  </p>
                  <div className="bg-[#1A1A1A] p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-300">Referral Bonus:</span>
                      <span className="text-sm font-bold text-green-500">5% per mint</span>
                    </div>
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
                  <div className="bg-[#1A1A1A] rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-gray-200 mb-2">How it works:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-xs text-gray-300">
                        <span className="w-5 h-5 rounded-full bg-[#3AABEE] flex items-center justify-center text-white mr-2">1</span>
                        Share your referral link with friends
                      </li>
                      <li className="flex items-center text-xs text-gray-300">
                        <span className="w-5 h-5 rounded-full bg-[#3AABEE] flex items-center justify-center text-white mr-2">2</span>
                        Friends mint $WOOF tokens using your link
                      </li>
                      <li className="flex items-center text-xs text-gray-300">
                        <span className="w-5 h-5 rounded-full bg-[#3AABEE] flex items-center justify-center text-white mr-2">3</span>
                        You earn 5% bonus for each mint
                      </li>
                    </ul>
                  </div>
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
