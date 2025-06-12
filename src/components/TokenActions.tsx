"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseUnits, formatUnits } from "ethers";

import TokenABI from "@/abis/Token.json";
import { TOKEN_ADDRESS } from "@/constants";
import { useToast } from './Toast';

export function TokenActions() {
  const { address, isConnected } = useAccount();
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [approveSpender, setApproveSpender] = useState("");
  const [approveAmount, setApproveAmount] = useState("");

  const decimals = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: "decimals",
  });

  const allowance = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: "allowance",
    args: isConnected && address && approveSpender ? [address, approveSpender] : undefined,
    enabled: Boolean(isConnected && address && approveSpender),
  });

  const {
    writeContract: transferTokens,
    isPending: isTransferPending,
    isSuccess: isTransferSuccess,
    error: transferError,
  } = useWriteContract();

  const {
    writeContract: approveTokens,
    isPending: isApprovePending,
    isSuccess: isApproveSuccess,
    error: approveError,
  } = useWriteContract();

  const formattedAllowance =
    allowance.data && decimals.data
      ? formatUnits(allowance.data, decimals.data)
      : null;
  const { addToast } = useToast();

  useEffect(() => {
    if (isTransferSuccess) addToast('Transfer successful!', 'success');
    if (transferError) addToast(`Error: ${transferError.message}`, 'error');
  }, [isTransferSuccess, transferError, addToast]);

  useEffect(() => {
    if (isApproveSuccess) addToast('Approval successful!', 'success');
    if (approveError) addToast(`Error: ${approveError.message}`, 'error');
  }, [isApproveSuccess, approveError, addToast]);

  const handleTransfer = () => {
    if (!isConnected || !address || !decimals.data) return;
    try {
      const amount = parseUnits(transferAmount || "0", decimals.data);
      transferTokens({
        address: TOKEN_ADDRESS,
        abi: TokenABI,
        functionName: "transfer",
        args: [transferTo, amount],
      });
    } catch {
      // ignore parse error
    }
  };

  const handleApprove = () => {
    if (!isConnected || !address || !decimals.data) return;
    try {
      const amount = parseUnits(approveAmount || "0", decimals.data);
      approveTokens({
        address: TOKEN_ADDRESS,
        abi: TokenABI,
        functionName: "approve",
        args: [approveSpender, amount],
      });
    } catch {
      // ignore parse error
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Token Actions</h2>
      {!isConnected && (
        <p className="text-sm text-gray-500">Connect your wallet to manage tokens.</p>
      )}
      {isConnected && (
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Transfer Tokens</h3>
            <input
              type="text"
              aria-label="Recipient address"
              placeholder="Recipient address"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <input
              type="text"
              aria-label="Transfer amount"
              placeholder="Amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <button
              type="button"
              onClick={handleTransfer}
              disabled={isTransferPending || !transferTo || !transferAmount}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md shadow hover:opacity-90 disabled:opacity-50 transition"
            >
              {isTransferPending ? 'Transferring...' : 'Transfer'}
            </button>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Approve Spender</h3>
            <input
              type="text"
              aria-label="Spender address"
              placeholder="Spender address"
              value={approveSpender}
              onChange={(e) => setApproveSpender(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <input
              type="text"
              aria-label="Approve amount"
              placeholder="Amount"
              value={approveAmount}
              onChange={(e) => setApproveAmount(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
            <button
              type="button"
              onClick={handleApprove}
              disabled={isApprovePending || !approveSpender || !approveAmount}
              className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md shadow hover:opacity-90 disabled:opacity-50 transition"
            >
              {isApprovePending ? 'Approving...' : 'Approve'}
            </button>
            {formattedAllowance !== null && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current allowance for {approveSpender}: {formattedAllowance}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}