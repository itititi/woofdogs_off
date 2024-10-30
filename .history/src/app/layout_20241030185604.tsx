import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SearchProvider } from '@/components/SearchContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ["latin"] });

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/dogs.gif" as="image" />
        <link rel="preload" href="/invite.gif" as="image" />
        <link rel="preload" href="/flag.gif" as="image" />
        <link rel="preload" href="/history.gif" as="image" />
        <link rel="preload" href="/inside.gif" as="image" />
        <link rel="preload" href="/notfound.gif" as="image" />
        <link rel="preload" href="/dogs.webp" as="image" />
        <link rel="preload" href="/invite.webp" as="image" />
        <link rel="preload" href="/success.gif" as="image" />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen overflow-x-hidden`}>
        <LanguageProvider>
          <SearchProvider>
            <div className="bg-black min-h-screen flex flex-col">
              {children}
            </div>
          </SearchProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
