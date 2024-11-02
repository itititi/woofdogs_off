import React from 'react';
import Header from '@/components/Header';

const WalletSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-14 sm:mt-20 lg:mt-24 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 mb-4 border border-[#2A2A2E] animate-pulse">
            {/* Header section */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center flex-1">
                <div className="w-16 h-16 bg-[#2A2A2E] rounded-[22%] mr-4"></div>
                <div className="flex-1">
                  <div className="h-8 w-48 bg-[#2A2A2E] rounded-xl mb-3"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-24 bg-[#2A2A2E] rounded-xl"></div>
                    <div className="h-6 w-20 bg-[#2A2A2E] rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="h-4 bg-[#2A2A2E] rounded-xl w-full mb-2"></div>
            <div className="h-4 bg-[#2A2A2E] rounded-xl w-5/6 mb-6"></div>
            
            {/* Price section */}
            <div className="bg-[#1A1A1A] rounded-xl p-4 mb-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline">
                  <div className="h-7 w-24 bg-[#2A2A2E] rounded-xl"></div>
                  <div className="h-4 w-20 bg-[#2A2A2E] rounded-xl ml-2"></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-8 bg-[#2A2A2E] rounded-xl"></div>
                    <div className="h-4 w-16 bg-[#2A2A2E] rounded-xl"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-8 bg-[#2A2A2E] rounded-xl"></div>
                    <div className="h-4 w-16 bg-[#2A2A2E] rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="h-12 bg-[#2A2A2E] rounded-xl"></div>
              <div className="h-12 bg-[#2A2A2E] rounded-xl"></div>
            </div>

            {/* Tokens section */}
            <div className="mb-4">
              <div className="h-6 w-36 bg-[#2A2A2E] rounded-xl mb-3"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="h-10 bg-[#2A2A2E] rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>

          {/* What's Inside section */}
          <div className="bg-[#141414] rounded-xl overflow-hidden shadow-lg p-4 sm:p-6 border border-[#2A2A2E]">
            <div className="flex items-center mb-4">
              <div className="h-7 w-7 bg-[#2A2A2E] rounded-full mr-3"></div>
              <div className="h-6 w-40 bg-[#2A2A2E] rounded-xl"></div>
            </div>
            <div className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-6 w-6 bg-[#2A2A2E] rounded-full mr-3"></div>
                  <div className="h-4 w-full bg-[#2A2A2E] rounded-xl"></div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-[#1A1A1A] rounded-xl p-4">
              <div className="h-4 bg-[#2A2A2E] rounded-xl w-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletSkeleton;
