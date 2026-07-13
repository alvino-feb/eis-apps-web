export default function SelectGrid({
  data = [],
  value,
  onChange,
  labelKey = "name",
  descriptionKey,
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-3
      "
    >
      {data.map((item) => (
        <button
          key={item.id}
          onClick={() =>
            onChange(item)
          }
          className={`
            border
            rounded-lg
            p-3
            text-left
            transition-all

            ${
              value === item.id
                ? `
                  border-blue-600
                  bg-blue-50
                `
                : `
                  hover:border-gray-400
                `
            }
          `}
        >
          <div
            className="
              font-medium
            "
          >
            {item[labelKey]}
          </div>

          {descriptionKey && (
            <div
              className="
                text-xs
                text-gray-500
                mt-1
              "
            >
              {
                item[
                  descriptionKey
                ]
              }
            </div>
          )}
        </button>
      ))}
    </div>
  );
}