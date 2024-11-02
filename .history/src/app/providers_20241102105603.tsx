'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <TonConnectUIProvider 
        manifestUrl={manifestUrl}
        actionsConfiguration={{
          twaReturnUrl: 'back'
        }}
      >
        {children}
      </TonConnectUIProvider>
    </StrictMode>
  );
}