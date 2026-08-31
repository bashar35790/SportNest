"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Search, Play } from "lucide-react";

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

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const TITLE_LINES = [
  { text: "Book Your", className: "" },
  { text: "Sports Facility", className: "accent" },
  { text: "Instantly", className: "" },
];

function splitIntoLetters(line: { text: string; className: string }) {
  const words = line.text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span
          key={wi}
          className={`inline-block whitespace-nowrap ${line.className} hero-letter-word`}
        >
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="hero-letter inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function useHeroTitleLetterReveal(
  titleRef: React.RefObject<HTMLHeadingElement | null>,
  reduceMotion: boolean | null
) {
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const letters = el.querySelectorAll<HTMLElement>(".hero-letter");

    if (reduceMotion) {
      gsap.set(letters, { opacity: 1, filter: "blur(0px)", scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        { opacity: 0, y: 0.5, filter: "blur(10px)", scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.035,
          delay: 0.15,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [titleRef, reduceMotion]);
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  useHeroTitleLetterReveal(titleRef, !!reduceMotion);

  const delay = (n: number) => 0.9 + n * 0.12;

  return (
    <section className="hero-section" aria-label="Book your sports facility">
      {/* ── Backgrounds ── */}
      <div className="hero-bg" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero.jpg"
          className="hero-video"
        >
          <source src="/video/heroVideo.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      {/* ── Content ── */}
      <div className="hero-content">
        {/* Live badge */}
        <motion.div
          className="live-badge"
          role="status"
          aria-live="polite"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: PREMIUM_EASE }}
        >
          <span className="pulse-dot" />
          Facilities available now
        </motion.div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="hero-title"
          aria-label="Book Your Sports Facility Instantly"
        >
          {TITLE_LINES.map((line, li) => (
            <span key={li} aria-hidden="true" className="block">
              {splitIntoLetters(line)}
            </span>
          ))}
        </h1>

        {/* Subheading */}
        <motion.p
          className="hero-sub"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: delay(2), ease: PREMIUM_EASE }}
        >
          Experience athletic precision with the world&apos;s most advanced
          facility management platform. Reserve courts, fields, and tracks in
          seconds.
          <em>all in one place.</em>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="cta-group"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: delay(3), ease: PREMIUM_EASE }}
        >
          <button className="btn-primary" type="button">
            <Search size={16} aria-hidden="true" />
            Explore Facilities
          </button>
          <button className="btn-secondary" type="button">
            <Play size={15} aria-hidden="true" />
            How it works
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="stats-bar"
          role="list"
          aria-label="Platform statistics"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, delay: delay(3.8), ease: PREMIUM_EASE }}
        >
          {STATS.map((s) => (
            <div className="stat-item" role="listitem" key={s.label}>
              <span className="stat-num">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Sport pills */}
        <motion.div
          className="sports-pills"
          aria-label="Available sports"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8, delay: delay(4.6), ease: PREMIUM_EASE }}
        >
          {SPORTS.map((s) => (
            <span className="sport-pill" key={s.label}>
              <span aria-hidden="true">{s.icon}</span>
              {s.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
