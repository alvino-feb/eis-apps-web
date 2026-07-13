export default function TableSkeleton({
  columns = 5,
  rows = 5,
}) {
  return Array.from({ length: rows }).map(
    (_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({
          length: columns,
        }).map((_, colIndex) => (
          <td
            key={colIndex}
            className="
              px-4
              py-3
            "
          >
            <div
              className="
                h-4
                rounded
                bg-gray-200
                animate-pulse
              "
            />
          </td>
        ))}
      </tr>
    )
  );
}