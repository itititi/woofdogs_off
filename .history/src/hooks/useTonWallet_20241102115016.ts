import { useState, useEffect } from 'react';

export const useTonWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkWalletConnection = () => {
      const walletData = localStorage.getItem('walletConnected');
      const profileData = sessionStorage.getItem('profileData');

      if (walletData === 'true' && profileData) {
        const { address } = JSON.parse(profileData);
        setIsConnected(true);
        setWalletAddress(address);
      } else {
        setIsConnected(false);
        setWalletAddress(null);
      }
    };

    checkWalletConnection();
    window.addEventListener('storage', checkWalletConnection);
    
    // Проверяем каждую секунду
    const interval = setInterval(checkWalletConnection, 1000);

    return () => {
      window.removeEventListener('storage', checkWalletConnection);
      clearInterval(interval);
    };
  }, []);

  return { isConnected, walletAddress };
}; 