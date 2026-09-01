"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Activity,
    ArrowUpRight,
    CalendarDays,
    ChevronRight,
    Home,
    LogOut,
    PlusCircle,
    Settings2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useSyncExternalStore } from "react";

const sidebarLinks = [
    {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: CalendarDays,
    },
    {
        title: "Add Facility",
        href: "/dashboard/add-facility",
        icon: PlusCircle,
    },
    {
        title: "Manage Facilities",
        href: "/dashboard/manage-facilities",
        icon: Settings2,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    const handleLogout = async () => {
        await authClient.signOut();
        router.refresh();
        router.push("/auth/login");
    };

    return (
        <aside className="flex h-full w-full flex-col justify-between border-r border-slate-200/70 bg-slate-50/80 dark:border-white/10 dark:bg-slate-950 transition-colors duration-300">

            {/* Top Content */}
            <div className="px-5 pt-6">

                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-Cyan400 to-brand-primari shadow-lg shadow-brand-primari/30 transition-transform duration-300 group-hover:scale-105">
                        <Activity className="h-6 w-6 text-white" strokeWidth={2.4} />
                    </div>
                    <div className="leading-none">
                        <h1 className="text-3xl font-normal tracking-tight text-slate-900 dark:text-white">
                            Sport<span className="text-gradient">Nest</span>
                        </h1>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                            Owner Panel
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="mt-9">
                    <p className="mb-3 flex items-center gap-2 px-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-primari" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
                            Management
                        </span>
                    </p>

                    <div className="space-y-1.5">
                        {sidebarLinks.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`group relative flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                        isActive
                                            ? "bg-gradient-to-r from-brand-Cyan400 to-brand-primari text-white shadow-lg shadow-brand-primari/30"
                                            : "text-slate-600 hover:bg-brand-primari/10 hover:text-brand-primari dark:text-slate-300 dark:hover:bg-brand-primari/10 dark:hover:text-brand-primari"
                                    }`}
                                >
                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                                            isActive
                                                ? "bg-white/20 text-white"
                                                : "bg-white text-slate-500 shadow-sm ring-1 ring-slate-200/70 group-hover:text-brand-primari dark:bg-white/5 dark:ring-white/10 dark:text-slate-400 dark:group-hover:text-brand-primari"
                                        }`}
                                    >
                                        <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                                    </span>

                                    <span className="flex-1 truncate text-left">{item.title}</span>

                                    {isActive && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                                            <ChevronRight className="h-3.5 w-3.5 text-white" />
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="px-5 py-5">
                <Link
                    href="/"
                    className="group mb-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition-colors hover:text-brand-primari dark:text-slate-400 dark:hover:text-brand-primari"
                >
                    <Home className="h-[18px] w-[18px]" />
                    <span>Back to Home</span>
                    <ArrowUpRight className="ml-auto h-4 w-4 -translate-x-1 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-600" />
                </Link>

                <div className="my-3 h-px bg-slate-200/70 dark:bg-white/10" />

                {/* User Card */}
                <div className="rounded-2xl border border-slate-200/70 bg-white p-3.5 shadow-sm dark:border-white/10 dark:bg-white/5">
                    {!mounted ? (
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/10" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/10" />
                                <div className="h-2.5 w-32 animate-pulse rounded-full bg-slate-200/60 dark:bg-white/5" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-brand-primari/40 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950">
                                    <Image
                                        src={
                                            user?.image?.startsWith("http")
                                                ? user.image
                                                : "/myphoto.png"
                                        }
                                        alt={user?.name ?? "User profile"}
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400 dark:border-slate-950" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                    {user?.name ?? "Guest"}
                                </p>
                                <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                                    {user?.email ?? "Not signed in"}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mt-3 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-500 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                        >
                            <LogOut className="h-3.5 w-3.5" />
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
