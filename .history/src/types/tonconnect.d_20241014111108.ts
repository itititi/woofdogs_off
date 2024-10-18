declare module '@tonconnect/ui-react' {
  import React from 'react';
  
  export const TonConnectUIProvider: React.FC<{
    children: React.ReactNode;
    manifestUrl: string;
  }>;
  
  export const TonConnectButton: React.FC;

  export const useTonConnect: () => {
    wallet: any | null;
    connected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
  };
}
