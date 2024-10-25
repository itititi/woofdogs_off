import React from 'react';
import Header from '@/components/Header';

const WalletSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-16 sm:mt-20 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-lg overflow-hidden shadow-2xl p-4 sm:p-6 mb-6 border border-[#2A2A2E] animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-[22%] mr-4"></div>
                <div className="h-8 bg-gray-700 rounded w-32 sm:w-48"></div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="h-6 bg-gray-700 rounded w-20"></div>
                <div className="h-6 bg-gray-700 rounded w-16"></div>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>
            
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6 mb-6"></div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 bg-[#1A1A1A] p-4 rounded-lg">
              <div className="mb-2 sm:mb-0">
                <div className="h-8 bg-gray-700 rounded w-24 sm:w-32"></div>
              </div>
              <div className="flex flex-col items-start sm:items-end">
                <div className="h-4 bg-gray-700 rounded w-32 mb-1"></div>
                <div className="h-6 bg-gray-700 rounded w-20"></div>
              </div>
            </div>

            <div className="mb-6">
              <div className="h-6 bg-gray-700 rounded w-48 mb-3"></div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-[#1A1A1A] rounded-lg p-2 h-10"></div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="h-12 bg-gray-700 rounded-full w-full"></div>
              <div className="h-12 bg-gray-700 rounded-full w-full"></div>
            </div>
          </div>

          <div className="bg-[#141414] rounded-lg overflow-hidden shadow-2xl p-4 sm:p-6 border border-[#2A2A2E] animate-pulse">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-9 h-9 bg-gray-700 rounded-full mr-3 sm:mr-4"></div>
              <div className="h-6 bg-gray-700 rounded w-48"></div>
            </div>
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
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
