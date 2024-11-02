declare module '@tonconnect/ui-react' {
  import { ReactNode } from 'react';

  type Platform = 'ios' | 'android' | 'chrome' | 'firefox';
  type DropdownPosition = 'left' | 'right';

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

  interface UIStyle {
    buttonRadius?: number;
    colorText?: string;
    colorBackground?: string;
    colorConnectButton?: string;
    colorConnectButtonText?: string;
    colorDropdown?: string;
    colorDropdownText?: string;
    colorDropdownBackground?: string;
    colorDropdownHover?: string;
    colorDropdownBorder?: string;
    borderRadius?: string;
    dropdownShadow?: string;
    font?: string;
    buttonPadding?: string;
    itemHeight?: string;
    dropdownPosition?: DropdownPosition;
  }

  interface UIConfiguration {
    style?: UIStyle;
    walletsList?: {
      buttonText?: string;
      disconnectButtonText?: string;
      connectingWalletText?: string;
    };
    notifications?: {
      connectionSuccess?: string;
      connectionError?: string;
      disconnectSuccess?: string;
    };
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
    uiConfiguration?: UIConfiguration;
  }

  export const TonConnectUIProvider: React.FC<TonConnectUIProviderProps>;
  export const TonConnectButton: React.FC;
} 