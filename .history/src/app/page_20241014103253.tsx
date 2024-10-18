import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Здесь будет основное содержимое страницы */}
      </main>
    </div>
  );
}
