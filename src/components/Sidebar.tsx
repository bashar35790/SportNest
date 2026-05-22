"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Calendar,
    Home,
    PlusSquare,
    Settings,
} from "lucide-react";

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

    return (
        <aside className="w-[320px] h-fit bg-white border-r border-gray-100 flex flex-col justify-between items-start">

            {/* Top Content */}
            <div>

                {/* Logo */}
                <div className="border-b border-gray-100 px-8 py-10">
                    <Link href="/" className="flex items-center gap-4">
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            <span className="text-slate-900">Sport</span>
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
                                            ? "bg-brand-primari text-brand-secoundry"
                                            : "text-brand-secoundry hover:bg-brand-primari hover:text-brand-secoundry"
                                        }`}
                                >
                                    <Icon
                                        size={28}
                                        className={isActive ? "text-brand-secoundry" : ""}
                                    />

                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="p-6">
                <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                    <h4 className="mt-1 text-md font-semibold text-brand-secoundry">
                        Manage your sports facilities easily
                    </h4>
                    <p className="text-sm font-medium text-slate-500">
                        SportNest Dashboard
                    </p>
                </div>
            </div>
        </aside>
    );
}
