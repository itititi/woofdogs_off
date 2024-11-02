'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WalletShowcase from '@/components/WalletShowcase';
import { SearchProvider } from '@/components/SearchContext';
import { TonConnectButton } from '@tonconnect/ui-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <SearchProvider>
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
            <div className="text-white">
              <div className="mt-8">
                <TonConnectButton />
              </div>
            </div>
          </div>
          <Hero />
          <WalletShowcase />
        </main>
      </SearchProvider>
    </div>
  );
}
