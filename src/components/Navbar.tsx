"use client";

import { authClient } from "@/lib/auth-client";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Facilities", href: "/all-facility" },
  { name: "My Bookings", href: "/dashboard/my-bookings" },
  { name: "Add Facility", href: "/dashboard/add-facility" },
  { name: "Manage My Facilities", href: "/dashboard/manage-facilities" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  console.log(sessionPending);


  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    router.push("/auth/login")

  }

  return (
    <header className="fixed text-center top-0 z-50 border-b border-white/10 bg-white backdrop-blur-xl w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h2 className="text-3xl letter-spacing-1 font-bold text-brand-primari">
            SportNest
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-brand-secoundry transition-all duration-300 hover:text-brand-primari"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          {session ? (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10">
                <Link href="#" className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden shadow-md border-2 border-brand-primari/20 hover:border-brand-primari transition-all">
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
                </Link>

                <div className="text-left">
                  <p className="text-sm font-semibold text-brand-primari">
                    {user?.name}
                  </p>
                  <p className="text-xs text-brand-primari">{user?.email}</p>
                </div>

                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {/* Dropdown */}
              <div className="invisible absolute right-0 top-16 w-64 translate-y-3 rounded-2xl border border-white/10 bg-[#0b1727] p-3 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="mb-3 border-b border-white/10 pb-3">
                  <p className="font-semibold text-white">Md Bashar</p>
                  <p className="text-sm text-slate-400">bashar@gmail.com</p>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/dashboard/my-bookings"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-cyan-400"
                  >
                    My Bookings
                  </Link>

                  <Link
                    href="/dashboard/add-facility"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-cyan-400"
                  >
                    Add Facility
                  </Link>

                  <Link
                    href="/dashboard/manage-facilities"
                    className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-cyan-400"
                  >
                    Manage My Facilities
                  </Link>

                  <Link href={"#"}>
                    <button className="mt-2 w-full rounded-xl bg-linear-to-r from-brand-primari px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link href={"/auth/login"}>
              <button className="rounded-2xl bg-linear-to-r from-brand-primari to-brand-Cyan600 cursor-pointer px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primari/20 transition hover:scale-[1.03]">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-xl border border-brand-primari p-2 text-brand-primari lg:hidden"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-white/10 bg-[#071120] px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-brand-primari"
              >
                {link.name}
              </Link>
            ))}

            {session ? (
              <button className="mt-3 rounded-xl bg-linear-to-r from-brand-primari to-brand-primari/40 px-4 py-3 font-semibold text-white">
                Login
              </button>

            ) : (
              <button className="mt-3 rounded-xl bg-linear-to-r from-brand-primari px-4 py-3 font-semibold text-white">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
