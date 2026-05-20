"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "240+", label: "Facilities" },
  { value: "12K", label: "Bookings" },
  { value: "4.9★", label: "Rating" },
  { value: "8", label: "Sports" },
];

const SPORTS = [
  { icon: "⚽", label: "Football" },
  { icon: "🏸", label: "Badminton" },
  { icon: "🏊", label: "Swimming" },
  { icon: "🎾", label: "Tennis" },
  { icon: "+", label: "More" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Subtle parallax on scroll */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const glowOrb = section.querySelector<HTMLElement>(".glow-orb");
      if (glowOrb) glowOrb.style.transform = `translateY(${scrollY * 0.12}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="hero-section"
        aria-label="Book your sports facility"
      >
        {/* ── Backgrounds ── */}
        <div className="hero-bg" aria-hidden="true" />
        <div className="grid-lines" aria-hidden="true" />
        <div className="glow-orb" aria-hidden="true" />
        <div className="turf-arc" aria-hidden="true" />
        <div className="turf-arc-inner" aria-hidden="true" />

        {/* ── Content ── */}
        <div className="hero-content">
          {/* Live badge */}
          <div className="live-badge" role="status" aria-live="polite">
            <span className="pulse-dot" />
            Facilities available now
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Book Your
            <br />
            <span className="accent">Sports Facility</span>
            <br />
            Instantly
          </h1>

          {/* Subheading */}
          <p className="hero-sub">
            Experience athletic precision with the world&apos;s most advanced
            facility management platform. Reserve courts, fields, and tracks in
            seconds.
            <em>all in one place.</em>
          </p>

          {/* CTAs */}
          <div className="cta-group">
            <button className="btn-primary" type="button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Explore Facilities
            </button>
            <button className="btn-secondary" type="button">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              How it works
            </button>
          </div>

          {/* Stats bar */}
          <div
            className="stats-bar"
            role="list"
            aria-label="Platform statistics"
          >
            {STATS.map((s) => (
              <div className="stat-item" role="listitem" key={s.label}>
                <span className="stat-num">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Sport pills */}
          <div className="sports-pills" aria-label="Available sports">
            {SPORTS.map((s) => (
              <span className="sport-pill" key={s.label}>
                <span aria-hidden="true">{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Styles ── */}
        <style>{`
          /* ── Reset & base ─────────────────────────────────── */
          .hero-section {
            position: relative;
            width: 100%;
            min-height: 100svh;
            overflow: hidden;
            background: #0a0f1a;
            font-family: 'DM Sans', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;

          }

          /* ── Background layers ────────────────────────────── */
          .hero-bg {
            position: absolute; inset: 0;
            background:
              radial-gradient(ellipse 80% 60% at 68% 38%, rgba(6,182,212,.13) 0%, transparent 60%),
              radial-gradient(ellipse 50% 80% at 20% 80%, rgba(6,182,212,.07) 0%, transparent 60%),
              linear-gradient(160deg, #050b18 0%, #0d1b2a 55%, #091520 100%);
              url('/hero.jpg') repeat;
            background-size: cover, cover, cover, 52px 52px;
          }
          .grid-lines {
            position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(6,182,212,.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6,182,212,.045) 1px, transparent 1px);
            background-size: 52px 52px;
          }
          .glow-orb {
            position: absolute;
            top: -90px; right: -70px;
            width: 380px; height: 380px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6,182,212,.2) 0%, transparent 68%);
            will-change: transform;
            pointer-events: none;
          }
          .turf-arc {
            position: absolute;
            bottom: -80px; left: 50%;
            transform: translateX(-50%);
            width: min(1000px, 130vw); height: 300px;
            border-radius: 50%;
            border: 1.5px solid rgba(6,182,212,.14);
            pointer-events: none;
          }
          .turf-arc-inner {
            position: absolute;
            bottom: -120px; left: 50%;
            transform: translateX(-50%);
            width: min(680px, 90vw); height: 220px;
            border-radius: 50%;
            border: 1px solid rgba(6,182,212,.07);
            pointer-events: none;
          }

          /* ── Content ──────────────────────────────────────── */
          .hero-content {
            position: relative; z-index: 2;
            padding: 80px 24px 72px;
            display: flex; flex-direction: column;
            align-items: center; text-align: center;
            gap: 0;
            max-width: 740px; width: 100%;
          }

          /* ── Badge ────────────────────────────────────────── */
          .live-badge {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(6,182,212,.12);
            border: 1px solid rgba(6,182,212,.3);
            border-radius: 999px;
            padding: 7px 18px;
            font-size: 11px; font-weight: 500;
            color: #22d3ee;
            letter-spacing: .08em;
            text-transform: uppercase;
            margin-bottom: 32px;
            animation: fadeDown .55s ease both;
          }
          .pulse-dot {
            width: 7px; height: 7px; border-radius: 50%;
            background: #22d3ee;
            animation: pulse 1.8s ease-in-out infinite;
            flex-shrink: 0;
          }

          /* ── Headline ─────────────────────────────────────── */
          .hero-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(52px, 10vw, 84px);
            line-height: 1.0;
            color: #fff;
            letter-spacing: .025em;
            margin: 0 0 8px;
            animation: fadeDown .6s .08s ease both;
          }
          .hero-title .accent {
            color: #22d3ee;
            position: relative;
            display: inline-block;
          }
          .hero-title .accent::after {
            content: '';
            position: absolute;
            bottom: 5px; left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg, #06b6d4, #0e7490);
            border-radius: 2px;
          }

          /* ── Subheading ───────────────────────────────────── */
          .hero-sub {
            font-size: clamp(15px, 2vw, 17px);
            font-weight: 300;
            color: rgba(255,255,255,.52);
            max-width: 460px;
            line-height: 1.7;
            margin: 22px 0 38px;
            animation: fadeDown .6s .16s ease both;
          }
          .hero-sub em {
            font-style: italic;
            color: rgba(255,255,255,.72);
          }

          /* ── CTAs ─────────────────────────────────────────── */
          .cta-group {
            display: flex; align-items: center; gap: 12px;
            flex-wrap: wrap; justify-content: center;
            margin-bottom: 52px;
            animation: fadeDown .6s .24s ease both;
          }
          .btn-primary {
            display: inline-flex; align-items: center; gap: 9px;
            background: #06b6d4; color: #fff;
            font-family: 'DM Sans', sans-serif;
            font-size: 15px; font-weight: 500;
            padding: 15px 30px;
            border-radius: 999px; border: none; cursor: pointer;
            transition: background .2s, transform .15s, box-shadow .2s;
            letter-spacing: .01em;
          }
          .btn-primary:hover {
            background: #0891b2;
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(6,182,212,.35);
          }
          .btn-primary:active  { transform: scale(.97); }
          .btn-secondary {
            display: inline-flex; align-items: center; gap: 9px;
            background: transparent; color: rgba(255,255,255,.68);
            font-family: 'DM Sans', sans-serif;
            font-size: 15px; font-weight: 400;
            padding: 15px 26px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.16);
            cursor: pointer;
            transition: border-color .2s, color .2s, background .2s, transform .15s;
          }
          .btn-secondary:hover {
            border-color: rgba(255,255,255,.36);
            color: #fff; background: rgba(255,255,255,.05);
            transform: translateY(-2px);
          }
          .btn-secondary:active { transform: scale(.97); }

          /* ── Stats bar ────────────────────────────────────── */
          .stats-bar {
            display: flex; align-items: stretch;
            background: rgba(255,255,255,.04);
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 16px; overflow: hidden;
            width: 100%; max-width: 580px;
            animation: fadeUp .65s .38s ease both;
          }
          .stat-item {
            flex: 1; display: flex; flex-direction: column;
            align-items: center; padding: 20px 12px; gap: 5px;
          }
          .stat-item + .stat-item {
            border-left: 1px solid rgba(255,255,255,.07);
          }
          .stat-num {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(26px, 4vw, 34px); line-height: 1;
            color: #22d3ee; letter-spacing: .03em;
          }
          .stat-label {
            font-size: 11px; font-weight: 400;
            color: rgba(255,255,255,.38);
            letter-spacing: .07em; text-transform: uppercase;
          }

          /* ── Sport pills ──────────────────────────────────── */
          .sports-pills {
            display: flex; gap: 8px; flex-wrap: wrap;
            justify-content: center; margin-top: 24px;
            animation: fadeUp .65s .48s ease both;
          }
          .sport-pill {
            display: flex; align-items: center; gap: 6px;
            background: rgba(255,255,255,.05);
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 999px; padding: 7px 16px;
            font-size: 13px; color: rgba(255,255,255,.52);
            transition: background .2s, border-color .2s, color .2s;
            cursor: default; user-select: none;
          }
          .sport-pill:hover {
            background: rgba(6,182,212,.1);
            border-color: rgba(6,182,212,.3);
            color: #22d3ee;
          }

          /* ── Keyframes ────────────────────────────────────── */
          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-16px); }
            to   { opacity: 1; transform: translateY(0);     }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1;   transform: scale(1);   }
            50%       { opacity: .4; transform: scale(.65); }
          }

          /* ── Responsive tweaks ────────────────────────────── */
          @media (max-width: 480px) {
            .hero-content  { padding: 64px 20px 56px; }
            .stats-bar     { border-radius: 12px; }
            .stat-item     { padding: 16px 8px; }
            .sport-pill    { font-size: 12px; padding: 6px 12px; }
          }
        `}</style>
      </section>
    </>
  );
}
