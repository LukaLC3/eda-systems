import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const DemoApp = lazy(() =>
  import("@/components/demo/DemoApp").then((m) => ({ default: m.DemoApp })),
);

export const Route = createFileRoute("/demo")({
  component: DemoPage,
  head: () => ({
    meta: [
      { title: "EDA Systems — Interactieve Demo" },
    ],
  }),
});

function DemoPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060D1A' }} />}>
      <DemoApp />
    </Suspense>
  );
}
