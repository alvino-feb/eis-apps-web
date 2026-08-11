import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Pagination({
    page = 1,
    limit = 10,
    total = 0,
    totalPages = 1,
    onPageChange,
    onLimitChange,
}) {
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit,total);
    const pages = [];
    const windowSize = 2;
    let first = Math.max(1,page - windowSize);
    let last = Math.min(totalPages, page + windowSize);

    if (first > 1) {
        pages.push(1);
        if (first > 2) {
            pages.push("...");
        }
    }
    for (
        let i = first;
        i <= last;
        i++
    ) {
        pages.push(i);
    }

    if (last < totalPages) {
        if (
            last <
            totalPages - 1
        ) {
            pages.push("...");
        }
        pages.push(totalPages);
    }

    return (
        <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="text-sm text-gray-500">
                Showing
                <span className="font-medium">
                    {" "}
                    {start}
                </span>
                -
                <span className="font-medium">
                    {end}
                </span>
                {" "}of{" "}
                <span className="font-medium">
                    {total}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm">
                        Rows
                    </span>
                    <select
                        value={limit}
                        onChange={(e)=>
                            onLimitChange(
                                Number(e.target.value)
                            )
                        }
                    >
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        disabled={page === 1}
                        onClick={() =>
                            onPageChange?.(
                                page - 1
                            )
                        }
                        className="rounded border p-1 disabled:opacity-40"
                    >
                        <ChevronLeft size={16}/>
                    </button>
                    {
                        pages.map((p,idx)=>
                            p==="..."
                            ?
                            <span
                                key={idx}
                                className="px-2"
                            >
                                ...
                            </span>
                            :
                            <button
                                key={p}
                                onClick={() =>
                                    onPageChange?.(
                                        p
                                    )
                                }
                                className={`min-w-8 rounded border px-2 py-1 text-sm
                                    ${
                                        p===page
                                        ?
                                        "bg-blue-600 text-white"
                                        :
                                        "hover:bg-gray-100"
                                    }
                                `}
                            >
                                {p}
                            </button>
                        )
                    }
                    <button
                        disabled={page===totalPages}
                        onClick={() =>
                            onPageChange?.(
                                page+1
                            )
                        }
                        className="rounded border p-1 disabled:opacity-40"
                    >
                        <ChevronRight size={16}/>
                    </button>
                </div>
            </div>
        </div>
    );
}