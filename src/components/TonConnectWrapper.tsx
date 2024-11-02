'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

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
      >
        {children}
      </TonConnectUIProvider>
    </StrictMode>
  );
}

export { TonConnectButton };