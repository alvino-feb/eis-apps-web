import DataTableSkeleton from "../skeletons/DataTableSkeleton";
import { Inbox } from "lucide-react";

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
            rows={2}
          />
        )}

        {!loading && !hasData && (
          <tr>
            <td colSpan={safeColumns.length || 1} className="py-6"
            >
              <div className="flex flex-col items-center gap-3 text-gray-500">
                        <Inbox
                            size={24}
                        />
                        <p>
                            No records found
                        </p>
                    </div>
            </td>
          </tr>
        )}

        {hasData &&
          safeData.map((row, rowIndex) => (
            <tr 
              key={row.id ?? rowIndex} 
              onClick={() => onRowClick?.(row)}
              className={`
                  cursor-pointer border-b transition-colors
                  ${
                      selectedRowId === row.id
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                  }
              `}
            >
              {safeColumns.map((col) => (
                <td 
                  key={`${rowIndex}-${col.key}`}
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