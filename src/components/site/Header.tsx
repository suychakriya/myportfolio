import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useMood } from "@/lib/mood-context";

function PlanetLogo({ mood }: { mood: string }) {
  const isFocus = mood === "focus";
  const sphereFrom = isFocus ? "oklch(0.58 0.13 268)" : "oklch(0.90 0.10 82)";
  const sphereMid = isFocus ? "oklch(0.34 0.11 258)" : "oklch(0.72 0.14 65)";
  const sphereTo = isFocus ? "oklch(0.18 0.05 254)" : "oklch(0.50 0.12 52)";
  const ringColor = isFocus ? "rgba(140,165,225,0.55)" : "rgba(210,165,80,0.65)";
  const dotColor = isFocus ? "rgba(190,210,255,0.95)" : "rgba(255,230,120,0.95)";

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <defs>
        <radialGradient id="pl-sphere" cx="38%" cy="30%" r="65%">
          <stop offset="0%" stopColor={sphereFrom} />
          <stop offset="55%" stopColor={sphereMid} />
          <stop offset="100%" stopColor={sphereTo} />
        </radialGradient>
        <clipPath id="pl-top">
          <rect x="0" y="0" width="28" height="14" />
        </clipPath>
        <clipPath id="pl-bot">
          <rect x="0" y="14" width="28" height="14" />
        </clipPath>
      </defs>
      {/* Back ring arc */}
      <ellipse
        cx="14"
        cy="14"
        rx="13"
        ry="4.8"
        stroke={ringColor}
        strokeWidth="1"
        fill="none"
        transform="rotate(-18 14 14)"
        clipPath="url(#pl-top)"
      />
      {/* Planet */}
      <circle cx="14" cy="14" r="9" fill="url(#pl-sphere)" />
      {/* Specular */}
      <ellipse cx="11.5" cy="10.5" rx="2.8" ry="1.3" fill="rgba(255,255,255,0.22)" />
      {/* Front ring arc */}
      <ellipse
        cx="14"
        cy="14"
        rx="13"
        ry="4.8"
        stroke={ringColor}
        strokeWidth="1"
        fill="none"
        transform="rotate(-18 14 14)"
        clipPath="url(#pl-bot)"
      />
      {/* Dot on ring */}
      <circle cx="25.8" cy="10.2" r="1.5" fill={dotColor} />
    </svg>
  );
}

const focusLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Experiences" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

const shineLinks = [
  { to: "/", label: "Home" },
  { to: "/novels", label: "Novels" },
  // { to: "/about", label: "About" },
  { to: "/contact", label: "Say hi" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { mood, toggle } = useMood();
  const links = mood === "shine" ? shineLinks : focusLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <PlanetLogo mood={mood} />
          <span className="font-display text-lg tracking-tight">
            Chakriya<span className="text-sun">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-1 w-1 rounded-full bg-sun" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {mood === "focus" ? (
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Let's talk
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <Link
              to="/novels"
              className="inline-flex items-center gap-2 rounded-full bg-sun text-ink px-5 py-2 text-sm font-medium hover:bg-sun-deep hover:text-cream transition-colors"
            >
              Read novels
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md hover:bg-secondary"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-3 rounded-md text-base font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
