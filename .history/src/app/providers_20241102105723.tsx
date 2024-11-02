'use client';

import { TonConnectWrapper } from '@/components/TonConnectWrapper';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectWrapper>
      {children}
    </TonConnectWrapper>
  );
}