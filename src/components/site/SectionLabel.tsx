export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 uppercase"
      style={{ color: "#2563EB", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}
    >
      <span aria-hidden style={{ opacity: 0.7 }}>⌐</span>
      <span>{children}</span>
      <span aria-hidden style={{ opacity: 0.7 }}>¬</span>
    </div>
  );
}
