import TreeCell from "./TreeCell";

export default function DataTableRow({
    row,
    columns,
    tree = false,
    level = 0,
    expanded = false,
    hasChildren = false,
    onToggle,
    onRowClick,
}) {
    return (
        <tr
            onClick={() => onRowClick?.(row)}
            className="border-b hover:bg-gray-50 transition-colors"
        >
            {
                columns.map((col) => {
                    // ==========================
                    // Tree Column
                    // ==========================
                    if (tree && col.tree) {
                        return (
                            <td
                                key={col.key}
                                style={{
                                    width: col.width,
                                    minWidth: col.minWidth,
                                    maxWidth: col.maxWidth,
                                }}
                                className="px-3 py-2"
                            >
                                <TreeCell
                                    row={row}
                                    level={level}
                                    expanded={expanded}
                                    hasChildren={hasChildren}
                                    onToggle={onToggle}
                                >
                                    {
                                        col.render
                                            ? col.render(row)
                                            : row[col.key]
                                    }
                                </TreeCell>
                            </td>
                        );
                    }

                    // ==========================
                    // Normal Column
                    // ==========================
                    return (
                        <td
                            key={col.key}
                            style={{
                                width: col.width,
                                minWidth: col.minWidth,
                                maxWidth: col.maxWidth,
                            }}
                            className="px-3 py-2"
                        >
                            {
                                col.render
                                    ? col.render(row)
                                    : row[col.key]
                            }
                        </td>
                    );
                })
            }
        </tr>
    );
}