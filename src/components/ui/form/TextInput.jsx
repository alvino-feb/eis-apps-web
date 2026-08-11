export default function TextInput({
    className = "",
    error = false,
    disabled = false,
    ...props
}) {
    return (
        <input
            {...props}
            disabled={disabled}
            className={`
                w-full
                rounded-md
                border
                px-3
                py-2
                text-sm
                outline-none
                transition-colors

                ${
                    error
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                }

                ${
                    disabled
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-white"
                }

                ${className}
            `}
        />
    );
}