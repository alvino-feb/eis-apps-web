export default function ActionMenuItem({
    icon,
    label,
    danger = false,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={` w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100
                ${danger
                    ? "text-red-600"
                    : "text-gray-700"}
            `}
        >
            {icon}
            {label}
        </button>
    );

}