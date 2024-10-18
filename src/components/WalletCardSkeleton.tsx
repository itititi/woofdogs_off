import React from 'react';

const WalletCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-lg flex flex-col h-full animate-pulse border border-[#2A2A2E]">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4"></div>
            <div className="h-8 bg-gray-700 rounded w-32"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-6 bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-700 rounded-full w-6"></div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-700 rounded w-24"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
        <div className="flex justify-between items-center mt-auto">
          <div>
            <div className="h-6 bg-gray-700 rounded w-20 mb-1"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-gray-700 rounded w-16 mr-2"></div>
            <div className="h-4 bg-gray-700 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCardSkeleton;
