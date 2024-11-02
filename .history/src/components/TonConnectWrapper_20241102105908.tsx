'use client';

import { TonConnectButton } from '@tonconnect/ui-react';
import { StrictMode } from 'react';
import { TonConnectProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

export function TonConnectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <TonConnectProvider 
        manifestUrl={manifestUrl}
        walletsListConfiguration={{
          includeWallets: ['Tonkeeper', 'OpenMask', 'MyTonWallet']
        }}
        buttonsConfiguration={{
          size: 'large',
          theme: 'dark'
        }}
      >
        {children}
      </TonConnectProvider>
    </StrictMode>
  );
}

export { TonConnectButton };