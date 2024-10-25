import React from 'react';

const WalletCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#141414] rounded-2xl overflow-hidden shadow-md flex flex-col h-full border border-[#2A2A2E] animate-pulse">
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-[22%] mr-3"></div>
            <div className="h-6 w-24 bg-gray-700 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-12 bg-gray-700 rounded-full"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-3"></div>
        <div className="flex justify-between items-center mt-auto">
          <div>
            <div className="h-5 w-16 bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-12 bg-gray-700 rounded"></div>
          </div>
          <div>
            <div className="h-5 w-16 bg-gray-700 rounded mb-1"></div>
            <div className="h-4 w-12 bg-gray-700 rounded"></div>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="h-4 w-16 bg-gray-700 rounded mr-2"></div>
          <div className="h-4 w-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletCardSkeleton;
