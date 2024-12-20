'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

export function TonConnectWrapper({ children }: { children: React.ReactNode }) {
  return (
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
      >
        {children}
      </TonConnectUIProvider>
  );
}

export { TonConnectButton };