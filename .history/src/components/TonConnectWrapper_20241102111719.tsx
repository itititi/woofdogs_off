'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

// Используем абсолютный URL для манифеста
const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-wallet/test/public/tonconnect-manifest.json';

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
            },
            {
              appName: 'OpenMask',
              name: 'OpenMask',
              imageUrl: 'https://wallet.openmask.app/icon.png',
              bridgeUrl: 'https://wallet.openmask.app/ton-connect',
              universalLink: 'https://wallet.openmask.app/ton-connect',
              jsBridgeKey: 'openmask',
              aboutUrl: 'https://www.openmask.app/',
              platforms: ['chrome', 'firefox']
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