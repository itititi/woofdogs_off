'use client';

import { TonConnectWrapper } from '@/components/TonConnectWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectWrapper>
      {children}
    </TonConnectWrapper>
  );
}