'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141414]/80 backdrop-blur-md border-t border-[#2A2A2E]/50 mt-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/woodogslogo.svg" alt="WooDogs Logo" width={32} height={32} className="mr-2 invert" />
              <span className="font-bold text-[20px] text-white whitespace-nowrap">WooDogs</span>
            </Link>
            <p className="text-[14px] text-gray-400 leading-relaxed">
              The most secure and convenient way to manage your blockchain wallets. Join our ecosystem of over 950 million users.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-[16px] font-semibold text-white mb-4">Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300">
                    TON Wallets
                  </Link>
                </li>
                <li>
                  <span className="text-[14px] text-gray-400 flex items-center">
                    Ethereum Wallets
                    <span className="ml-2 text-[12px] bg-[#2A2A2E]/80 text-white/60 px-2 py-0.5 rounded-full">Soon</span>
                  </span>
                </li>
                <li>
                  <span className="text-[14px] text-gray-400 flex items-center">
                    Solana Wallets
                    <span className="ml-2 text-[12px] bg-[#2A2A2E]/80 text-white/60 px-2 py-0.5 rounded-full">Soon</span>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/airdrop" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300">
                    Airdrop
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/woodogs_support" target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[16px] font-semibold text-white mb-4">Social</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="https://t.me/woodogs" target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.823-4.351c.192-.172-.045-.265-.297-.094l-5.965 3.759-2.573-.802c-.726-.227-.74-.726.153-.975l10.033-3.667c.61-.22 1.15.147.686 1.458z"/>
                    </svg>
                    Telegram Channel
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/woodogs" target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/woodogs" target="_blank" rel="noopener noreferrer" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300 flex items-center">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#2A2A2E]/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-gray-400">
            © {new Date().getFullYear()} WooDogs. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[14px] text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 