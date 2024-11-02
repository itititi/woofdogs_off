import { useState, useEffect } from 'react';

export const useTonWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = () => {
      try {
        // Проверяем наличие элемента с адресом кошелька в DOM
        const walletElement = document.querySelector('.tc-button__text');
        if (walletElement && walletElement.textContent && walletElement.textContent !== 'Connect Wallet') {
          setIsConnected(true);
          setWalletAddress(walletElement.textContent);
          
          // Сохраняем в sessionStorage
          sessionStorage.setItem('profileData', JSON.stringify({
            address: walletElement.textContent,
            id: Math.random().toString(36).substring(7)
          }));
        } else {
          setIsConnected(false);
          setWalletAddress(null);
          sessionStorage.removeItem('profileData');
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    // Проверяем состояние каждые 500ms
    const interval = setInterval(checkWalletConnection, 500);

    // Добавляем слушатель изменений DOM
    const observer = new MutationObserver(checkWalletConnection);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return { isConnected, walletAddress };
}; 