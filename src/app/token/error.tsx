'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function TokenError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 text-center">
      <p className="text-red-500">Failed to load token data.</p>
      <p className="text-gray-700 dark:text-gray-300">{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}