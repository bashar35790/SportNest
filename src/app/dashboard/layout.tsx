import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden pt-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="w-full flex-none md:w-64">
        <div>
          <Sidebar />
        </div>
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}