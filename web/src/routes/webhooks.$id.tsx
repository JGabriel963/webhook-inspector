import { createFileRoute } from "@tanstack/react-router";
import { WebhookDetails } from "../components/webhook-details";
import { Suspense } from "react";
import { Spinner } from "../components/spinner";

export const Route = createFileRoute("/webhooks/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <WebhookDetails id={id} />
    </Suspense>
  );
}
