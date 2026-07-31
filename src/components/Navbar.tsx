"use client";

import { authClient } from "@/lib/auth-client";
import { Menu, X, ChevronDown, LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session, isPending: sessionPending } =
    authClient.useSession();

  const user = session?.user;

  // Public nav links
  const publicNavLinks = [
    { name: "Home", href: "/" },
    { name: "All Facilities", href: "/all-facility" },
  ];

  // Private nav links
  const privateNavLinks = [
    { name: "My Bookings", href: "/dashboard/my-bookings" },
    { name: "Add Facility", href: "/dashboard/add-facility" },
    {
      name: "Manage My Facilities",
      href: "/dashboard/manage-facilities",
    },
  ];

  // Final nav links based on auth state
  const navLinks = sessionPending
    ? publicNavLinks
    : session
      ? [...publicNavLinks, ...privateNavLinks]
      : publicNavLinks;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Pages with white background
  const whiteBgPages = [
    "/all-facility",
    "/dashboard/my-bookings",
    "/dashboard/add-facility",
    "/dashboard/manage-facilities",
    "/auth/login",
    "/auth/signup",
  ];

  const isWhiteBgPage = whiteBgPages.some((p) =>
    pathname.startsWith(p)
  );

  const isLight = scrolled || isWhiteBgPage;

  const handleLogout = async () => {
    await authClient.signOut();

    router.refresh();
    router.push("/auth/login");
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full text-center transition-all duration-300 ${isLight
        ? "bg-white shadow-sm dark:bg-slate-900"
        : "bg-transparent dark:bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h2
            className={`text-3xl font-bold tracking-tight transition-all duration-300 ${isLight
              ? "text-brand-secondary dark:text-white"
              : "text-white"
              }`}
          >
            Sport<span className="text-gradient">Nest</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`rounded-xl px-4 py-2 text-md font-medium transition-all duration-300 hover:opacity-80 ${pathname === link.href
                ? "font-bold text-brand-primari"
                : isLight
                  ? "text-brand-secondary dark:text-slate-300"
                  : "text-slate-300"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />

          {session ? (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-white/10">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-brand-primari/20 shadow-md transition-all hover:border-brand-primari md:h-12 md:w-12">
                  <Image
                    src={
                      user?.image?.startsWith("http")
                        ? user.image
                        : "/myphoto.png"
                    }
                    alt={user?.name ?? "User profile"}
                    fill
                    priority
                    className="object-cover"
                    sizes="48px"
                  />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold uppercase text-brand-primari">
                    {user?.name}
                  </p>

                  <p className="text-xs text-brand-primari">
                    {user?.email}
                  </p>
                </div>

                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {/* Dropdown */}
              <div className="invisible absolute right-0 top-16 w-64 translate-y-3 rounded-2xl border border-white/10 bg-brand-secondary p-3 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="mb-3 border-b border-white/10 pb-3">
                  <p className="font-semibold uppercase text-white">
                    {user?.name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {user?.email}
                  </p>
                </div>

                <div className="space-y-1 text-left">
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

                  <button
                    className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-primari px-4 py-2 text-sm font-semibold text-brand-secondary transition"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth/login">
              <button
                className={`cursor-pointer rounded-2xl px-6 py-3 text-sm font-semibold shadow-lg shadow-brand-primari/20 transition hover:scale-[1.03] ${scrolled
                  ? "bg-brand-primari text-brand-secondary"
                  : "bg-brand-primari text-brand-secondary"
                  }`}
              >
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className={`rounded-xl border border-brand-primari p-2 transition-all duration-300 ${isLight
              ? "text-brand-secondary dark:text-white"
              : "text-brand-primari"
              }`}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-white/10 bg-[#071120] px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/10 hover:text-brand-primari ${pathname === link.href
                  ? "bg-white/5 text-brand-primari"
                  : "text-slate-300"
                  }`}
                onClick={() => setMobileMenu(false)}
              >
                {link.name}
              </Link>
            ))}

            {!session ? (
              <Link href="/auth/login">
                <button className="mt-3 cursor-pointer rounded-xl bg-brand-primari px-4 py-3 font-semibold text-brand-secondary">
                  Login
                </button>
              </Link>
            ) : (
              <button
                className="mt-3 cursor-pointer rounded-xl bg-brand-primari px-4 py-3 font-semibold text-brand-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
