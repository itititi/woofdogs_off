'use client';

import Hero from '@/components/Hero';
import WalletShowcase from '@/components/WalletShowcase';
import { SearchProvider } from '@/components/SearchContext';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <SearchProvider>
        <main className="flex-grow">
          {/*<div className="max-w-7xl pt-20">*/}
          {/*  <div className="text-white">*/}
          {/*      <TonConnectButton />*/}
          {/*  </div>*/}
          {/*</div>*/}
          <Hero />
          <WalletShowcase />
        </main>
      </SearchProvider>
    </div>
  );
}
