'use client';

import React, { HTMLAttributes } from 'react';

export function Skeleton({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}