'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import { getWalletData } from '@/data/getWalletData';

const steps = ['Initializing', 'Processing', 'Confirming', 'Completing'];

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      const data = await getWalletData(params.id);
      setWallet(data);
    };
    fetchWalletData();

    const timer = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < steps.length - 1) {
          return prevStep + 1;
        } else {
          clearInterval(timer);
          setIsComplete(true);
          return prevStep;
        }
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [params.id]);

  useEffect(() => {
    if (isComplete) {
      const redirectTimer = setTimeout(() => {
        router.push('/profile');
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isComplete, router]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow py-4 px-4 mt-16 sm:mt-20 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#141414] rounded-lg overflow-hidden shadow-2xl p-4 sm:p-6 mb-6 border border-[#2A2A2E]">
            {!isComplete ? (
              <>
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center titanium-gradient">Processing Payment</h1>
                <div className="mb-8">
                  {steps.map((step, index) => (
                    <div key={step} className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        index <= currentStep ? 'bg-[#3AABEE]' : 'bg-[#2A2A2E]'
                      }`}>
                        {index < currentStep ? (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-white text-lg">{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-base sm:text-lg ${index <= currentStep ? 'text-white font-semibold' : 'text-gray-400'}`}>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <div className="w-20 h-20 border-t-4 border-[#3AABEE] border-solid rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <Image src="/success.gif" alt="Success" width={200} height={200} className="mx-auto" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 titanium-gradient">Payment Successful!</h1>
                <p className="mb-6 text-gray-300 text-base sm:text-lg">
                  Your purchase of {wallet?.name} for ${wallet?.priceUSD} is complete.
                </p>
                <p className="text-sm text-gray-400">Redirecting to your profile...</p>
              </div>
            )}
          </div>
          
          {wallet && (
            <div className="bg-[#141414] rounded-lg overflow-hidden shadow-2xl p-4 sm:p-6 border border-[#2A2A2E]">
              <h2 className="text-xl sm:text-2xl font-bold titanium-gradient mb-4">Purchase Details</h2>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-[22%] overflow-hidden mr-4">
                  <Image src={wallet.icon} alt={wallet.name} width={64} height={64} className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">{wallet.name}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{wallet.priceRange}</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4">{wallet.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-bold titanium-gradient">Total Paid:</span>
                <span className="text-lg sm:text-xl font-bold">${wallet.priceUSD}</span>
              </div>
            </div>
          )}
        </div>
      </main>
      <style jsx global>{`
        .titanium-gradient {
          background: linear-gradient(45deg, #E8E8E8, #D3D3D3, #BEBEBE, #A9A9A9);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: titanium 10s ease infinite;
        }

        @keyframes titanium {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
