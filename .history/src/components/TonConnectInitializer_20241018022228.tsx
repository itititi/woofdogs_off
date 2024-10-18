'use client';

import { useEffect } from 'react';
import { THEME } from '@tonconnect/ui';
import { getTonConnectUI, setTonConnectUIOptions } from '../utils/tonConnectUI';

const TonConnectInitializer: React.FC = () => {
  useEffect(() => {
    const initTonConnect = async () => {
      try {
        const ui = await getTonConnectUI();
        if (ui) {
          await setTonConnectUIOptions({
            buttonRootId: 'ton-connect-button',
            uiPreferences: {
              theme: THEME.DARK,
            }
          });
        }
      } catch (error) {
        console.error('Ошибка при инициализации TonConnect:', error);
      }
    };

    initTonConnect();
  }, []);

  return null;
};

export default TonConnectInitializer;
