
import type { Metadata } from 'next';
import Link from 'next/link';
import { AuroraBackground } from '../../app/components/ui/21st/AuroraBackground';
import { SplineScene } from '../../app/components/ui/21st/SplineScene';

export const metadata: Metadata = {
  title: 'Home - CryptoGotchi',
  description: 'Hatch, nurture, and trade your CryptoGotchi virtual pets on Base L2 blockchain.',
};

export default function Home() {
  return (
    <AuroraBackground>
      <main className="container mx-auto text-center px-6 py-12 space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Welcome to CryptoGotchi
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Hatch, nurture, and trade your virtual pet on Base L2 blockchain.
        </p>
        <Link
          href="/token"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:opacity-90 transition-opacity"
        >
          View Token Info
        </Link>
      </main>
      <div className="w-full h-[500px]">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </AuroraBackground>
  );
}
