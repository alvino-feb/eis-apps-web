export default function TextArea({
    rows = 3,
    className = "",
    ...props
}) {
    return (
        <textarea
            rows={rows}
            {...props}
            className={`
                w-full
                rounded-md
                border
                border-gray-300
                px-3
                py-2
                text-sm
                focus:border-blue-500
                focus:outline-none
                resize-none
                ${className}
            `}
        />
    );
}