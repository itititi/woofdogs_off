import React from 'react';

const WalletSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-[#141414] rounded-lg overflow-hidden shadow-md border border-[#2A2A2E] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-700 rounded-[22%] mr-4"></div>
          <div className="h-6 bg-gray-700 rounded w-32"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-20"></div>
      </div>
      
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 bg-gray-700 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </div>
      
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6 mb-4"></div>
      
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-700 rounded w-20"></div>
        <div className="flex items-center">
          <div className="h-4 bg-gray-700 rounded w-16 mr-2"></div>
          <div className="h-4 bg-gray-700 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
};

export default WalletSkeleton;
