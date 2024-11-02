declare module '@tonconnect/ui-react' {
  import { ReactNode } from 'react';

  type Platform = 'ios' | 'android' | 'chrome' | 'firefox';

  interface WalletInfo {
    appName: string;
    name: string;
    imageUrl: string;
    bridgeUrl: string;
    universalLink: string;
    jsBridgeKey: string;
    aboutUrl?: string;
    platforms: Platform[];
  }

  export interface TonConnectUIProviderProps {
    manifestUrl: string;
    children: ReactNode;
    connectorConfiguration?: {
      manifestUrl: string;
      buttonRootId?: string;
      uiPreferences?: {
        theme?: 'DARK' | 'LIGHT';
      };
    };
    walletsListConfiguration?: {
      includeWallets?: WalletInfo[];
    };
  }

  export const TonConnectUIProvider: React.FC<TonConnectUIProviderProps>;
  export const TonConnectButton: React.FC;
} 