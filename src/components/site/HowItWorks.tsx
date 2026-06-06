import { Calendar, Cog, Rocket, MessageCircle, Check, CheckCheck, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { useT } from "@/i18n/LanguageProvider";
import { useSector } from "@/i18n/SectorProvider";
import { SECTOR_WA } from "@/i18n/sectors";
import { SectorDashboard } from "./SectorDashboard";

export function HowItWorks() {
  const { t } = useT();
  const steps = [
    { n: "01", icon: Calendar, title: t("hw.s1.t"), desc: t("hw.s1.d") },
    { n: "02", icon: Cog, title: t("hw.s2.t"), desc: t("hw.s2.d") },
    { n: "03", icon: Rocket, title: t("hw.s3.t"), desc: t("hw.s3.d") },
  ];

  return (
    <section id="werkwijze" className="relative py-28 bg-surface/30 border-y border-primary/10 overflow-hidden">
      <div className="absolute inset-0 indigo-mesh opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
            <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
            {t("hw.tag")}
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
            {t("hw.title")}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">{t("hw.subtitle")}</p>
        </div>

        <div className="relative mt-16 grid md:grid-cols-3 gap-6">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          {steps.map((s, i) => (
            <div key={s.n} className="relative group" style={{ animation: `fade-in 0.6s ease-out ${i * 120}ms both` }}>
              <div className="relative glass rounded-2xl p-6 h-full hover:shadow-glow transition-all duration-500 border border-primary/15 hover:border-primary/40 overflow-hidden">
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                  <div className="size-12 rounded-xl bg-gradient-brand grid place-items-center shadow-glow ring-1 ring-primary/40">
                    <s.icon className="size-5 text-white" />
                  </div>
                  <span className="text-xs font-mono text-primary/70 tracking-widest">{s.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-success bg-success/10 border border-success/20 rounded-full px-3 py-1">
              <MessageCircle className="size-3" /> {t("hw.live")}
            </div>
            <h3 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
              {t("hw.exampleTitle")}
            </h3>
            <p className="mt-4 text-muted-foreground">{t("hw.exampleDesc")}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {[t("hw.bullet1"), t("hw.bullet2"), t("hw.bullet3")].map(i => (
                <li key={i} className="flex gap-2"><Check className="size-4 mt-0.5 text-primary shrink-0" />{i}</li>
              ))}
            </ul>

            <div className="mt-8"><SectorDashboard /></div>
            <EmailMock />
          </div>

          <WhatsAppMock />
        </div>
      </div>
    </section>
  );
}

type Scenario = {
  bubbles: { side: "in" | "out"; time: string; text: string; auto?: boolean }[];
};

function stripEmoji(s: string): string {
  return s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{2700}-\u{27BF}]/gu, "").replace(/\s+([.,!?])/g, "$1").trim();
}

function WhatsAppMock() {
  const { t } = useT();
  const { sector } = useSector();

  const sectorScenarios = sector ? SECTOR_WA[sector] : SECTOR_WA.vastgoed;
  const scenarios: Scenario[] = sectorScenarios.map((s) => ({ bubbles: s.bubbles }));
  const names = sectorScenarios.map((s) => s.name);

  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // reset when sector changes
  useEffect(() => { setIdx(0); setVisible(true); }, [sector]);

  useEffect(() => {
    const showFor = 17000; // 17s visible
    const fadeFor = 600;   // 0.6s fade
    let mounted = true;

    const tick = () => {
      setVisible(false);
      setTimeout(() => {
        if (!mounted) return;
        setIdx(i => (i + 1) % scenarios.length);
        setVisible(true);
      }, fadeFor);
    };
    const id = setInterval(tick, showFor + fadeFor);
    return () => { mounted = false; clearInterval(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = scenarios[idx];

  return (
    <div className="relative mx-auto max-w-sm">
      <div className="absolute -inset-6 bg-gradient-radial-glow opacity-40 pointer-events-none" />
      <div className="relative rounded-[2rem] border-hairline bg-[#0b141a] shadow-elevated overflow-hidden">
        {/* WA topbar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#202c33] border-b border-white/5">
          <div className="size-9 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/5">
            <img src={logo} alt="EDA" width={36} height={36} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">{t("hw.assistant")}</div>
            <div className="text-[11px] text-emerald-400">{t("hw.online")}</div>
          </div>
          <div className="text-[10px] text-white/40 font-mono">{names[idx]}</div>
        </div>

        <div className="relative p-4 h-[480px] bg-[#0b141a]">
          <div
            className={`space-y-2.5 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
          >
            {current.bubbles.map((b, i) => (
              <Bubble key={i} side={b.side} time={b.time} auto={b.auto}>
                {stripEmoji(b.text)}
              </Bubble>
            ))}

            <div className="mt-4 glass rounded-xl p-3">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCheck className="size-3.5" /> {t("hw.bookedAuto")}
              </div>
            </div>
          </div>

          {/* scenario indicator dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {scenarios.map((_, i) => (
              <span
                key={i}
                className={`block h-1 rounded-full transition-all duration-500 ${i === idx ? "w-4 bg-emerald-400" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, time, auto, children }: { side: "in" | "out"; time: string; auto?: boolean; children: React.ReactNode }) {
  const out = side === "out";
  return (
    <div className={`flex ${out ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] text-white/95 ${out ? "bg-[#005c4b] rounded-tr-sm" : "bg-[#202c33] rounded-tl-sm"}`}>
        <div>{children}</div>
        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-white/60">
          {auto && <span className="text-emerald-300">• EDA</span>}
          {time}
          {out && <CheckCheck className="size-3 text-sky-300" />}
        </div>
      </div>
    </div>
  );
}

function EmailMock() {
  const { t } = useT();
  const [phase, setPhase] = useState<"reading" | "answered">("reading");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase(p => (p === "reading" ? "answered" : "reading"));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-8 glass rounded-2xl p-4 shadow-soft">
      <div className="flex items-center gap-2 text-xs text-primary">
        <Mail className="size-3.5" /> {t("hw.emailReadTitle")}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{t("hw.emailReadDesc")}</p>

      <div className="mt-3 rounded-lg border-hairline bg-background/50 p-3 text-xs">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{t("hw.emailFrom")}: pieter.vermeulen@gmail.com</span>
          <span className="font-mono">14:21</span>
        </div>
        <div className="mt-1 font-semibold">{t("hw.emailSubject")}: {t("hw.emailIncoming")}</div>

        <div className="mt-3 min-h-[120px]">
          <div className="w-full">
            <div className={`flex items-center gap-2 transition-opacity duration-500 ${phase === "reading" ? "opacity-100 text-primary" : "opacity-100 text-emerald-400"} text-[11px]`}>
              {phase === "reading" ? (
                <>
                  <Sparkles className="size-3.5 animate-glow-pulse" />
                  <span>{t("hw.emailReading")}</span>
                  <span className="ml-1 inline-flex gap-0.5">
                    <span className="size-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="size-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "120ms" }} />
                    <span className="size-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "240ms" }} />
                  </span>
                </>
              ) : (
                <>
                  <CheckCheck className="size-3.5" /> {t("hw.emailAnswered")}
                </>
              )}
            </div>
            <div className={`mt-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 p-2 text-[11px] text-foreground/90 leading-relaxed transition-opacity duration-500 ${phase === "answered" ? "opacity-100" : "opacity-0"}`}>
              {t("hw.emailReply")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
