import { useState, useEffect } from 'react';

export const useTonWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = () => {
      try {
        // Ищем кнопку TonConnect
        const walletButton = document.querySelector('[data-tc-wallets-modal-button]');
        if (walletButton) {
          const addressText = walletButton.textContent;
          // Проверяем, что текст похож на адрес кошелька (начинается с EQ или UQ)
          if (addressText && (addressText.startsWith('EQ') || addressText.startsWith('UQ'))) {
            setIsConnected(true);
            setWalletAddress(addressText);
            
            // Сохраняем в sessionStorage
            sessionStorage.setItem('profileData', JSON.stringify({
              address: addressText,
              id: Math.random().toString(36).substring(7)
            }));
          } else {
            setIsConnected(false);
            setWalletAddress(null);
            sessionStorage.removeItem('profileData');
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    // Проверяем состояние каждые 100ms
    const interval = setInterval(checkWalletConnection, 100);

    // Добавляем слушатель изменений DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          checkWalletConnection();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-tc-wallets-modal-button']
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return { isConnected, walletAddress };
}; 