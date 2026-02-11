import { createFileRoute } from "@tanstack/react-router";
import { Panel, Group, Separator } from "react-resizable-panels";
import { Sidebar } from "../components/sidebar";
import { WebhookDetailHeader } from "../components/webhook-detail-header";
import { SectionTitle } from "../components/section-title";
import { SectionDataTable } from "../components/section-data-table";
import { CodeBlock } from "../components/ui/code-block";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const overviewData = [
    {
      key: "Method",
      value: "POST",
    },
    {
      key: "Status Code",
      value: "200",
    },
    {
      key: "Content-Type",
      value: "application/json",
    },
    {
      key: "Content-Length",
      value: "1234",
    },
  ];

  const code = `{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John Doe",
  "email": "[EMAIL_ADDRESS]",
  "age": 30,
  "isStudent": false,
  "courses": [
    {
      "id": "cs101",
      "title": "Introduction to Computer Science",
      "credits": 3
    },
    {
      "id": "math202",
      "title": "Calculus II",
      "credits": 4
    }
  ],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zip": "12345"
  },
  "metadata": null,
  "isActive": true,
  "createdAt": "2023-10-27T10:00:00Z",
  "updatedAt": "2023-10-27T10:00:00Z"
}`.trim();

  return (
    <div className="h-screen bg-zinc-900">
      <Group orientation="horizontal" className="w-full h-full">
        <Panel defaultSize="20%" minSize="15%" maxSize="40%">
          <Sidebar />
        </Panel>

        <Separator className="w-px bg-zinc-700 outline-none data-[separator=hover]:bg-zinc-600 transition-colors duration-150" />

        <Panel defaultSize="80%" minSize="60%">
          <div className="flex h-full flex-col">
            <WebhookDetailHeader />

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <SectionTitle>Request Overview</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>

                <div className="space-y-4">
                  <SectionTitle>Query Parameters</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>

                <div className="space-y-4">
                  <SectionTitle>Headers</SectionTitle>
                  <SectionDataTable data={overviewData} />
                </div>

                <div className="space-y-4">
                  <SectionTitle>Request Body</SectionTitle>
                  <CodeBlock code={code} language="json" />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Group>
    </div>
  );
}
