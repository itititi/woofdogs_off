import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from 'next/dynamic';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WooDogs",
  description: "WooDogs - TON Wallet Management",
};

const TonConnectWrapper = dynamic(
  () => import('../components/TonConnectWrapper'),
  { ssr: false }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TonConnectWrapper manifestUrl="/tonconnect-manifest.json">
          {children}
        </TonConnectWrapper>
      </body>
    </html>
  );
}
