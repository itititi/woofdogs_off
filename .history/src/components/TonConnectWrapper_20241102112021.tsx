'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

// Используем URL манифеста из демо
const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

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
      >
        {children}
      </TonConnectUIProvider>
    </StrictMode>
  );
}

export { TonConnectButton };