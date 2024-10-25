import React from 'react';
import Header from '@/components/Header';

const WalletSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-2xl p-4 mb-4 border border-[#2A2A2E] animate-pulse">
            <div className="flex justify-end mb-2">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-700 rounded-[22%] mr-4"></div>
                <div>
                  <div className="h-8 w-32 bg-gray-700 rounded mb-2"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20 bg-gray-700 rounded mb-6"></div>
            <div className="bg-[#1A1A1A] p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="h-8 w-32 bg-gray-700 rounded mb-1"></div>
                  <div className="h-4 w-24 bg-gray-700 rounded"></div>
                </div>
                <div>
                  <div className="h-6 w-24 bg-gray-700 rounded mb-1"></div>
                  <div className="h-8 w-32 bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="h-6 w-24 bg-gray-700 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                </div>
                <div>
                  <div className="h-6 w-24 bg-gray-700 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="h-6 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="h-10 bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <div className="h-12 bg-gray-700 rounded-full"></div>
              <div className="h-12 bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Card for wallet contents */}
          <div className="bg-[#141414] rounded-lg overflow-hidden shadow-2xl p-4 sm:p-6 border border-[#2A2A2E] animate-pulse">
            <div className="flex items-center mb-4">
              <div className="w-9 h-9 bg-gray-700 rounded-full mr-3"></div>
              <div className="h-6 w-32 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
                  <div className="h-4 w-full bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
            <div className="mt-6 h-20 bg-[#1A1A1A] rounded-lg"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletSkeleton;
