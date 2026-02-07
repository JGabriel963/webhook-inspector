import { createFileRoute } from "@tanstack/react-router";
import { Panel, Group, Separator } from "react-resizable-panels";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen bg-zinc-900">
      <Group orientation="horizontal" className="w-full h-full">
        <Panel defaultSize="20%" minSize="15%" maxSize="40%">
          sidebar
        </Panel>

        <Separator className="w-px bg-zinc-700 outline-none data-[separator=hover]:bg-zinc-600 transition-colors duration-150" />

        <Panel defaultSize="80%" minSize="60%">
          Main
        </Panel>
      </Group>
    </div>
  );
}
