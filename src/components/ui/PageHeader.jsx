export default function PageHeader({
  title,
  description,
  children,
}) {
  return (
    <div className="mb-6">

      <div className="flex items-start justify-between">

        <div>

          <h1
            className="
              text-xl
              font-semibold
              text-gray-900
            "
          >
            {title}
          </h1>

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

        {children}

      </div>

    </div>
  );
}