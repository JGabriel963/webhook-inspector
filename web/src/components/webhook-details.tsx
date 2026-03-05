import { useSuspenseQuery } from "@tanstack/react-query";
import { webhookDetailsSchema } from "../http/schemas/webhooks";
import { WebhookDetailHeader } from "./webhook-detail-header";
import { SectionTitle } from "./section-title";
import { SectionDataTable } from "./section-data-table";
import { CodeBlock } from "./ui/code-block";

interface WebhookDetailsProps {
  id: string;
}

export function WebhookDetails({ id }: WebhookDetailsProps) {
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

  const { data } = useSuspenseQuery({
    queryKey: ["webhook", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/api/webhooks/${id}`);

      const data = await response.json();

      return webhookDetailsSchema.parse(data);
    },
  });

  const overviewData = [
    {
      key: "Method",
      value: data.method,
    },
    {
      key: "Status Code",
      value: data.statusCode.toString(),
    },
    {
      key: "Content-Type",
      value: data.contentType || "aplication/json",
    },
    {
      key: "Content-Length",
      value: `${data.contentLength || 0} bytes`,
    },
  ];

  const headers = Object.entries(data.headers).map(([key, value]) => ({
    key,
    value: String(value),
  }));

  const queryParams = Object.entries(data.queryParams || {}).map(
    ([key, value]) => ({
      key,
      value: String(value),
    }),
  );

  return (
    <div className="flex h-full flex-col">
      <WebhookDetailHeader
        method={data.method}
        pathname={data.pathname}
        ip={data.ip}
        createdAt={data.createdAt}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <SectionTitle>Request Overview</SectionTitle>
            <SectionDataTable data={overviewData} />
          </div>

          {queryParams.length > 0 && (
            <div className="space-y-4">
              <SectionTitle>Query Parameters</SectionTitle>
              <SectionDataTable data={queryParams} />
            </div>
          )}

          <div className="space-y-4">
            <SectionTitle>Headers</SectionTitle>
            <SectionDataTable data={headers} />
          </div>

          {!!data.body && (
            <div className="space-y-4">
              <SectionTitle>Request Body</SectionTitle>
              <CodeBlock code={data.body} language="json" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
