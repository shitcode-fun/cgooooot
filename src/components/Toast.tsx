'use client';

import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

type ToastType = 'success' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: PropsWithChildren<{}>) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000)
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            role="status"
            className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4"
          >
            <span className={`text-lg ${type === 'success' ? 'text-green-500' : 'text-red-500'}`}> 
              {type === 'success' ? '✓' : '❗'}
            </span>
            <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {message}
            </p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}