export default function DataTableHeader({
    columns,
}) {

    return (
        <thead className="sticky top-0 bg-gray-50 z-10">
            <tr>
                {
                    columns.map(col=>(
                        <th
                            key={col.key}
                            className={`
                                px-4
                                py-1
                                text-left
                                text-sm
                                font-semibold
                                border-b
                                whitespace-nowrap
                                ${col.headerClassName ?? ""}
                            `}
                            style={{
                                width:col.width,
                                minWidth:col.minWidth,
                                maxWidth:col.maxWidth,
                            }}
                        >
                            {col.title}
                        </th>
                    ))
                }
            </tr>
        </thead>
    );
}