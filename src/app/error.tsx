'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex items-center justify-center h-screen bg-white px-4">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-700 mb-6">{error.message}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}