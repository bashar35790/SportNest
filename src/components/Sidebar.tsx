"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Calendar,
    Home,
    PlusSquare,
    Settings,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

const sidebarLinks = [
    {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: Calendar,
    },
    {
        title: "Add Facility",
        href: "/dashboard/add-facility",
        icon: PlusSquare,
    },
    {
        title: "Manage Facilities",
        href: "/dashboard/manage-facilities",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const user = session?.user;
    console.log(user);

    return (
        <aside className="w-[320px] bg-[#fafafa] dark:bg-[#0f172a] border-r border-gray-100 dark:border-white/10 flex flex-col justify-between items-start transition-colors duration-300">

            {/* Top Content */}
            <div>

                {/* Logo */}
                <div className="border-b border-gray-100 px-8 py-10">
                    <Link href="/" className="flex items-center gap-4">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            <span className="text-slate-900 dark:text-white">Sport</span>
                            <span className="text-gradient">Nest</span>
                        </h1>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="px-6 py-8">

                    {/* Back Home */}
                    <Link
                        href="/"
                        className="mb-12 flex items-center gap-4 rounded-2xl px-4 py-4 text-[18px] font-semibold text-brand-secoundry transition-all hover:bg-brand-primari hover:text-brand-secoundry"
                    >
                        <Home size={26} />
                        <span>Back to Home</span>
                    </Link>

                    {/* Section Title */}
                    <p className="mb-6 px-4 text-sm font-extrabold uppercase tracking-[0.35em] text-slate-400">
                        Management
                    </p>

                    {/* Sidebar Links */}
                    <div className="space-y-3">
                        {sidebarLinks.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-4 rounded-3xl px-5 py-4 text-md font-bold transition-all duration-200
                  ${isActive
                                            ? "bg-brand-primari text-brand-secoundry dark:text-slate-900"
                                            : "text-brand-secoundry dark:text-slate-300 hover:bg-brand-primari hover:text-brand-secoundry dark:hover:text-slate-900"
                                        }`}
                                >
                                    <Icon
                                        size={28}
                                        className={isActive ? "text-brand-secoundry dark:text-slate-900" : ""}
                                    />

                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-6 w-full">
                <div className="rounded-3xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden shadow-md border-2 border-brand-primari/20 hover:border-brand-primari transition-all">
                                <Image
                                    src={
                                        user?.image?.startsWith("http")
                                            ? user.image
                                            : "/myphoto.png"
                                    }
                                    alt={user?.name ?? "User profile"}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                            <h4 className="mt-1 text-md font-semibold text-brand-secoundry dark:text-white">
                                {user?.name}
                            </h4>
                        </div>
                        <ThemeToggle />
                    </div>

                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {user?.email}
                    </p>
                </div>
            </div>
        </aside>
    );
}
