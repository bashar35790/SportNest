export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
