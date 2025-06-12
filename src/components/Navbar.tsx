"use client";

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            CryptoGotchi
          </Link>
          <Link href="/token" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
            Token Info
          </Link>
        </div>
        <ConnectButton showBalance={false} />
      </div>
    </nav>
  );
} 