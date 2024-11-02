import { useState, useEffect } from 'react';

export const useTonWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = () => {
      try {
        // Ищем кнопку TonConnect по классу
        const walletButton = document.querySelector('.tc-button');
        const walletText = document.querySelector('.tc-button__text');
        
        if (walletButton && walletText) {
          const addressText = walletText.textContent;
          // Проверяем, что текст не является 'Connect Wallet'
          if (addressText && addressText !== 'Connect Wallet') {
            setIsConnected(true);
            setWalletAddress(addressText);
            
            // Сохраняем в sessionStorage
            sessionStorage.setItem('profileData', JSON.stringify({
              address: addressText,
              id: Math.random().toString(36).substring(7)
            }));

            // Также сохраняем в localStorage для сохранения между перезагрузками
            localStorage.setItem('walletConnected', 'true');
          } else {
            setIsConnected(false);
            setWalletAddress(null);
            sessionStorage.removeItem('profileData');
            localStorage.removeItem('walletConnected');
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    // Проверяем состояние при монтировании
    checkWalletConnection();

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
      attributeFilter: ['class']
    });

    // Проверяем сохраненное состояние при загрузке
    const savedProfile = sessionStorage.getItem('profileData');
    if (savedProfile) {
      const { address } = JSON.parse(savedProfile);
      setIsConnected(true);
      setWalletAddress(address);
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return { isConnected, walletAddress };
}; 