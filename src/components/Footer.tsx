export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto py-6 px-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} CryptoGotchi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}