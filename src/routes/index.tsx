import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "https://web-production-1ec40.up.railway.app", statusCode: 302 });
  },
  component: () => null,
});
