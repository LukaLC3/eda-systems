import { Button } from "@/components/ui/button";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useT } from "@/i18n/LanguageProvider";



export function Footer() {
  const { t } = useT();
  const cols = [
    { t: t("ft.col.product"), l: [t("nav.benefits"), t("nav.how"), t("nav.pricing"), t("nav.faq")] },
    { t: t("ft.col.company"), links: [{ label: "Over ons", to: "/over-ons" as const }, { label: t("ft.contact"), href: "#contact" }] },
    { t: t("ft.col.legal"), l: [t("ft.privacy"), t("ft.terms"), t("ft.cookies"), t("ft.gdpr")] },
  ];
  return (
    <footer className="relative border-t border-primary/15 bg-surface/40 overflow-hidden">
      <div className="absolute inset-0 indigo-mesh opacity-25 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-6 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                background: "#0A1224",
                border: "1px solid #1E3A8A",
              }}
            >
              <Logo size={24} />
            </div>
            <span className="font-display font-semibold tracking-tight">EDA<span className="text-gradient-brand"> Systems</span></span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground max-w-xs">{t("ft.tagline")}</p>
          <Button variant="hero" size="sm" className="rounded-full mt-5" asChild>
            <a href="#contact">{t("cta.book")}</a>
          </Button>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <a href="#" className="size-9 rounded-md border border-primary/20 grid place-items-center hover:border-primary/50 hover:text-primary transition-colors"><Linkedin className="size-4" /></a>
            <a href="mailto:info@edasystems.be" className="size-9 rounded-md border border-primary/20 grid place-items-center hover:border-primary/50 hover:text-primary transition-colors"><Mail className="size-4" /></a>
          </div>
        </div>

        <div>
          <div className="text-xs font-mono-tech font-semibold uppercase tracking-wider text-primary/80">EDA Systems</div>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5"><MapPin className="size-3.5 text-primary" />{t("ft.location")}</li>
            <li><a href="mailto:info@edasystems.be" className="hover:text-foreground transition-colors">info@edasystems.be</a></li>
          </ul>
        </div>

        {cols.map(c => {
          const links = "links" in c ? c.links : undefined;
          const flat = "l" in c ? c.l : undefined;
          return (
            <div key={c.t}>
              <div className="text-xs font-mono-tech font-semibold uppercase tracking-wider text-primary/80">{c.t}</div>
              <ul className="mt-4 space-y-2.5">
                {links
                  ? links.map((item) => (
                      <li key={item.label}>
                        {"to" in item ? (
                          <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</Link>
                        ) : (
                          <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item.label}</a>
                        )}
                      </li>
                    ))
                  : flat?.map(li => (
                      <li key={li}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{li}</a></li>
                    ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom identity bar — between columns and copyright */}
      <div
        className="relative"
        style={{
          background: "#040810",
          borderTop: "1px solid #0F2040",
          borderBottom: "1px solid #0F2040",
          padding: "16px 0",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-3">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              display: "grid",
              placeItems: "center",
              background: "#0A1224",
              border: "1px solid #1E3A8A",
              boxShadow: "0 0 24px rgba(37,99,235,0.25)",
              margin: "0 auto",
            }}
          >
            <Logo size={40} />
          </div>
          <div
            className="text-center font-mono-tech"
            style={{ color: "#334155", fontSize: 11, letterSpacing: "0.06em" }}
          >
            EDA Systems · Product · Belgisch bedrijf · Juridisch
          </div>
        </div>


      </div>

      <div className="relative">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} EDA Systems — {t("ft.rights")}</div>
          <div className="font-mono-tech">{t("ft.madeFor")}</div>
        </div>
      </div>
    </footer>
  );
}
