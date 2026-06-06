import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const WelcomeLanding = lazy(() =>
  import("@/components/landing/WelcomeLanding").then((m) => ({ default: m.WelcomeLanding })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "EDA Systems — Your business on autopilot" },
      { name: "description", content: "Welcome to EDA Systems. AI automation engineered for your industry. Choose your sector and discover the system built for you." },
      { property: "og:title", content: "EDA Systems — Your business on autopilot" },
      { property: "og:description", content: "AI automation engineered for your industry. Choose your sector." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#05060d]" />}>
      <WelcomeLanding />
    </Suspense>
  );
}
