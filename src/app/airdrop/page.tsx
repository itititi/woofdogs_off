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
    }, 100);

    return () => {
      clearInterval(intervalOffset);
    };
  }, []);

  const getColor = (index: number) => {
    const hue = (offset + index * 30) % 360;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const displaySlogans = [...slogans.slice(0, 5)];

  return (
    <div className="overflow-hidden py-4 sm:py-6">
      <div className="whitespace-nowrap inline-block animate-marquee">
        {displaySlogans.map((slogan, sloganIndex) => (
          <span key={sloganIndex} className="inline-block mx-4 sm:mx-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black">
            {slogan.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block sega-text"
                style={{
                  color: getColor(charIndex + sloganIndex * slogan.length),
                  textShadow: '0 0 5px currentColor',
                }}
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
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          transform: skew(-5deg);
          transition: color 0.3s ease;
        }

        @keyframes glow {
          from {
            filter: drop-shadow(0 0 1px currentColor);
          }
          to {
            filter: drop-shadow(0 0 5px currentColor);
          }
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
      <main className="flex-grow py-4 px-4 mt-14 sm:mt-20 lg:mt-24">
        <div className="max-w-3xl mx-auto">
          <RainbowText />
          
          <div className="mb-4">
            <div className="flex justify-center border-b border-[#2A2A2E]/50">
              <button
                className={`py-2 px-4 text-[14px] font-medium relative ${
                  activeTab === 'mint' ? 'text-[#3AABEE]' : 'text-white/80 hover:text-white'
                }`}
                onClick={() => setActiveTab('mint')}
              >
                Mint $WOOF
                {activeTab === 'mint' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3AABEE] rounded-full"></span>
                )}
              </button>
              <button
                className={`py-2 px-4 text-[14px] font-medium relative ${
                  activeTab === 'invite' ? 'text-[#3AABEE]' : 'text-white/80 hover:text-white'
                }`}
                onClick={() => setActiveTab('invite')}
              >
                Invite & Earn
                {activeTab === 'invite' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#3AABEE] rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          {activeTab === 'mint' && (
            <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 mb-4 border border-[#2A2A2E]">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
                <div className="mb-4 sm:mb-0 w-full sm:w-1/3">
                  <div className="relative w-[120px] h-[120px] sm:w-full sm:h-auto mx-auto">
                    <div className="sm:pt-[100%]">
                      <Image 
                        src="/dogs.gif" 
                        alt="Dogs GIF" 
                        width={120}
                        height={120}
                        className="w-full h-full object-cover rounded-xl shadow-lg sm:absolute sm:inset-0"
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-4 bg-[#1A1A1A] rounded-xl p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[14px] text-gray-400">Total Mints:</span>
                      <span className="text-[14px] font-bold text-[#3AABEE]">6,886</span>
                    </div>
                    <h4 className="text-[14px] font-semibold text-gray-300 mb-2">Mint Progress</h4>
                    <div className="w-full bg-[#2A2A2E] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#3AABEE] to-[#2691D9] h-2 rounded-full"
                        style={{ width: `${(6886 / 10000) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-[14px] text-gray-400 mt-2">6,886 / 10,000 minted</p>
                  </div>
                </div>

                <div className="w-full sm:w-2/3">
                  <h2 className="text-[28px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text mb-3">
                    Mint $WOOF Tokens
                  </h2>
                  <p className="text-[14px] mb-4 text-gray-300">
                    Mint 1000 $WOOF tokens and get a chance to win a random wallet with $86k-$120k worth of tokens!
                  </p>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[14px] text-gray-300">Mint Price:</span>
                      <span className="text-[16px] font-bold text-[#3AABEE]">1000 $WOOF</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-gray-300">Win Chance:</span>
                      <span className="text-[16px] font-bold text-green-500">10%</span>
                    </div>
                  </div>

                  <button
                    onClick={handleMint}
                    className="relative group h-12 w-full rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] hover:from-[#2691D9] hover:to-[#1E88E5] transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                    <span className="text-[16px] font-semibold text-white z-10">Mint $WOOF</span>
                  </button>

                  {mintResult && (
                    <div className={`p-4 rounded-xl mt-4 ${
                      mintResult.includes('Congratulations') 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      <p className="text-[14px] font-semibold">{mintResult}</p>
                    </div>
                  )}

                  <p className="text-[12px] text-gray-400 mt-4">
                    <span className="font-semibold text-gray-300">Warning:</span> By participating, you acknowledge that you're risking your funds. You may win or lose your investment. Proceed at your own risk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invite' && (
            <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 mb-4 border border-[#2A2A2E]">
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-6">
                <div className="mb-4 sm:mb-0 w-full sm:w-1/3">
                  <div className="relative w-[120px] h-[120px] sm:w-full sm:h-auto mx-auto">
                    <div className="sm:pt-[100%]">
                      <Image 
                        src="/invite.gif" 
                        alt="Invite GIF" 
                        width={120}
                        height={120}
                        className="w-full h-full object-cover rounded-xl shadow-lg sm:absolute sm:inset-0"
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-4 bg-[#1A1A1A] rounded-xl p-4">
                    <h4 className="text-[14px] font-semibold text-gray-300 mb-2">Your Referrals</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-gray-400">Total Referrals:</span>
                      <span className="text-[14px] font-bold text-[#3AABEE]">{Math.floor(Math.random() * 10)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[14px] text-gray-400">Earned $WOOF:</span>
                      <span className="text-[14px] font-bold text-green-500">{Math.floor(Math.random() * 5000)}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-2/3">
                  <h2 className="text-[28px] font-bold bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text mb-3">
                    Invite & Earn
                  </h2>
                  <p className="text-[14px] mb-4 text-gray-300">
                    Invite your friends and earn additional $WOOF tokens! For each friend who successfully mints $WOOF tokens, you'll receive a 5% bonus.
                  </p>
                  <div className="bg-[#1A1A1A] rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[14px] text-gray-300">Referral Bonus:</span>
                      <span className="text-[14px] font-bold text-green-500">5% per mint</span>
                    </div>
                    <p className="font-semibold mb-2 text-[14px] text-gray-200">Your Referral Link:</p>
                    <div className="flex">
                      <input
                        type="text"
                        value="https://woodogs.com/airdrop?ref=YOUR_ID"
                        readOnly
                        className="w-full bg-[#141414] text-gray-200 py-2 px-3 rounded-l-xl text-[14px] border border-[#2A2A2E]"
                      />
                      <button className="relative group h-10 px-6 rounded-r-xl overflow-hidden flex items-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] hover:from-[#2691D9] hover:to-[#1E88E5] transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                        <span className="text-[14px] font-semibold text-white z-10">Copy</span>
                      </button>
                    </div>
                  </div>
                  <div className="bg-[#1A1A1A] rounded-xl p-4">
                    <h4 className="text-[14px] font-semibold text-gray-200 mb-3">How it works:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-[14px] text-gray-300">
                        <div className="relative group h-5 w-5 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] mr-2">
                          <span className="text-[12px] font-semibold text-white z-10">1</span>
                        </div>
                        Share your referral link with friends
                      </li>
                      <li className="flex items-center text-[14px] text-gray-300">
                        <div className="relative group h-5 w-5 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] mr-2">
                          <span className="text-[12px] font-semibold text-white z-10">2</span>
                        </div>
                        Friends mint $WOOF tokens using your link
                      </li>
                      <li className="flex items-center text-[14px] text-gray-300">
                        <div className="relative group h-5 w-5 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] mr-2">
                          <span className="text-[12px] font-semibold text-white z-10">3</span>
                        </div>
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
