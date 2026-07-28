export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="animate-pulse space-y-6 w-full max-w-sm px-4">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3 mx-auto" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        <div className="h-12 bg-cyan-200 dark:bg-cyan-900 rounded-2xl" />
      </div>
    </div>
  );
}
