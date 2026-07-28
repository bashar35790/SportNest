export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="animate-pulse">
        <div className="h-[600px] bg-slate-200 dark:bg-slate-800" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
