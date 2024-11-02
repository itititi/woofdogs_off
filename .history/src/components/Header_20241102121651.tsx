'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { TonConnectButton } from '@tonconnect/ui-react';
import Avatar from 'boring-avatars';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Функция для проверки состояния кошелька
    const checkWallet = () => {
      const buttonText = document.querySelector('.tc-button__text');
      if (buttonText && buttonText.textContent && buttonText.textContent !== 'Connect Wallet') {
        setWalletAddress(buttonText.textContent);
      } else {
        setWalletAddress(null);
      }
    };

    // Проверяем каждые 100ms
    const interval = setInterval(checkWallet, 100);

    // Наблюдаем за изменениями в DOM
    const observer = new MutationObserver(checkWallet);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Функция для генерации цветов на основе адреса
  const getAvatarColors = (address: string) => {
    const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ['#3AABEE', '#229ED9', '#1E88E5', '#1976D2', '#1565C0'];
  };

  return (
    <header className="bg-black/80 backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={32} height={32} className="mr-2 invert" />
            <span className="font-bold text-[20px] whitespace-nowrap">WooDogs</span>
          </Link>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {walletAddress && (
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <Avatar
                    size={28}
                    name={walletAddress}
                    variant="beam"
                    colors={getAvatarColors(walletAddress)}
                  />
                </div>
              )}
              <TonConnectButton />
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;