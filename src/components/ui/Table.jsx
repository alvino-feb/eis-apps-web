export default function Table({ columns, data }) {
  return (
    <table className="w-full border bg-white rounded">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="p-2 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map((col) => (
              <td key={col.key} className="px-2 py-1">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}