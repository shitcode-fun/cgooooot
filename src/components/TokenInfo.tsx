'use client';

import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'ethers';

import TokenABI from '@/abis/Token.json';
import { TOKEN_ADDRESS } from '@/constants';
import { Skeleton } from './Skeleton';

export function TokenInfo() {
  const { address, isConnected } = useAccount();

  const { data: name, isLoading: isNameLoading, isError: isNameError } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'name',
  });
  const { data: symbol, isLoading: isSymbolLoading, isError: isSymbolError } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'symbol',
  });
  const { data: decimals, isLoading: isDecimalsLoading, isError: isDecimalsError } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'decimals',
  });
  const { data: totalSupplyData, isLoading: isTotalLoading, isError: isTotalError } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'totalSupply',
  });
  const { data: balanceData, isLoading: isBalanceLoading, isError: isBalanceError } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'balanceOf',
    args: isConnected && address ? [address] : undefined,
    enabled: isConnected,
  });

  const formattedTotalSupply =
    totalSupplyData && decimals ? formatUnits(totalSupplyData, decimals) : null;
  const formattedBalance =
    balanceData && decimals ? formatUnits(balanceData, decimals) : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Token Information</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <dt className="text-sm font-medium text-gray-500 uppercase">Name</dt>
          <dd className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
            {isNameLoading ? (
              <Skeleton className="h-5 w-28" />
            ) : isNameError ? (
              <span className="text-red-500">Error loading name</span>
            ) : (
              name
            )}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 uppercase">Symbol</dt>
          <dd className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
            {isSymbolLoading ? (
              <Skeleton className="h-5 w-24" />
            ) : isSymbolError ? (
              <span className="text-red-500">Error loading symbol</span>
            ) : (
              symbol
            )}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 uppercase">Total Supply</dt>
          <dd className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
            {isTotalLoading || isDecimalsLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : isTotalError || isDecimalsError ? (
              <span className="text-red-500">Error loading supply</span>
            ) : (
              formattedTotalSupply
            )}
          </dd>
        </div>
        {isConnected && (
          <div>
            <dt className="text-sm font-medium text-gray-500 uppercase">Your Balance</dt>
            <dd className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-100">
              {isBalanceLoading || isDecimalsLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : isBalanceError || isDecimalsError ? (
                <span className="text-red-500">Error loading balance</span>
              ) : (
                formattedBalance
              )}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}