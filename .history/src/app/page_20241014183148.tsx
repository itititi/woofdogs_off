import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WalletShowcase from '@/components/WalletShowcase';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-grow">
        <Hero />
        <WalletShowcase />
      </main>
    </div>
  );
}
