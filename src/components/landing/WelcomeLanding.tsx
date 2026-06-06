import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { SECTORS, SECTOR_DISPLAY, type SectorKey } from "@/i18n/sectors";
import { Logo } from "@/components/site/Logo";
import { CircuitBackground } from "./CircuitBackground";

const SECTOR_BULLETS: Record<SectorKey, string[]> = {
  vastgoed: [
    "Automated viewing & appointment scheduling",
    "Smart lead capture and follow-up",
    "AI-generated property descriptions",
  ],
  tandartsen: [
    "Eliminate no-shows with smart reminders",
    "Automated appointment scheduling",
    "Streamlined patient communication",
  ],
  kinesisten: [
    "Session planning on autopilot",
    "Voice-dictated treatment reports",
    "Automated patient follow-up",
  ],
  accountants: [
    "Invoice processing up to 75% faster",
    "Deadline tracking per client",
    "Automated client communication",
  ],
  architecten: [
    "Quotes generated in minutes",
    "Automated project updates",
    "Phase-based invoicing",
  ],
  garages: [
    "Instant quotes and status updates",
    "Automatic MOT & service reminders",
    "Maintenance follow-up handled for you",
  ],
  horeca: [
    "Reservations processed automatically",
    "Smart staff scheduling",
    "Review monitoring & responses",
  ],
};

export function WelcomeLanding() {
  const navigate = useNavigate();

  const pick = (key: SectorKey) => {
    try {
      localStorage.setItem("eda-sector", key);
    } catch {}
    navigate({ to: "/experience" });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-[#060D1A] text-foreground antialiased" style={{ scrollBehavior: "smooth" }}>
      <CircuitBackground />
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {/* Background layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(79,70,229,0.18), transparent 70%), radial-gradient(40% 40% at 80% 90%, rgba(37,99,235,0.10), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="landing-particles absolute inset-0 pointer-events-none" />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto animate-fade-up">
          <div className="flex justify-center mb-8">
            <Logo size={64} />
          </div>

          {/* Trust badge */}
          <div className="flex justify-center mb-6 animate-fade-up">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs sm:text-[13px] font-medium text-muted-foreground backdrop-blur-sm"
              style={{
                boxShadow: "0 0 0 1px rgba(99,102,241,0.08), 0 4px 24px -8px rgba(59,130,246,0.25)",
              }}
            >
              <ShieldCheck size={14} className="text-[#6366f1]" strokeWidth={2} />
              <span>
                <span className="text-foreground">EDA System</span>
                <span className="mx-1.5 text-white/20">—</span>
                <span>Trusted by 400+ businesses</span>
              </span>
            </div>
          </div>

          <h1
            className="font-semibold tracking-tight leading-[1.05] text-foreground"
            style={{ fontSize: "clamp(40px, 7vw, 84px)" }}
          >
            Welcome to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #3b82f6, #22d3ee)" }}
            >
              EDA Systems
            </span>
          </h1>
          <p
            className="mt-6 mx-auto max-w-xl text-muted-foreground animate-fade-up [animation-delay:150ms]"
            style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
          >
            Are you ready to put your business on autopilot?
          </p>

          <button
            onClick={() => scrollTo("intro")}
            className="group mt-14 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white animate-fade-up [animation-delay:320ms]"
          >
            <span>Discover more</span>
            <ChevronDown size={18} className="animate-bounce-slow" />
          </button>
        </div>
      </section>

      {/* INTRO */}
      <section id="intro" className="relative px-6 py-32 md:py-40">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 50%, rgba(59,130,246,0.06), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center space-y-6">
          <h2
            className="font-semibold tracking-tight text-foreground"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            AI automation, engineered for your industry.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We build tailored automation systems that eliminate administrative work, accelerate operations, and free your team to focus on what matters most.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            One platform. Results designed around your niche.
          </p>
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => scrollTo("industries")}
              className="group inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            >
              <span>Discover Niches</span>
              <ChevronDown size={18} className="animate-bounce-slow" />
            </button>
          </div>
        </div>
      </section>

      {/* NICHE SELECTOR */}
      <section id="industries" className="relative px-6 py-24 md:py-32">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(99,102,241,0.10), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center gap-6">
            <Logo size={72} />
            <h2
              className="font-semibold tracking-tight text-foreground"
              style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
            >
              Choose your industry
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Select your sector to explore the automation system built for you.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-4">
            {SECTORS.map((s, i) => {
              const Icon = s.icon;
              const display = SECTOR_DISPLAY[s.key].en;
              const bullets = SECTOR_BULLETS[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => pick(s.key)}
                  className="niche-card group relative w-full overflow-hidden rounded-xl border border-white/8 bg-white/[0.02] p-6 text-left transition-all duration-300 hover:bg-white/[0.04] animate-fade-up"
                  style={{
                    animationDelay: `${i * 60}ms`,
                    borderLeft: `3px solid ${s.accent}`,
                  }}
                >
                  {/* hover glow */}
                  <div
                    aria-hidden
                    className="absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: `radial-gradient(50% 80% at 0% 50%, ${s.accent}22, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex items-center gap-5">
                    <div
                      className="flex size-12 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105"
                      style={{ background: `${s.accent}15`, borderColor: `${s.accent}33` }}
                    >
                      <Icon size={22} strokeWidth={1.5} style={{ color: s.accent }} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-lg font-semibold tracking-tight text-foreground">
                          {display.name}
                        </span>
                        <span
                          className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider"
                          style={{
                            color: s.accent,
                            borderColor: `${s.accent}40`,
                            background: `${s.accent}10`,
                          }}
                        >
                          {s.key === "vastgoed" ? "Property" :
                           s.key === "tandartsen" ? "Healthcare" :
                           s.key === "kinesisten" ? "Healthcare" :
                           s.key === "accountants" ? "Finance" :
                           s.key === "architecten" ? "Design" :
                           s.key === "garages" ? "Automotive" : "Hospitality"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{display.desc}</p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1"
                    />
                  </div>

                  {/* Hover bullets */}
                  <div
                    className="relative grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-5"
                  >
                    <div className="overflow-hidden">
                      <ul className="flex flex-col gap-2 pl-[68px]">
                        {bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span
                              className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full"
                              style={{ background: s.accent }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/8 px-6 py-12">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div>
              <div className="text-sm font-semibold text-foreground">EDA Systems</div>
              <div className="text-xs text-muted-foreground">Your business on autopilot.</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <button onClick={() => scrollTo("industries")} className="hover:text-foreground transition-colors">
              Industries
            </button>
            <a href="mailto:contact@edasystems.be" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
          </div>
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} EDA Systems</div>
        </div>
      </footer>
    </div>
  );
}
