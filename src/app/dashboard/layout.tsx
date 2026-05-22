import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-fit flex-col md:flex-row md:overflow-hidden pt-20">
      <div className="w-full flex-none md:w-64">
        <div>
          <Sidebar />
        </div>
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}