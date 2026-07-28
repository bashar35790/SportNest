"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-white dark:bg-slate-900">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold text-red-500 mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Critical Error
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              {error.message || "A critical error occurred. Please refresh the page."}
            </p>
            <button
              onClick={reset}
              className="px-8 py-3 bg-cyan-500 text-white rounded-2xl font-semibold hover:bg-cyan-600 transition-all duration-300 cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
