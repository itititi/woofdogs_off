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
          },
          walletsList: ['Tonkeeper', 'OpenMask', 'MyTonWallet'],
          actionsConfiguration: {
            twaReturnUrl: 'back',
            returnStrategy: 'back'
          }
        }}
        walletsListConfiguration={{
          includeWallets: ['Tonkeeper', 'OpenMask', 'MyTonWallet']
        }}
      >
        {children}
      </TonConnectUIProvider>
    </StrictMode>
  );
}

export { TonConnectButton };