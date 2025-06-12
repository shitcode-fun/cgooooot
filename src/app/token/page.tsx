import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// Dynamic imports for client components with loading skeletons and code splitting
const TokenInfo = dynamic(() => import('@/components/TokenInfo'), {
  ssr: false,
  loading: () => <TokenInfoSkeleton />,
});
const TokenActions = dynamic(() => import('@/components/TokenActions'), {
  ssr: false,
  loading: () => <TokenActionsSkeleton />,
});

export const metadata: Metadata = {
  title: 'Token Info - CryptoGotchi',
  description:
    'View and manage your CryptoGotchi ERC20 token information, check your balance, transfer tokens, and approve spenders on Base L2.',
};

export default function TokenPage() {
  return (
    <main className="container mx-auto py-12 px-6 space-y-10">
      <TokenInfo />
      <TokenActions />
    </main>
  );
}

// Skeleton loaders for token page components
function TokenInfoSkeleton() {
  return (
    <div className="space-y-4 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg animate-pulse">
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
    </div>
  );
}

function TokenActionsSkeleton() {
  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg animate-pulse">
      <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
    </div>
  );
}