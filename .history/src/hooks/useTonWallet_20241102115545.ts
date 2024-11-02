import { useState, useEffect } from 'react';

interface WalletProfile {
  address: string;
  id: string;
  colors: string[];
}

export const useTonWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Функция для генерации уникальных цветов на основе адреса
  const generateWalletColors = (address: string): string[] => {
    const baseColors = [
      ['#3AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0'], // Синие
      ['#FF3366', '#FF4D7F', '#FF6699', '#FF80B2', '#FF99CC'], // Розовые
      ['#FFD700', '#FFC107', '#FFB300', '#FFA000', '#FF8F00'], // Золотые
      ['#00C853', '#00E676', '#69F0AE', '#B9F6CA', '#E8F5E9'], // Зеленые
      ['#AA00FF', '#D500F9', '#E040FB', '#EA80FC', '#F3E5F5']  // Фиолетовые
    ];

    // Используем адрес для выбора цветовой схемы
    const colorIndex = parseInt(address.slice(-1), 16) % baseColors.length;
    return baseColors[colorIndex];
  };

  useEffect(() => {
    const checkWalletConnection = () => {
      try {
        const walletButton = document.querySelector('.tc-button');
        const walletText = document.querySelector('.tc-button__text');
        
        if (walletButton && walletText) {
          const addressText = walletText.textContent;
          if (addressText && addressText !== 'Connect Wallet') {
            setIsConnected(true);
            setWalletAddress(addressText);
            
            // Генерируем профиль с уникальными цветами
            const walletProfile: WalletProfile = {
              address: addressText,
              id: Math.random().toString(36).substring(7),
              colors: generateWalletColors(addressText)
            };
            
            // Сохраняем в sessionStorage
            sessionStorage.setItem('profileData', JSON.stringify(walletProfile));
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
      const profile = JSON.parse(savedProfile) as WalletProfile;
      setIsConnected(true);
      setWalletAddress(profile.address);
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Возвращаем также цвета для аватарки
  const getWalletColors = (): string[] => {
    if (!walletAddress) return ['#3AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0'];
    return generateWalletColors(walletAddress);
  };

  return { 
    isConnected, 
    walletAddress,
    walletColors: getWalletColors()
  };
}; 