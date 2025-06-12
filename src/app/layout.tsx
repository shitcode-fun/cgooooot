import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { NavBar } from '../../app/components/ui/21st/TubelightNavbar';
import { Footer } from '../components/Footer';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Home, DollarSign } from 'lucide-react';
import { AuroraBackground } from '../../app/components/ui/21st/AuroraBackground';

export const metadata: Metadata = {
  title: "CryptoGotchi",
  description: "CryptoGotchi - virtual pets powered by Base L2 and Web3",
  keywords: [
    'Crypto',
    'Gotchi',
    'NFT',
    'Base L2',
    'Web3',
    'Virtual Pet',
    'Blockchain',
  ],
  openGraph: {
    title: 'CryptoGotchi',
    description: 'Hatch, nurture, and trade your virtual pet powered by Base L2 blockchain.',
    url: 'https://shitcode.fun',
    siteName: 'CryptoGotchi',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoGotchi',
    description: 'Hatch, nurture, and trade your virtual pet powered by Base L2 blockchain.',
    creator: '@gtopolice',
  },
};

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Token', url: '/token', icon: DollarSign },
  ];

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Providers>
          <div className="relative">
            <NavBar items={navItems} />
            <div className="absolute top-4 right-4">
              <ConnectButton showBalance={false} />
            </div>
          </div>
          <AuroraBackground className="pt-20 flex flex-col min-h-screen">
            {children}
            <Footer />
          </AuroraBackground>
        </Providers>
      </body>
    </html>
  );
}
