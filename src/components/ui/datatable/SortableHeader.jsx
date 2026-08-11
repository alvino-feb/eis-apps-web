import {
    ChevronUp,
    ChevronDown,
    ChevronsUpDown,
} from "lucide-react";
export default function SortableHeader({
    column,
    sortBy,
    sortDirection,
    onSortChange,
}) {
    const sortable = column.sortable;
    const active = sortBy === column.key;

    const handleClick = () => {
        if (!sortable) return;
        let direction = "asc";
        if (
            active &&
            sortDirection === "asc"
        ) {
            direction = "desc";
        }
        onSortChange?.(
            column.key,
            direction
        );
    };

    const renderIcon = () => {
        if (!sortable) return null;
        if (!active) {
            return (
                <ChevronsUpDown
                    size={14}
                    className="text-gray-400"
                />
            );
        }

        return sortDirection === "asc"
            ? (
                <ChevronUp
                    size={14}
                    className="text-blue-600"
                />
            )
            : (
                <ChevronDown
                    size={14}
                    className="text-blue-600"
                />
            );

    };

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                items-center
                gap-1
                ${sortable
                    ? "cursor-pointer select-none"
                    : ""
                }
            `}
        >
            <span>
                {column.title}
            </span>
            {renderIcon()}
        </div>
    );
}