import DataTableSkeleton from "../skeletons/DataTableSkeleton";

export default function DataTable({
  columns = [],
  data = [],
  onRowClick,
  selectedRowId,
  loading = false
}) {

  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeData = Array.isArray(data) ? data : [];

  const hasData = safeData.length > 0;

  return (
    <table className="w-full">

      <thead> 
        <tr>
          {safeColumns.map((col) => (
            <th key={col.key}
                className={col.headerClassName}
                style={{
                width: col.width,
                minWidth: col.minWidth,
                maxWidth: col.maxWidth,
                // className: col.headerClassName
              }}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>

        {loading && (
          <DataTableSkeleton
            columns={columns.length}
            rows={5}
          />
        )}

        {!hasData && (
          <tr>
            <td
              colSpan={safeColumns.length || 1}
              className="py-10 text-center text-gray-500"
            >
              No records found
            </td>
          </tr>
        )}

        {hasData &&
          safeData.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex} 
              onClick={() => onRowClick?.(row)}
              className="cursor-pointer">
              {safeColumns.map((col) => (
                <td key={`${rowIndex}-${col.key}`}
                    className={col.cellClassName}
                  style={{
                    width: col.width,
                    minWidth: col.minWidth,
                    maxWidth: col.maxWidth,
                    // className: col.cellClassName
                  }}
                >
                  {col.render
                    ? col.render(row)
                    : row?.[col.key]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>

    </table>
  );
}