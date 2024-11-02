'use client';

import { TonConnectButton } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

export function TonConnectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      {children}
    </StrictMode>
  );
}

export { TonConnectButton }; 