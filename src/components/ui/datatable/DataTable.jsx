import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";
import Pagination from "./Pagination";

export default function DataTable({
    columns = [],
    data = [],
    loading = false,
    tree = false,
    rowKey = "id",
    childrenKey = "children",
    defaultExpandAll = false,
    emptyMessage = "No records found",
    onRowClick,
    height=550,
    page=1,
    limit=20,
    total=0,
    totalPages=1,
    onPageChange,
    onLimitChange,
    sortBy,
    sortDirection,
    onSortChange,
    minWidth = 1000,
    horizontalScroll = true,
}) {
    return (
        <div className="w-full">
            {/* =====================================================
                TABLE SCROLL CONTAINER
            ===================================================== */}
            <div
                className={
                    horizontalScroll
                        ? "w-full overflow-x-auto"
                        : "w-full overflow-x-hidden"
                }
            >
                <div
                    style={{
                        minWidth: `${minWidth}px`,
                    }}
                >
                    <div className="rounded-lg border bg-white overflow-hidden">
                        <div className="overflow-auto"  
                        style={{
                            maxHeight: height
                        }}>
                            <table className="min-w-full border-collapse">
                                <DataTableHeader
                                    columns={columns}
                                    sortBy={sortBy}
                                    sortDirection={sortDirection}
                                    onSortChange={onSortChange}
                                />
                                <DataTableBody
                                    columns={columns}
                                    data={data}
                                    loading={loading}
                                    tree={tree}
                                    rowKey={rowKey}
                                    childrenKey={childrenKey}
                                    defaultExpandAll={
                                        defaultExpandAll
                                    }
                                    emptyMessage={
                                        emptyMessage
                                    }
                                    onRowClick={onRowClick}
                                />
                            </table>
                        </div>
                        <Pagination 
                            page={page}
                            limit={limit}
                            total={total}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            onLimitChange={onLimitChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}