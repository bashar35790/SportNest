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
            background-image:
              linear-gradient(to bottom, rgba(10, 15, 26, 0.3) 0%, rgba(10, 15, 26, 0.95) 100%),
              radial-gradient(ellipse 80% 60% at 50% 20%, rgba(6, 182, 212, 0.25) 0%, transparent 60%),
              url('/hero.jpg');
            background-size: cover, cover, cover;
            background-position: center, center, center;
            background-repeat: no-repeat;
            opacity: 0.9;
            z-index: 0;
            animation: bgPan 30s ease-in-out infinite alternate;
          }
          @keyframes bgPan {
            0% { transform: scale(1.05) translateY(0); }
            100% { transform: scale(1.1) translateY(-2%); }
          }
          
          .grid-lines {
            position: absolute; inset: 0;
            background-image:
              linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
            background-size: 52px 52px;
            z-index: 1;
            mask-image: linear-gradient(to bottom, black 20%, transparent 80%);
            -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 80%);
          }
          
          .glow-orb {
            position: absolute;
            top: 20%; left: 50%;
            transform: translate(-50%, -50%);
            width: 800px; height: 800px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(6,182,212,.15) 0%, transparent 60%);
            will-change: transform;
            pointer-events: none;
            z-index: 1;
            filter: blur(40px);
          }
          
          .turf-arc {
            position: absolute;
            bottom: -150px; left: 50%;
            transform: translateX(-50%);
            width: min(1200px, 150vw); height: 400px;
            border-radius: 50%;
            border-top: 1.5px solid rgba(6,182,212,.3);
            background: radial-gradient(ellipse at top, rgba(6,182,212,.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1;
            box-shadow: 0 -20px 40px rgba(6,182,212,.05);
          }
          .turf-arc-inner {
            position: absolute;
            bottom: -120px; left: 50%;
            transform: translateX(-50%);
            width: min(800px, 100vw); height: 250px;
            border-radius: 50%;
            border-top: 1px solid rgba(6,182,212,.15);
            pointer-events: none;
            z-index: 1;
          }

          /* ── Content ──────────────────────────────────────── */
          .hero-content {
            position: relative; z-index: 2;
            padding: 100px 24px 80px;
            display: flex; flex-direction: column;
            align-items: center; text-align: center;
            gap: 0;
            max-width: 800px; width: 100%;
          }

          /* ── Badge ────────────────────────────────────────── */
          .live-badge {
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(6,182,212,.1);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(6,182,212,.2);
            border-radius: 999px;
            padding: 8px 20px;
            font-size: 12px; font-weight: 600;
            color: #22d3ee;
            letter-spacing: .1em;
            text-transform: uppercase;
            margin-bottom: 36px;
            animation: fadeDown .6s cubic-bezier(0.16, 1, 0.3, 1) both;
            box-shadow: 0 4px 20px rgba(6,182,212,.1);
          }
          .pulse-dot {
            width: 8px; height: 8px; border-radius: 50%;
            background: #22d3ee;
            animation: pulse 2s ease-in-out infinite;
            flex-shrink: 0;
            box-shadow: 0 0 10px #22d3ee;
          }

          /* ── Headline ─────────────────────────────────────── */
          .hero-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(60px, 12vw, 100px);
            line-height: 0.95;
            color: #fff;
            letter-spacing: .02em;
            margin: 0 0 16px;
            animation: fadeDown .7s .1s cubic-bezier(0.16, 1, 0.3, 1) both;
            text-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }
          .hero-title .accent {
            color: transparent;
            background: linear-gradient(135deg, #22d3ee, #0284c7);
            -webkit-background-clip: text;
            background-clip: text;
            position: relative;
            display: inline-block;
          }
          .hero-title .accent::after {
            content: '';
            position: absolute;
            bottom: 4px; left: 0; right: 0;
            height: 4px;
            background: linear-gradient(90deg, transparent, #06b6d4, transparent);
            border-radius: 2px;
            opacity: 0.8;
          }

          /* ── Subheading ───────────────────────────────────── */
          .hero-sub {
            font-size: clamp(16px, 2.5vw, 18px);
            font-weight: 400;
            color: rgba(255,255,255,.7);
            max-width: 540px;
            line-height: 1.6;
            margin: 24px 0 44px;
            animation: fadeDown .7s .2s cubic-bezier(0.16, 1, 0.3, 1) both;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          }
          .hero-sub em {
            font-style: italic;
            color: #fff;
            font-weight: 500;
          }

          /* ── CTAs ─────────────────────────────────────────── */
          .cta-group {
            display: flex; align-items: center; gap: 16px;
            flex-wrap: wrap; justify-content: center;
            margin-bottom: 60px;
            animation: fadeDown .7s .3s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .btn-primary {
            display: inline-flex; align-items: center; gap: 10px;
            background: linear-gradient(135deg, #06b6d4, #0284c7);
            color: #fff;
            font-family: 'DM Sans', sans-serif;
            font-size: 16px; font-weight: 600;
            padding: 16px 36px;
            border-radius: 999px; border: none; cursor: pointer;
            transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
            letter-spacing: .02em;
            box-shadow: 0 10px 30px rgba(6,182,212,.3), inset 0 1px 1px rgba(255,255,255,0.2);
          }
          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(6,182,212,.4), inset 0 1px 1px rgba(255,255,255,0.2);
            filter: brightness(1.1);
          }
          .btn-primary:active  { transform: translateY(1px); }
          
          .btn-secondary {
            display: inline-flex; align-items: center; gap: 10px;
            background: rgba(255,255,255,.03);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: #fff;
            font-family: 'DM Sans', sans-serif;
            font-size: 16px; font-weight: 500;
            padding: 16px 32px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.1);
            cursor: pointer;
            transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .btn-secondary:hover {
            border-color: rgba(255,255,255,.3);
            background: rgba(255,255,255,.08);
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0,0,0,.2);
          }
          .btn-secondary:active { transform: translateY(1px); }

          /* ── Stats bar ────────────────────────────────────── */
          .stats-bar {
            display: flex; align-items: stretch;
            background: rgba(10, 15, 26, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 20px; overflow: hidden;
            width: 100%; max-width: 700px;
            animation: fadeUp .8s .4s cubic-bezier(0.16, 1, 0.3, 1) both;
            box-shadow: 0 20px 40px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.05);
          }
          .stat-item {
            flex: 1; display: flex; flex-direction: column;
            align-items: center; padding: 24px 16px; gap: 6px;
            transition: background .3s;
          }
          .stat-item:hover {
            background: rgba(255,255,255,.03);
          }
          .stat-item + .stat-item {
            border-left: 1px solid rgba(255,255,255,.05);
          }
          .stat-num {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(32px, 5vw, 42px); line-height: 1;
            color: #fff; letter-spacing: .03em;
            text-shadow: 0 2px 10px rgba(0,0,0,.3);
          }
          .stat-label {
            font-size: 12px; font-weight: 500;
            color: #22d3ee;
            letter-spacing: .1em; text-transform: uppercase;
          }

          /* ── Sport pills ──────────────────────────────────── */
          .sports-pills {
            display: flex; gap: 10px; flex-wrap: wrap;
            justify-content: center; margin-top: 32px;
            animation: fadeUp .8s .5s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          .sport-pill {
            display: flex; align-items: center; gap: 8px;
            background: rgba(255,255,255,.03);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 999px; padding: 8px 18px;
            font-size: 14px; font-weight: 500; color: rgba(255,255,255,.7);
            transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: default; user-select: none;
          }
          .sport-pill:hover {
            background: rgba(6,182,212,.15);
            border-color: rgba(6,182,212,.4);
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(6,182,212,.2);
          }

          /* ── Keyframes ────────────────────────────────────── */
          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-24px); }
            to   { opacity: 1; transform: translateY(0);     }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1;   transform: scale(1);   box-shadow: 0 0 10px #22d3ee; }
            50%       { opacity: .5; transform: scale(.7);  box-shadow: 0 0 0 #22d3ee; }
          }

          /* ── Responsive tweaks ────────────────────────────── */
          @media (max-width: 640px) {
            .stats-bar { flex-wrap: wrap; border-radius: 16px; }
            .stat-item { min-width: 40%; }
            .stat-item:nth-child(1), .stat-item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,.05); }
            .stat-item:nth-child(3) { border-left: none; }
          }
          @media (max-width: 480px) {
            .hero-content  { padding: 80px 20px 60px; }
            .stat-item     { padding: 16px 12px; }
            .sport-pill    { font-size: 13px; padding: 6px 14px; }
            .cta-group     { flex-direction: column; width: 100%; }
            .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          }
        `}</style>
      </section>
    </>
  );
}
