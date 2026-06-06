import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useT } from "@/i18n/LanguageProvider";

export function FAQ() {
  const { t } = useT();
  const faqs = [1, 2, 3, 4, 5, 6, 7].map(i => ({ q: t(`faq.q${i}`), a: t(`faq.a${i}`) }));

  return (
    <section id="faq" className="relative overflow-hidden" style={{ padding: "120px 0" }}>
      <div className="absolute inset-0 indigo-mesh opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.04] pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 uppercase font-mono" style={{ color: "hsl(var(--primary))", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>
            <span className="size-1 rounded-full animate-glow-pulse" style={{ background: "hsl(var(--primary))" }} />
            {t("faq.tag")}
          </div>
          <h2
            className="mt-4 text-white"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            {t("faq.title")}
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 rounded-xl border border-primary/15 overflow-hidden" style={{ background: "linear-gradient(180deg, rgba(10,18,36,0.6), rgba(6,11,24,0.4))" }}>
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`i${i}`}
              className="border-0 animate-fade-up group"
              style={{ borderBottom: i === faqs.length - 1 ? "none" : "1px solid rgba(99,102,241,0.15)", animationDelay: `${i * 40}ms` }}
            >
              <AccordionTrigger
                className="text-left hover:no-underline px-5 py-5 [&>svg]:hidden [&[data-state=open]>span.faq-icon]:rotate-45 hover:bg-primary/[0.04] transition-colors"
                style={{ color: "#E2E8F0", fontSize: 16, fontWeight: 600 }}
              >
                <span className="flex-1 pr-4 flex items-center gap-3">
                  <span className="text-[10px] font-mono text-primary/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {f.q}
                </span>
                <span
                  className="faq-icon shrink-0 transition-transform duration-300 text-xl leading-none size-7 rounded-md grid place-items-center"
                  style={{ color: "hsl(var(--primary))", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}
                >
                  +
                </span>
              </AccordionTrigger>
              <AccordionContent style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
