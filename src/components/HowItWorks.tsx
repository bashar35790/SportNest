import {
  Search,
  CalendarCheck2,
  Trophy,
  ShieldCheck,
  CreditCard,
  Zap,
  Check,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Find",
    description:
      "Browse hundreds of premium facilities near you by sport, date, or time.",
    features: ["Smart filters by sport & location", "Live availability & slots", "Verified premium venues"],
  },
  {
    step: "02",
    icon: CalendarCheck2,
    title: "Book",
    description:
      "Choose your slot and pay securely with instant confirmation.",
    features: ["One-tap secure checkout", "Instant digital booking pass", "Flexible rescheduling"],
  },
  {
    step: "03",
    icon: Trophy,
    title: "Play",
    description:
      "Show your booking pass at the venue and start playing!",
    features: ["No queues, just show & play", "Track your booking history", "Earn rewards on every play"],
  },
];

const highlights = [
  { icon: Zap, value: "10s", label: "Avg. booking time" },
  { icon: ShieldCheck, value: "100%", label: "Secure payments" },
  { icon: CreditCard, value: "12K+", label: "Athletes onboard" },
];

export default function HowItWorks() {
  const proxyImageUrl = `https://wsrv.nl/?url=${encodeURIComponent("https://i.ibb.co.com/q3J6SWmn/sports-man-football-baseball.jpg")}&w=800&q=80&output=webp`;

  return (
    <section className="relative isolate overflow-hidden w-full bg-[#031B2E] py-20">
      <div className="overlay z-0"></div>
      {/* Background Image */}
      <Image
        src={proxyImageUrl}
        alt="Sports Facility"
        fill
        unoptimized
        sizes="100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110 z-0 opacity-20"
      />

      <div className="max-w-7xl px-4 lg:px-8 mx-auto z-10 relative">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-300 uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              Simple 3-step process
            </span>
          </Reveal>

          <Reveal as="h2" delay={0.15} className="mt-6 text-white text-4xl md:text-6xl font-semibold tracking-tight">
            Get Playing in{" "}
            <span className="text-gradient">Three Easy Steps</span>
          </Reveal>

          <Reveal as="p" delay={0.25} className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            From finding the perfect court to stepping onto the pitch — SportNest
            makes booking effortless, secure, and ready when you are.
          </Reveal>
        </div>

        {/* ── Steps ── */}
        <StaggerGroup
          stagger={0.16}
          y={38}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          {/* Motion dots on the line */}
          <div className="hidden md:block absolute top-[49px] left-[16%] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.step}>
                <div className="group relative flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.4)]">
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                  {/* Icon Circle */}
                  <div className="relative z-10 flex items-center justify-center w-[104px] h-[104px] rounded-full border border-white/10 bg-gradient-to-b from-[#0e2a3f] to-[#071120] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <div className="flex items-center justify-center w-[76px] h-[76px] rounded-full border border-brand-Cyan400/60 bg-brand-primari/20 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_45px_rgba(6,182,212,0.5)]">
                      <Icon className="w-8 h-8 text-cyan-300" strokeWidth={1.75} />
                    </div>
                    {/* Step Number */}
                    <span className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-sky-600 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/40">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-7 text-3xl font-semibold text-white tracking-wide">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-6 w-full space-y-2.5 text-left">
                    {step.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-slate-300"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* ── Highlights Strip ── */}
        <Reveal delay={0.1} y={30} className="mt-16">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 backdrop-blur-md">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 bg-[#071120]/90 px-8 py-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div className="text-left">
                    <p className="font-bebas text-3xl text-white leading-none">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
