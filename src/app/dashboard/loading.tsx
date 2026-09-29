export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 sm:space-y-6">
      <div className="space-y-3">
        <div className="h-10 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full max-w-2xl rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="space-y-4 sm:space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    </div>
  );
}
