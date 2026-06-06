import logo from "@/assets/logo.png";

export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ring-1 ring-indigo-400/20 bg-[#0a0a1a] transition-shadow duration-300 hover:[box-shadow:0_0_18px_rgba(79,70,229,0.65),0_0_0_1px_rgba(129,140,248,0.4)] ${className}`}
      style={{ width: size, height: size, borderRadius: "50%", boxShadow: "0 0 0 1px rgba(79,70,229,0.18), 0 4px 14px -6px rgba(79,70,229,0.4)" }}
    >

      <img
        src={logo}
        alt="EDA Systems"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ objectPosition: "center", transform: "scale(1.05)", transformOrigin: "center" }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export function WordmarkLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="EDA Systems — Smart Automation for Real Estate Agents"
      className={`block max-w-full h-auto ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}
