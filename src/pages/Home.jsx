import { Card, Table } from "../components/ui";

export default function Home() {
  // 🔢 dummy KPI
  const stats = [
    { title: "Users", value: 120 },
    { title: "Orders", value: 75 },
    { title: "Revenue", value: "$12K" },
    { title: "Active Sessions", value: 32 },
  ];

  // 📊 table sample
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "status", label: "Status" },
  ];

  const data = [
    { id: 1, name: "John", status: "Active" },
    { id: 2, name: "Jane", status: "Inactive" },
    { id: 3, name: "Michael", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-700">
        Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <Card key={i}>
            <div className="text-sm text-gray-500">
              {item.title}
            </div>
            <div className="text-2xl font-bold">
              {item.value}
            </div>
          </Card>
        ))}
      </div>

      {/* TABLE PREVIEW */}
      <Card title="Recent Users">
        <Table columns={columns} data={data} />
      </Card>
    </div>
  );
}