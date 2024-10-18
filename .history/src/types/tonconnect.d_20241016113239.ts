declare module '@tonconnect/ui-react' {
  import React from 'react';

  export interface TonConnectUiOptions {
    manifestUrl: string;
    uiPreferences?: {
      theme?: 'SYSTEM' | 'DARK' | 'LIGHT';
      colorsSet?: {
        [key: string]: string;
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    walletsListConfiguration?: any;
  }

  export const TonConnectUIProvider: React.FC<{
    children: React.ReactElement;
    manifestUrl: string;
  }>;

  export const TonConnectButton: React.FC;

  interface Wallet {
    address: string;
    publicKey: string;
    // Добавьте другие свойства, если они есть
  }

  export const useTonConnect: () => {
    wallet: Wallet | null;
    connected: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
  };
}
