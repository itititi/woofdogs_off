declare module '@tonconnect/ui-react' {
  import { ReactNode } from 'react';

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
  }

  export const TonConnectUIProvider: React.FC<TonConnectUIProviderProps>;
  export const TonConnectButton: React.FC;
} 