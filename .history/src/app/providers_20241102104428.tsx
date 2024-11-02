'use client';

import { TonConnectProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <TonConnectProvider
        manifestUrl={manifestUrl}
        walletsListSource={{
          includeWallets: ['Tonkeeper', 'OpenMask', 'MyTonWallet']
        }}
      >
        {children}
      </TonConnectProvider>
    </StrictMode>
  );
}