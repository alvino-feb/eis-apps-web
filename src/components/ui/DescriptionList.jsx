export default function DescriptionList({
  items = [],
  columns = 2,
}) {
  return (
    <div
      className={`
        grid
        gap-5
        md:grid-cols-${columns}
      `}
    >
      {items.map((item) => (
        <div key={item.label}>

          <div
            className="
              text-xs
              text-gray-500
              mb-1
            "
          >
            {item.label}
          </div>

          <div
            className="
              font-medium
              text-gray-900
            "
          >
            {item.value || "-"}
          </div>

        </div>
      ))}
    </div>
  );
}