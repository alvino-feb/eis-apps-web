export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      className="
        bg-white
        border
        rounded-lg
        p-4
      "
    >
      <div
        className="
          flex
          justify-between
          items-start
        "
      >
        <div>

          <div
            className="
              text-sm
              text-gray-500
            "
          >
            {title}
          </div>

          <div
            className="
              text-2xl
              font-semibold
              mt-2
            "
          >
            {value}
          </div>

        </div>

        {icon}
      </div>
    </div>
  );
}