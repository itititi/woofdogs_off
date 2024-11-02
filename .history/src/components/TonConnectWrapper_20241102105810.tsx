'use client';

import { TonConnectButton, TonConnect } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

export function TonConnectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <TonConnect 
        manifestUrl={manifestUrl}
        buttonsConfig={{
          size: 'large',
          theme: 'dark'
        }}
        actionsConfiguration={{
          twaReturnUrl: 'back'
        }}
      >
        {children}
      </TonConnect>
    </StrictMode>
  );
}

export { TonConnectButton }; 