import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { useMood } from "@/lib/mood-context";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function Footer() {
  const { mood, toggle } = useMood();
  const navigate = useNavigate();

  const goToWork = () => {
    if (mood === "shine") toggle();
    navigate("/work");
  };

  return (
    <footer className="relative border-t border-border bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sun-radial opacity-20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-3 w-3 rounded-full bg-sun" />
              <span className="font-display text-xl">Chakriya Suy</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-xs leading-relaxed">
              Software Engineer building reliable, production-ready systems from Tokyo.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-sun mb-4">
              Navigate
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-sun transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sun transition-colors">
                  About
                </Link>
              </li>
              <li>
                <button onClick={goToWork} className="hover:text-sun transition-colors">
                  Experience
                </button>
              </li>
              <li>
                <Link to="/projects" className="hover:text-sun transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sun transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-sun mb-4">
              Elsewhere
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/suychakriya"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 grid place-items-center rounded-full border border-primary-foreground/20 hover:border-sun hover:text-sun transition-colors"
              >
                <GithubIcon />
              </a>
              <a
                href="https://linkedin.com/in/suy-chakriya"
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 grid place-items-center rounded-full border border-primary-foreground/20 hover:border-sun hover:text-sun transition-colors"
              >
                <LinkedinIcon />
              </a>
              <a
                href="mailto:suy.chakryya@gmail.com"
                className="h-10 w-10 grid place-items-center rounded-full border border-primary-foreground/20 hover:border-sun hover:text-sun transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
            <p className="mt-6 text-xs text-primary-foreground/60">Tokyo, Japan</p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-primary-foreground/50">
          <span>© {new Date().getFullYear()} Chakriya Suy. All rights reserved.</span>
          <span className="font-display italic">Built with intention.</span>
        </div>
      </div>
    </footer>
  );
}
