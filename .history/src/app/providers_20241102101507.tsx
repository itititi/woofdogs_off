'use client';

import { TonConnect } from '@tonconnect/ui-react';

const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-wallet/test/public/tonconnect-manifest.json';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TonConnect manifestUrl={manifestUrl}>
      {children}
    </TonConnect>
  );
}