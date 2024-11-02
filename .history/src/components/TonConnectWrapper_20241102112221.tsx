'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

// Кастомные стили для дропдауна
const styleConfig = {
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
  dropdownPosition: 'right',
};

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

export { TonConnectButton };