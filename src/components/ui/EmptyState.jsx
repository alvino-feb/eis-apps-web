export default function EmptyState({
  title = "No Data",
  description =
    "No records found",
}) {
  return (
    <div
      className="
        p-10
        text-center
      "
    >

      <div
        className="
          font-medium
          text-gray-700
        "
      >
        {title}
      </div>

      <div
        className="
          text-sm
          text-gray-500
          mt-1
        "
      >
        {description}
      </div>

    </div>
  );
}