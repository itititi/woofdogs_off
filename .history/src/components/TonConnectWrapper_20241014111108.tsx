'use client';

import React from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

interface TonConnectWrapperProps {
  children: React.ReactNode;
  manifestUrl: string;
}

const TonConnectWrapper: React.FC<TonConnectWrapperProps> = ({ children, manifestUrl }) => {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
};

export default TonConnectWrapper;
