import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your SportNest account. Add facilities, view bookings, and track your activity.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pt-20 bg-white dark:bg-slate-900 transition-colors duration-300 md:flex-row">
      <div className="w-full flex-none md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:w-72">
        <Sidebar />
      </div>
      <div className="grow min-w-0 px-4 py-6 md:px-12">{children}</div>
    </div>
  );
}