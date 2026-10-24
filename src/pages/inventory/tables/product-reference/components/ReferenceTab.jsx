import {
    Pencil,
    Trash2,
    Plus,
    RefreshCw,
} from "lucide-react";

import {
    CardHeader,
    Toolbar,
    SearchInput,
    DataTable,
    Button,
    StatusBadge,
} from "../../../../../components/ui";

export default function ReferenceTab({
    title,
    description,

    search,
    onSearchChange,
    searchPlaceholder,

    data = [],
    loading = false,

    onAdd,
    onEdit,
    onDelete,
    onRefresh,
}) {

    const filteredData = Array.isArray(data)
        ? data.filter((item) => {

            const keyword =
                search.toLowerCase();

            return (
                item.code
                    ?.toLowerCase()
                    .includes(keyword) ||
                item.name
                    ?.toLowerCase()
                    .includes(keyword)
            );
        })
        : [];

    const columns = [
        {
            key: "code",
            title: "Code",
        },

        {
            key: "name",
            title: "Name",
        },

        {
            key: "description",
            title: "Description",
        },

        {
            key: "isActive",
            title: "Status",

            render: (row) => (
                <StatusBadge
                    active={row.isActive}
                />
            ),
        },

        {
            key: "action",
            title: "Action",

            render: (row) => (
                <div className="flex gap-1">

                    <button
                        onClick={() =>
                            onEdit?.(row)
                        }
                        className="
                            p-2 rounded-md
                            hover:bg-blue-50
                            text-blue-600
                        "
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        onClick={() =>
                            onDelete?.(row)
                        }
                        className="
                            p-2 rounded-md
                            hover:bg-red-50
                            text-red-600
                        "
                    >
                        <Trash2 size={16} />
                    </button>

                </div>
            ),
        },
    ];

    return (
        <>

            <CardHeader
                title={title}
                description={description}

                action={
                    <Button
                        onClick={onAdd}
                    >
                        <Plus size={14} />
                        <span className="ml-1">
                            Add
                        </span>
                    </Button>
                }
            />

            <Toolbar

                left={
                    <SearchInput
                        value={search}
                        onChange={(e) =>
                            onSearchChange(
                                e.target.value
                            )
                        }
                        placeholder={
                            searchPlaceholder
                        }
                    />
                }

                right={
                    <Button
                        variant="secondary"
                        onClick={onRefresh}
                    >
                        <RefreshCw
                            size={14}
                        />
                    </Button>
                }

            />

            <DataTable
                columns={columns}
                data={filteredData}
                loading={loading}
                emptyMessage={
                    `No ${title.toLowerCase()} found`
                }
            />

        </>
    );
}