import { useEffect, useState } from "react";

export default function SampleTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // dummy data
    setData([
      { id: 1, name: "John", email: "john@mail.com" },
      { id: 2, name: "Jane", email: "jane@mail.com" },
      { id: 3, name: "Michael", email: "michael@mail.com" },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Sample Table</h1>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}