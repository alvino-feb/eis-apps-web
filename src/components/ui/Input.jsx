export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="mb-4">
      {label && <label className="text-sm text-gray-600">{label}</label>}

      <input
        {...props}
        className={`w-full border rounded px-3 py-2 mt-1 focus:ring-2 ${
          error ? "border-red-500" : "focus:ring-gray-300"
        }`}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}