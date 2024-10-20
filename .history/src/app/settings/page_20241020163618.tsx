'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { X, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
];

const SettingsPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const router = useRouter();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    // Зде��ь можно добавить логику для изменения языка в приложении
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2E] rounded-lg overflow-hidden shadow-2xl p-6 sm:p-8 mb-8 border border-[#3A3A3E] relative">
            <button 
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#2AABEE] to-[#1E88E5] text-transparent bg-clip-text mb-6">
              Settings
            </h1>
            <div>
              <h2 className="text-xl font-semibold mb-4">Language</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      selectedLanguage === language.code
                        ? 'bg-[#2AABEE] text-white'
                        : 'bg-[#2A2A2E] text-gray-300 hover:bg-[#3A3A3E]'
                    }`}
                  >
                    <span>{language.name}</span>
                    {selectedLanguage === language.code && (
                      <Check className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
