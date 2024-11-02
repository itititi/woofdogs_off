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
              name: 'Tonkeeper',
              bridgeUrl: 'https://bridge.tonapi.io/bridge',
              universalLink: 'https://app.tonkeeper.com/ton-connect',
              jsBridgeKey: 'tonkeeper',
              aboutUrl: 'https://tonkeeper.com'
            },
            {
              name: 'OpenMask',
              bridgeUrl: 'https://wallet.openmask.app/ton-connect',
              universalLink: 'https://wallet.openmask.app/ton-connect',
              jsBridgeKey: 'openmask'
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