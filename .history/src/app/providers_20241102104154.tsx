'use client';

import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import { StrictMode } from 'react';

// Используем тот же манифест, что и в примере Vite
const manifestUrl = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

// Создаем конфигурацию для TonConnect
const tonConnectOptions = {
  manifestUrl,
  buttonRootId: 'ton-connect-button',
  uiPreferences: {
    theme: 'DARK'
  },
  walletsList: {
    includeList: ['Tonkeeper', 'OpenMask', 'MyTonWallet']
  }
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <TonConnectUIProvider {...tonConnectOptions}>
        {children}
      </TonConnectUIProvider>
    </StrictMode>
  );
}

// Экспортируем TonConnectButton для использования в других компонентах
export { TonConnectButton };