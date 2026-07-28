"use client";

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
  return (
    <>
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


      </section>
    </>
  );
}
