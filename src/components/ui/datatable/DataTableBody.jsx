import { useState } from "react";
import {
    ChevronRight,
    ChevronDown,
    Inbox,
} from "lucide-react";

/**
 * =========================================================
 * SKELETON ROW
 * =========================================================
 */
function SkeletonRow({ columns }) {
    return (
        <tr className="border-b">
            {columns.map((column, index) => (
                <td
                    key={column.key}
                    className="px-4 py-3"
                >
                    <div className="flex items-center gap-2">
                        {index === 0 && (
                            <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                        )}

                        <div
                            className={`
                                h-4 rounded bg-gray-200 animate-pulse
                                ${
                                    index === 0
                                        ? "w-32"
                                        : "w-24"
                                }
                            `}
                        />
                    </div>
                </td>
            ))}
        </tr>
    );
}

/**
 * =========================================================
 * ROW STYLE BY DEPTH
 * =========================================================
 */
function getRowStyle(depth) {
    if (depth === 0) {
        return {
            text: "font-normal text-gray-700",
            background: "",
        };
    }

    if (depth === 1) {
        return {
            text: "font-normal text-gray-700",
            background: "",
        };
    }

    if (depth === 2) {
        return {
            text: "font-normal text-gray-700",
            background: "",
        };
    }

    return {
        text: "font-normal text-gray-700",
        background: "",
    };
}

/**
 * =========================================================
 * DATA TABLE BODY
 * =========================================================
 */
export default function DataTableBody({
    columns = [],
    data = [],

    loading = false,

    tree = false,
    rowKey = "id",
    childrenKey = "children",

    defaultExpandAll = false,

    emptyMessage = "No data found",

    onRowClick,
}) {
    const [expanded, setExpanded] = useState({});

    /**
     * =====================================================
     * TOGGLE TREE
     * =====================================================
     */
    const toggle = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */
    if (loading) {
        return (
            <tbody>
                {Array.from({ length: 2 }).map(
                    (_, index) => (
                        <SkeletonRow
                            key={index}
                            columns={columns}
                        />
                    )
                )}
            </tbody>
        );
    }

    /**
     * =====================================================
     * EMPTY
     * =====================================================
     */
    if (
        !Array.isArray(data) ||
        data.length === 0
    ) {
        return (
            <tbody>
                <tr>
                    <td
                        colSpan={columns.length}
                        className="px-4 py-12"
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                <Inbox size={24} />
                            </div>

                            <p className="mt-3 text-sm font-medium text-gray-500">
                                {emptyMessage}
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }

    /**
     * =====================================================
     * RENDER TREE
     * =====================================================
     */
    const renderRows = (
        items,
        depth = 0
    ) => {
        if (!Array.isArray(items)) {
            return [];
        }

        return items.flatMap((row) => {
            const id = row?.[rowKey];

            /**
             * -------------------------------------------------
             * CHILDREN
             * -------------------------------------------------
             */
            const children =
                row?.[childrenKey] ?? [];

            const hasChildren =
                tree &&
                Array.isArray(children) &&
                children.length > 0;

            /**
             * -------------------------------------------------
             * EXPANDED
             * -------------------------------------------------
             */
            const isExpanded =
                defaultExpandAll ||
                expanded[id] === true;

            /**
             * -------------------------------------------------
             * STYLE
             * -------------------------------------------------
             */
            const rowStyle =
                getRowStyle(depth);

            /**
             * =================================================
             * CURRENT ROW
             * =================================================
             */
            const renderedRow = (
                <tr
                    key={id}
                    onClick={() => {
                        if (onRowClick) {
                            onRowClick(row);
                        }
                    }}
                    className={`
                        border-b
                        transition-colors
                        ${rowStyle.background}
                        ${
                            onRowClick
                                ? "cursor-pointer hover:bg-gray-50"
                                : "hover:bg-gray-50"
                        }
                    `}
                >
                    {columns.map(
                        (
                            column,
                            columnIndex
                        ) => {
                            const value =
                                row?.[
                                    column.key
                                ];

                            return (
                                <td
                                    key={column.key}
                                    className={`
                                        px-4 py-1 text-sm
                                        ${rowStyle.text}
                                    `}
                                >
                                    <div
                                        className={
                                            columnIndex === 0
                                                ? "flex items-center"
                                                : ""
                                        }
                                        style={
                                            columnIndex === 0
                                                ? {
                                                    paddingLeft:
                                                        depth * 24,
                                                }
                                                : undefined
                                        }
                                    >
                                        {/* =================================================
                                            TREE EXPAND / COLLAPSE
                                        ================================================= */}
                                        {columnIndex === 0 &&
                                            tree && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        /*
                                                         * Jangan sampai
                                                         * click tombol expand
                                                         * menjalankan onRowClick
                                                         */
                                                        e.stopPropagation();

                                                        if (hasChildren) {
                                                            toggle(id);
                                                        }
                                                    }}
                                                    className={`
                                                        mr-2
                                                        flex
                                                        h-5
                                                        w-5
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded
                                                        ${
                                                            hasChildren
                                                                ? `
                                                                    cursor-pointer
                                                                    hover:bg-gray-100
                                                                `
                                                                : "invisible"
                                                        }
                                                    `}
                                                >
                                                    {isExpanded ? (
                                                        <ChevronDown
                                                            size={16}
                                                        />
                                                    ) : (
                                                        <ChevronRight
                                                            size={16}
                                                        />
                                                    )}
                                                </button>
                                            )}

                                        {/* =================================================
                                            CELL CONTENT
                                        ================================================= */}
                                        {column.render
                                            ? column.render(row)
                                            : value}
                                    </div>
                                </td>
                            );
                        }
                    )}
                </tr>
            );

            /**
             * =================================================
             * CHILD ROWS
             * =================================================
             */
            const childRows =
                hasChildren &&
                isExpanded
                    ? renderRows(
                        children,
                        depth + 1
                    )
                    : [];

            /**
             * =================================================
             * RETURN CURRENT + CHILDREN
             * =================================================
             */
            return [
                renderedRow,
                ...childRows,
            ];
        });
    };

    /**
     * =====================================================
     * RENDER
     * =====================================================
     */
    return (
        <tbody>
            {renderRows(data)}
        </tbody>
    );
}