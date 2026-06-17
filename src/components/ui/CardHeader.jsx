export default function CardHeader({
  title,
  description,
  action,
}) {
  return (
    <div
      className="
        px-5
        py-4
        border-b
        flex
        justify-between
        items-start
      "
    >
      <div>

        <h3
          className="
            font-semibold
            text-gray-900
          "
        >
          {title}
        </h3>

        {description && (
          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            {description}
          </p>
        )}

      </div>

      {action}

    </div>
  );
}