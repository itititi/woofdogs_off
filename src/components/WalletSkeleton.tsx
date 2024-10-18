import React from 'react';

const WalletSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-700 rounded-lg mr-6"></div>
            <div className="h-8 bg-gray-700 rounded w-48"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 bg-gray-700 rounded w-24"></div>
            <div className="h-8 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-5 h-5 bg-gray-700 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-700 rounded w-32"></div>
        </div>
        
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6 mb-8"></div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-gray-700 rounded w-32"></div>
          <div className="h-6 bg-gray-700 rounded w-24"></div>
        </div>
        
        <div className="h-12 bg-gray-700 rounded w-full"></div>
      </div>

      <div className="bg-[#1C1C1E] rounded-lg overflow-hidden shadow-xl p-8">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gray-700 rounded-full mr-4"></div>
          <div className="h-6 bg-gray-700 rounded w-48"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default WalletSkeleton;
