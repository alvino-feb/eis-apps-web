export default function FormField({
  label,
  error,
  children,
  required = false,
}) {

  return (

    <div className="space-y-1">

      <label
        className="
          text-sm
          font-medium
          text-gray-700
        "
      >

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      {children}

      {error && (
        <div
          className="
            text-xs
            text-red-500
          "
        >
          {error}
        </div>
      )}

    </div>

  );

}