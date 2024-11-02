'use client';

import { TonConnectProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-wallet/test/public/tonconnect-manifest.json';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectProvider>
  );
}