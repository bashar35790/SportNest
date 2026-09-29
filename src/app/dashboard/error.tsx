"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 p-8 text-center shadow-sm">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Oops!</h1>
        <span className="mx-auto mt-4 block h-1 w-12 rounded-full bg-gradient-to-r from-brand-primari to-transparent" />
        <h2 className="mt-4 font-sans text-xl font-semibold text-slate-900 dark:text-white">
          Dashboard error
        </h2>
        <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
          {error.message || "Something went wrong in the dashboard."}
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-primari px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-600 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
