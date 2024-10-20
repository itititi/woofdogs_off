import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchProvider } from '@/components/SearchContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import BatteryWarning from '@/components/BatteryWarning';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WooDogs",
  description: "Buy and sell TON wallets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <LanguageProvider>
          <SearchProvider>
            {children}
            <BatteryWarning />
          </SearchProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
