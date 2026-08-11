export default function Checkbox({
    label,
    checked = false,
    onChange,
    disabled = false,
}) {
    return (
        <label className="inline-flex items-center gap-2 cursor-pointer">

            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                className="
                    h-4
                    w-4
                    rounded
                    border-gray-300
                    text-blue-600
                    focus:ring-blue-500
                "
            />

            {label && (
                <span className="text-sm">
                    {label}
                </span>
            )}

        </label>
    );
}