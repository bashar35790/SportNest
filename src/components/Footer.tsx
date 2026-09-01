import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  // Use an external image proxy (weserv.nl) to resize massive 20MB+ images on the fly.
  const proxyImageUrl = `https://wsrv.nl/?url=${encodeURIComponent("https://i.ibb.co.com/xqFQYbSJ/variety-sports-equipment-lush-green-setting.jpg")}&w=800&q=80&output=webp`;

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/5 pt-20 pb-10 text-slate-300">
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#040d1a]/85 via-[#071120]/95 to-[#0a1a33]"></div>
      <div className="overlay z-0"></div>
      {/* Background Image */}
      <Image
        src={proxyImageUrl}
        alt="Sports Facility"
        fill
        unoptimized
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="mx-auto max-w-7xl px-4 lg:px-8 z-10 relative">
        <StaggerGroup
          stagger={0.12}
          y={26}
          className="grid gap-8 lg:grid-cols-4 lg:gap-12"
        >
          {/* Brand & Description */}
          <StaggerItem className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-r from-brand-primari to-brand-Cyan600 text-xl font-bold shadow-lg shadow-cyan-500/20 text-brand-secondary">
                S
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-wide text-white">
                  Sport<span className="text-gradient">Nest</span>
                </h2>
                <p className="text-xs text-white">Facility Booking</p>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-slate-50">
              Your ultimate destination for booking premium sports facilities.
              Experience seamless reservations and elevate your game today.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_4px_15px_-4px_rgba(34,211,238,0.4)]"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_4px_15px_-4px_rgba(34,211,238,0.4)]"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_4px_15px_-4px_rgba(34,211,238,0.4)]"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_4px_15px_-4px_rgba(34,211,238,0.4)]"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
              Quick Links
              <span className="mt-2 block h-px w-8 bg-gradient-to-r from-brand-primari to-transparent"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/facilities"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  All Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Support */}
          <StaggerItem className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
              Support
              <span className="mt-2 block h-px w-8 bg-gradient-to-r from-brand-primari to-transparent"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Contact Info */}
          <StaggerItem className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
              Contact Us
              <span className="mt-2 block h-px w-8 bg-gradient-to-r from-brand-primari to-transparent"></span>
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                </span>
                <span>
                  123 Sports Avenue, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10">
                  <Phone className="h-4 w-4 text-cyan-300" />
                </span>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10">
                  <Mail className="h-4 w-4 text-cyan-300" />
                </span>
                <span>support@sportnest.com</span>
              </li>
            </ul>
          </StaggerItem>
        </StaggerGroup>

        <Reveal delay={0.1} y={20} className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 md:flex-row">
            <p className="text-slate-400">© {new Date().getFullYear()} SportNest. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/terms"
                className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="transition-all duration-300 hover:pl-1 hover:text-cyan-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
