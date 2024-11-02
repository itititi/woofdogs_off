'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode, useState } from 'react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

// Кастомная кнопка подключения
const CustomTonConnectButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const handleConnect = () => {
    // Здесь будет логика подключения
    setIsConnected(true);
    setAddress('EQD....abc'); // Пример адреса
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setIsDropdownOpen(false);
    setAddress('');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  if (!isConnected) {
    return (
      <button
        onClick={handleConnect}
        className="relative group h-10 px-6 rounded-xl overflow-hidden flex items-center bg-gradient-to-br from-[#3AABEE] to-[#2691D9] hover:from-[#2691D9] hover:to-[#1E88E5] transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
        <span className="text-[14px] font-semibold text-white z-10">Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-[#141414]/80 backdrop-blur-md text-white py-2 px-4 rounded-xl text-[14px] font-medium flex items-center hover:bg-[#2A2A2E] transition-all duration-300 h-10 border border-[#2A2A2E]/50 min-w-[160px] justify-between group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3AABEE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex items-center space-x-2 z-10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#3AABEE] animate-pulse"></div>
            <span className="bg-gradient-to-r from-white/90 to-white/60 text-transparent bg-clip-text font-semibold">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 z-10">
          <div className="w-px h-4 bg-[#2A2A2E]"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/50 group-hover:text-white/70 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#141414]/95 backdrop-blur-md border border-[#2A2A2E]/50 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-[#2A2A2E]/50">
            <p className="text-sm text-white/70">Connected Wallet</p>
            <p className="text-sm font-medium text-white truncate">{address}</p>
          </div>
          <div className="py-1">
            <button 
              onClick={handleCopyAddress}
              className="flex items-center w-full px-4 py-3 text-[14px] text-gray-300 hover:bg-[#2A2A2E]/50 hover:text-white transition-all duration-300"
            >
              <span className="mr-2">📋</span>
              Copy Address
            </button>
            <button
              onClick={handleDisconnect}
              className="flex items-center w-full px-4 py-3 text-[14px] text-red-400 hover:bg-[#2A2A2E]/50 hover:text-red-500 transition-all duration-300"
            >
              <span className="mr-2">🔌</span>
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export function TonConnectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        {children}
      </TonConnectUIProvider>
    </StrictMode>
  );
}

// Экспортируем кастомную кнопку вместо стандартной
export { CustomTonConnectButton as TonConnectButton };