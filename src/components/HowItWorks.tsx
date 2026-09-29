import {
  Search,
  CalendarCheck2,
  Trophy,
  ShieldCheck,
  CreditCard,
  Zap,
  Check,
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
    features: [
      "Smart filters by sport & location",
      "Live availability & slots",
      "Verified premium venues",
    ],
  },
  {
    step: "02",
    icon: CalendarCheck2,
    title: "Book",
    description: "Choose your slot and pay securely with instant confirmation.",
    features: [
      "One-tap secure checkout",
      "Instant digital booking pass",
      "Flexible rescheduling",
    ],
  },
  {
    step: "03",
    icon: Trophy,
    title: "Play",
    description: "Show your booking pass at the venue and start playing!",
    features: [
      "No queues, just show & play",
      "Track your booking history",
      "Earn rewards on every play",
    ],
  },
];

const highlights = [
  { icon: Zap, value: "10s", label: "Avg. booking time" },
  { icon: ShieldCheck, value: "100%", label: "Secure payments" },
  { icon: CreditCard, value: "12K+", label: "Athletes onboard" },
];

export default function HowItWorks() {
  const proxyImageUrl = `https://wsrv.nl/?url=${encodeURIComponent(
    "https://i.ibb.co.com/q3J6SWmn/sports-man-football-baseball.jpg"
  )}&w=1600&q=80&output=webp`;

  return (
    <section className="relative isolate w-full overflow-hidden border-y border-white/5 bg-[#0a0f1a] py-24 sm:py-28">
      {/* ── Backgrounds (same stack as Hero / Footer) ── */}
      <Image
        src={proxyImageUrl}
        alt=""
        aria-hidden="true"
        fill
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#040d1a]/85 via-[#071120]/95 to-[#0a1a33]" />
      <div className="overlay2 z-[1]" />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-1/2 z-[1] h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 top-0 z-[1] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
        {/* ── Header (matches Hero live-badge + title) ── */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal delay={0.05}>
            <span className="live-badge">
              <span className="pulse-dot" />
              Simple 3-step process
            </span>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.15}
            className="text-5xl leading-[0.95] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl"
          >
            Get Playing in <span className="text-gradient">Three Easy Steps</span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.25}
            className="mx-auto mt-5 max-w-[540px] text-base leading-relaxed text-white/70 sm:text-lg"
          >
            From finding the perfect court to stepping onto the pitch — SportNest
            makes booking effortless, secure, and ready when you are.
          </Reveal>
        </div>

        {/* ── Steps ── */}
        <StaggerGroup
          stagger={0.16}
          y={38}
          className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-[44px] hidden h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent md:block"
          />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.step} className="h-full">
                <div className="group relative flex h-full flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.03] p-8 text-center shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-cyan-400/[0.06] hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.4)]">
                  {/* Top glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(6,182,212,0.15),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Step pill */}
                  <span className="absolute -top-3 z-10 rounded-full border border-cyan-400/20 bg-[#071120]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90 backdrop-blur-md">
                    Step {step.step}
                  </span>

                  {/* Icon — Footer pattern */}
                  <div className="relative z-10 mt-2 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-6 text-4xl leading-none tracking-[0.03em] text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>

                  {/* Divider */}
                  <span className="mt-6 block h-px w-8 bg-gradient-to-r from-brand-primari to-transparent" />

                  {/* Features */}
                  <ul className="mt-5 w-full space-y-2.5 text-left">
                    {step.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-slate-300 transition-colors duration-300 group-hover:text-white"
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

        {/* ── Highlights Strip (matches Hero stats-bar) ── */}
        <Reveal delay={0.1} y={30} className="mt-12">
          <div className="grid grid-cols-1 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-white/5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 px-8 py-6 transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div className="text-left">
                    <p className="text-4xl leading-none tracking-[0.03em] text-white transition-colors duration-300 group-hover:text-cyan-300">
                      {item.value}
                    </p>
                    <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.1em] text-cyan-300/80">
                      {item.label}
                    </p>
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
