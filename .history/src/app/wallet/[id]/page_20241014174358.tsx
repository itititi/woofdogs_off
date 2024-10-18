import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

interface WalletPageProps {
  params: {
    id: string;
  };
}

const wallets = {
  tonkeeper: {
    name: 'Tonkeeper',
    description: 'Самый популярный кошелек для TON',
    image: '/assets/tonkeeper-logo.png',
    features: [
      'Простой и интуитивно понятный интерфейс',
      'Поддержка NFT и децентрализованных приложений',
      'Встроенный обмен криптовалют',
    ],
  },
  tonhub: {
    name: 'Tonhub',
    description: 'Многофункциональный кошелек для TON',
    image: '/assets/tonhub-logo.png',
    features: [
      'Расширенные функции для опытных пользователей',
      'Интеграция с различными сервисами TON',
      'Поддержка мультиподписей',
    ],
  },
  // Добавьте информацию о других кошельках по необходимости
};

const WalletPage: React.FC<WalletPageProps> = ({ params }) => {
  const wallet = wallets[params.id as keyof typeof wallets];

  if (!wallet) {
    return <div>Кошелек не найден</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image src={wallet.image} alt={wallet.name} width={300} height={300} className="h-48 w-full object-cover md:w-48" />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-white mb-2">{wallet.name}</h1>
              <p className="text-gray-400 text-xl mb-4">{wallet.description}</p>
              <h2 className="text-2xl font-semibold text-white mt-6 mb-4">Особенности:</h2>
              <ul className="list-disc list-inside text-gray-300">
                {wallet.features.map((feature, index) => (
                  <li key={index} className="mb-2">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletPage;
