import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Providers } from './providers';
import Header from "@/components/Header";
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "WooDogs",
  description: "Buy and sell TON wallets",
  metadataBase: new URL('https://woodogs.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Providers>
          <LanguageProvider>
            <div className={'pb-20'}>
              <Header />
            </div>
            {children}
            <Footer />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}
