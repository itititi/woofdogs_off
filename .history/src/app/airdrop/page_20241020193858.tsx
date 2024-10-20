'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Image from 'next/image';
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
    const colors = ['#D3D3D3', '#A9A9A9', '#808080']; // Светло-серый, темно-серый, серый
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
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="container mx-auto px-4 py-4 mt-8 xl:py-8 xl:mt-16">
        <RainbowText />
        
        <div className="mb-8">
          <div className="flex justify-center border-b border-gray-700">
            <button
              className={`py-2 px-4 ${activeTab === 'mint' ? 'border-b-2 border-gray-400' : ''}`}
              onClick={() => setActiveTab('mint')}
            >
              Mint $WOOF
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'invite' ? 'border-b-2 border-gray-400' : ''}`}
              onClick={() => setActiveTab('invite')}
            >
              Invite & Earn
            </button>
          </div>
        </div>

        {activeTab === 'mint' && (
          <section className="mb-12 text-center">
            <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-600 xl:max-w-5xl">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-400 text-transparent bg-clip-text">Mint $WOOF Tokens</h2>
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
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-12 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-700 hover:scale-105"
                >
                  Mint $WOOF
                </button>
                {mintResult && (
                  <p className="mt-6 text-xl font-semibold bg-gradient-to-r from-gray-200 to-gray-400 text-transparent bg-clip-text">{mintResult}</p>
                )}
                <p className="mt-8 text-sm text-gray-400 max-w-2xl mx-auto">
                  <span className="font-semibold text-gray-300">Warning:</span> By participating, you acknowledge that you&apos;re risking your funds. You may win or lose your investment. Proceed at your own risk.
                </p>
              </div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-200">Why Mint $WOOF?</h3>
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
            <div className="max-w-4xl mx-auto bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-600 xl:max-w-5xl">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-400 text-transparent bg-clip-text">Invite & Earn</h2>
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
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-4 mb-6 text-left rounded-lg">
                  <p className="font-semibold mb-2 text-gray-200">Your Referral Link:</p>
                  <input
                    type="text"
                    value="https://woodogs.com/airdrop?ref=YOUR_ID"
                    readOnly
                    className="w-full bg-gray-700 text-gray-200 py-2 px-3 rounded border border-gray-600"
                  />
                </div>
                <button
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-12 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 hover:from-gray-600 hover:to-gray-700 hover:scale-105"
                >
                  Copy Link
                </button>
                <p className="mt-8 text-sm text-gray-400 max-w-2xl mx-auto">
                  Share your referral link with friends to start earning bonuses!
                </p>
              </div>
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-200">Your Referral Stats</h3>
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

const AirdropPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки данных для аирдропа
    console.log('Submitted:', { email, walletAddress });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-6 px-4 mt-16 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 mb-6 border border-[#3A3A3E]">
            <div className="flex items-center mb-6">
              <Image
                src="/airdrop-icon.png"
                alt="Airdrop"
                width={48}
                height={48}
                className="mr-4"
              />
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2AABEE]">WooDogs Airdrop</h1>
            </div>
            
            <p className="text-gray-300 mb-6">
              Join our exclusive airdrop and get a chance to receive free TON tokens! Fill out the form below to participate.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#2A2A2E] text-white border border-[#3A3A3E] focus:outline-none focus:ring-2 focus:ring-[#2AABEE]"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="wallet" className="block text-sm font-medium text-gray-300 mb-1">
                  TON Wallet Address
                </label>
                <input
                  type="text"
                  id="wallet"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-md bg-[#2A2A2E] text-white border border-[#3A3A3E] focus:outline-none focus:ring-2 focus:ring-[#2AABEE]"
                  placeholder="Enter your TON wallet address"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2AABEE] to-[#229ED9] text-white text-lg font-bold py-3 px-6 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Participate in Airdrop
              </button>
            </form>
          </div>

          <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 border border-[#3A3A3E]">
            <h2 className="text-xl font-bold text-[#2AABEE] mb-4">How it works</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Fill out the form with your email and TON wallet address</li>
              <li>We'll verify your information and eligibility</li>
              <li>If selected, you'll receive TON tokens in your wallet</li>
              <li>Stay tuned for announcements and future airdrops</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AirdropPage;
