'use client';

import React, { ReactElement } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

interface TonConnectWrapperProps {
  children: ReactElement;
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
