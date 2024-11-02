import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Providers } from './providers';

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
      <head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Providers>
          <LanguageProvider>
            {children}
            <Footer />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  )
}
