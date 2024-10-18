'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
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
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    return colors[(index + offset) % 3];
  };

  const repeatedSlogans = [...slogans, ...slogans]; // Повторяем слоганы для непрерывной анимации

  return (
    <div className="overflow-hidden py-6">
      <div className="whitespace-nowrap inline-block animate-marquee">
        {repeatedSlogans.map((slogan, sloganIndex) => (
          <span key={sloganIndex} className="inline-block mx-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
            {slogan.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className="inline-block rainbow-text"
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
        .rainbow-text {
          color: var(--color);
          text-shadow: 3px 3px 0px #000000, -3px -3px 0px #000000, 3px -3px 0px #000000, -3px 3px 0px #000000, 0 0 15px var(--color);
          transform: skew(-15deg);
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
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-4 mt-8 xl:py-8 xl:mt-16">
        <RainbowText />
        
        <div className="mb-8">
          <div className="flex justify-center border-b border-gray-700">
            <button
              className={`py-2 px-4 ${activeTab === 'mint' ? 'border-b-2 border-[#2AABEE]' : ''}`}
              onClick={() => setActiveTab('mint')}
            >
              Mint $WOOF
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'invite' ? 'border-b-2 border-[#2AABEE]' : ''}`}
              onClick={() => setActiveTab('invite')}
            >
              Invite & Earn
            </button>
          </div>
        </div>

        {activeTab === 'mint' && (
          <section className="mb-12 text-center">
            <div className="max-w-4xl mx-auto bg-[#1C1C1E] shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-[#2A2A2E] xl:max-w-5xl">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">Mint $WOOF Tokens</h2>
                <div className="mb-6">
                  <Image 
                    src="/dogs.gif" 
                    alt="Dogs GIF" 
                    width={150} 
                    height={150} 
                    className="mx-auto rounded-lg"
                    priority
                  />
                </div>
                <p className="text-xl mb-8 text-gray-300">
                  Mint 1000 $WOOF tokens and get a chance to win a random wallet with $86k-$120k worth of tokens!
                </p>
                <button
                  onClick={handleMint}
                  className="bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white py-3 px-12 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:brightness-110 hover:scale-105"
                >
                  Mint $WOOF
                </button>
                {mintResult && (
                  <p className="mt-6 text-xl font-semibold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">{mintResult}</p>
                )}
                <p className="mt-8 text-sm text-gray-400 max-w-2xl mx-auto">
                  <span className="font-semibold text-[#2AABEE]">Warning:</span> By participating, you acknowledge that you&apos;re risking your funds. You may win or lose your investment. Proceed at your own risk.
                </p>
              </div>
              <div className="bg-[#2A2A2E] p-6">
                <h3 className="text-xl font-semibold mb-4 text-[#2AABEE]">Why Mint $WOOF?</h3>
                <ul className="text-left list-disc list-inside space-y-2 text-gray-300">
                  <li>Chance to win up to $120k worth of tokens</li>
                  <li>Join a thriving community of WOOF holders</li>
                  <li>Participate in exclusive WOOF events and airdrops</li>
                  <li>Be part of the future of decentralized finance</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'invite' && (
          <section className="mb-12 text-center">
            <div className="max-w-4xl mx-auto bg-[#1C1C1E] shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-[#2A2A2E] xl:max-w-5xl">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text">Invite & Earn</h2>
                <div className="mb-6">
                  <Image 
                    src="/invite.gif" 
                    alt="Invite GIF" 
                    width={150} 
                    height={150} 
                    className="mx-auto rounded-lg"
                    priority
                  />
                </div>
                <p className="text-xl mb-8 text-gray-300">
                  Invite your friends and earn additional $WOOF tokens! For each friend who successfully mints $WOOF tokens, you&apos;ll receive a 5% bonus.
                </p>
                <div className="bg-[#2A2A2E] p-4 mb-6 text-left rounded-lg">
                  <p className="font-semibold mb-2 text-[#2AABEE]">Your Referral Link:</p>
                  <input
                    type="text"
                    value="https://woodogs.com/airdrop?ref=YOUR_ID"
                    readOnly
                    className="w-full bg-[#1C1C1E] text-white py-2 px-3 rounded border border-[#3A3A3E]"
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white py-3 px-12 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:brightness-110 hover:scale-105"
                >
                  Copy Link
                </button>
                <p className="mt-8 text-sm text-gray-400 max-w-2xl mx-auto">
                  Share your referral link with friends to start earning bonuses!
                </p>
              </div>
              <div className="bg-[#2A2A2E] p-6">
                <h3 className="text-xl font-semibold mb-4 text-[#2AABEE]">Your Referral Stats</h3>
                <ul className="text-left list-disc list-inside space-y-2 text-gray-300">
                  <li>Invited Friends: 0</li>
                  <li>Total Bonus Earned: 0 $WOOF</li>
                  <li>Potential Earnings: Unlimited!</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AirdropPage;
