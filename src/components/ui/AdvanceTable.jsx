import { useState, useMemo } from "react";

export default function TableAdvanced({ columns, data }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const pageSize = 5;

  // 🔍 FILTER
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // 🔃 SORT
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="bg-white p-4 rounded border shadow-sm">
      {/* 🔍 Search */}
      <div className="mb-4 flex justify-between">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      {/* 📊 Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 text-left cursor-pointer"
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}