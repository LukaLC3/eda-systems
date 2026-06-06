import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ArrowRight } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

export function Contact() {
  const { t } = useT();
  const trust = [t("ct.trust1"), t("ct.trust2"), t("ct.trust3")];
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 indigo-mesh opacity-40 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-card p-8 md:p-14 shadow-[0_40px_100px_-30px_rgba(79,70,229,0.5)]">
          <div className="absolute inset-0 bg-gradient-mesh opacity-70 pointer-events-none" />
          <div className="absolute -inset-x-20 -top-20 h-64 bg-gradient-radial-glow pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute -top-32 -right-32 size-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
                <span className="size-1 rounded-full bg-primary animate-glow-pulse" />
                {t("ct.tag")}
              </div>
              <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-gradient leading-tight">
                {t("ct.title")}
              </h2>
              <p className="mt-4 text-muted-foreground">{t("ct.subtitle")}</p>
              <ul className="mt-6 space-y-2.5">
                {trust.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ animation: `fade-in 0.5s ease-out ${i * 80}ms both` }}
                  >
                    <span className="size-5 rounded-full bg-success/15 border border-success/30 grid place-items-center shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      <Check className="size-3 text-success" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative bg-background/80 backdrop-blur rounded-2xl p-6 border border-primary/20 space-y-3 shadow-[0_20px_60px_-20px_rgba(79,70,229,0.4)]"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder={t("ct.firstName")} required />
                <Input placeholder={t("ct.lastName")} required />
              </div>
              <Input type="email" placeholder={t("ct.email")} required />
              <Input type="tel" placeholder={t("ct.phone")} />
              <Input placeholder={t("ct.office")} />
              <textarea
                placeholder={t("ct.message")}
                rows={3}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button variant="hero" size="xl" className="w-full mt-1" style={{ borderRadius: 3 }}>
                {t("ct.submitDemo")} <ArrowRight className="size-4" />
              </Button>
              <div className="text-[11px] text-muted-foreground text-center font-mono tracking-wide">{t("ct.note")}</div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
