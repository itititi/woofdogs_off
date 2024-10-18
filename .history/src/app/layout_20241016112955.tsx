import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

const TonConnectProvider = dynamic(
  () => import('../components/TonConnectProvider'),
  { ssr: false }
);

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "WooDogs",
  description: "WooDogs - TON Wallet Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TonConnectProvider>
          {children}
        </TonConnectProvider>
      </body>
    </html>
  );
}
