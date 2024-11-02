'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

// Кастомные стили для дропдауна
const styleConfig: UIStyle = {
  buttonRadius: 8,
  colorText: '#FFFFFF',
  colorBackground: '#141414',
  colorConnectButton: '#3AABEE',
  colorConnectButtonText: '#FFFFFF',
  colorDropdown: '#141414',
  colorDropdownText: '#FFFFFF',
  colorDropdownBackground: '#1A1A1A',
  colorDropdownHover: '#2A2A2E',
  colorDropdownBorder: '#2A2A2E',
  borderRadius: '12px',
  dropdownShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
  font: 'Inter, sans-serif',
  buttonPadding: '10px 16px',
  itemHeight: '48px',
  dropdownPosition: 'right' as const,
};

// Компонент профиля с кнопками копирования адреса и отключения
const ProfileDropdown = ({ address, onCopy, onDisconnect }: { 
  address: string;
  onCopy: () => void;
  onDisconnect: () => void;
}) => (
  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#141414]/95 backdrop-blur-md border border-[#2A2A2E]/50 shadow-lg overflow-hidden">
    <div className="p-4 border-b border-[#2A2A2E]/50">
      <p className="text-sm text-white/70">Connected Wallet</p>
      <p className="text-sm font-medium text-white truncate">{address}</p>
    </div>
    <div className="py-1">
      <button 
        onClick={onCopy}
        className="flex items-center w-full px-4 py-3 text-[14px] text-gray-300 hover:bg-[#2A2A2E]/50 hover:text-white transition-all duration-300"
      >
        <span className="mr-2">📋</span>
        Copy Address
      </button>
      <button
        onClick={onDisconnect}
        className="flex items-center w-full px-4 py-3 text-[14px] text-red-400 hover:bg-[#2A2A2E]/50 hover:text-red-500 transition-all duration-300"
      >
        <span className="mr-2">🔌</span>
        Disconnect
      </button>
    </div>
  </div>
);

export function TonConnectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <TonConnectUIProvider 
        manifestUrl={manifestUrl}
        connectorConfiguration={{
          manifestUrl: manifestUrl,
          buttonRootId: 'ton-connect-button',
          uiPreferences: {
            theme: 'DARK'
          }
        }}
        walletsListConfiguration={{
          includeWallets: [
            {
              appName: 'Tonkeeper',
              name: 'Tonkeeper',
              imageUrl: 'https://tonkeeper.com/assets/tonkeeper-logo.png',
              bridgeUrl: 'https://bridge.tonapi.io/bridge',
              universalLink: 'https://app.tonkeeper.com/ton-connect',
              jsBridgeKey: 'tonkeeper',
              aboutUrl: 'https://tonkeeper.com',
              platforms: ['ios', 'android', 'chrome', 'firefox']
            }
          ]
        }}
        uiConfiguration={{
          style: styleConfig,
          walletsList: {
            buttonText: 'Connect Wallet',
            disconnectButtonText: 'Disconnect',
            connectingWalletText: 'Connecting...',
          },
          notifications: {
            connectionSuccess: 'Successfully connected!',
            connectionError: 'Connection failed',
            disconnectSuccess: 'Disconnected',
          }
        }}
      >
        {children}
      </TonConnectUIProvider>
    </StrictMode>
  );
}

// Экспортируем компоненты
export { TonConnectButton, ProfileDropdown };