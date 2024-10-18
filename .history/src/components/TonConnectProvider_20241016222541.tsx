'use client';

import React, { ReactNode } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

interface TonConnectProviderProps {
  children: ReactNode;
}

const TonConnectProvider: React.FC<TonConnectProviderProps> = ({ children }) => {
  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <React.Fragment>{children}</React.Fragment>
    </TonConnectUIProvider>
  );
};

export default TonConnectProvider;
