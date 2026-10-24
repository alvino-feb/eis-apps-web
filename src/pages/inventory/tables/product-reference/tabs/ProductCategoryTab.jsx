import { useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Pencil,
    Trash2,
    Plus,
    Loader2,
    RefreshCw,
} from "lucide-react";
import {
    CardHeader,
    Toolbar,
    SearchInput,
    DataTableV2,
    Modal,
    Button,
    StatusBadge,
    FilterPanel,
    TextInput,
    Checkbox,
    Select
} from "../../../../../components/ui";

import { useAuthStore } from "../../../../../store/authStore";
import { productReferenceStore } from "../product-reference.store";
import useToastStore from "../../../../../store/toastStore";
import { hasChanges } from "../../../../../common/helpers/object.js";
import { confirm } from "../../../../../common/helpers/confirm.js";

export default function ProductCategoryTab({
    search,
    onSearchChange,
}) {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);

    const [sortBy] = useState("name");
    const [sortOrder] = useState("asc");

    const [appliedSearch, setAppliedSearch] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [saving, setSaving] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const businessId = useAuthStore((state) => state.businessId);
    const businessName = useAuthStore((state) => state.businessName);

    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);

    const businessMemberId = selectedBusinessMember?.businessMemberId;

    const fetchCategory = productReferenceStore((state) => state.fetchCategory); 
    const createCategory = productReferenceStore((state) => state.createCategory);
    const updateCategory = productReferenceStore((state) => state.updateCategory);
    const deleteCategory = productReferenceStore((state) => state.deleteCategory);
    const category = productReferenceStore((state) => state.category);
    const loading = productReferenceStore((state) => state.loading.category);

    /*
        * =========================================================
        * TOAST
        * =========================================================
    */
    const {
        showSuccess,
        showError,
        showWarning,
    } = useToastStore();

    /*
        * =========================================================
        * FORM
        * =========================================================
    */
    const initialValues = {
        code: "",
        name: "",
        description: "",
        parentId: null,
        level: 1,
        seqNo: 0,
        isActive: true,
    };

    const [form, setForm] = useState(
        initialValues
    );

    /*
        * =========================================================
        * FILTER
        * =========================================================
    */
    const [filters, setFilters] = useState({
        isActive: "",
    });

    const [appliedFilters, setAppliedFilters] =
        useState({
            isActive: "",
        });

    const filterFields = [
        {
            key: "isActive",
            label: "Status",
            type: "select",
            placeholder: "- Select -",
            options: [
                {
                    label: "Active",
                    value: true,
                },
                {
                    label: "Inactive",
                    value: false,
                },
            ],
        },
    ];

    /*
        * =========================================================
        * DATA
        * =========================================================
    */
    const rows = category?.data ?? [];

    const meta = category?.meta ?? {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
    };

    /*
        * =========================================================
        * FETCH
        * =========================================================
    */
    useEffect(() => {
        if (
            !businessId ||
            !businessMemberId
        ) {
            return;
        }

        const query = {
            businessId,
            businessMemberId,
            page,
            limit,
            search: appliedSearch,
            sortBy,
            sortOrder,
        };

        /*
         * Only send isActive when filter
         * actually has a value.
         */
        if (
            appliedFilters.isActive !== "" &&
            appliedFilters.isActive !==
                undefined &&
            appliedFilters.isActive !== null
        ) {
            query.isActive =
                appliedFilters.isActive;
        }

        fetchCategory(query);

    }, [
        businessId,
        businessMemberId,
        page,
        limit,
        appliedSearch,
        sortBy,
        sortOrder,
        appliedFilters,
        fetchCategory,
    ]);

    /*
        * =========================================================
        * SEARCH
        * =========================================================
        *
        * If you want Enter-only search, this can later be changed
        * to appliedSearch pattern like Warehouse.
    */

    /*
        * =========================================================
        * ADD
        * =========================================================
    */
    const handleAdd = () => {
        setEditingData(null);
        setOriginalData(null);

        setForm({
            ...initialValues,
        });

        setOpenModal(true);
    };

    /*
        * =========================================================
        * EDIT
        * =========================================================
    */
    const handleEdit = (row) => {
        setEditingData(row);
        setOriginalData(row);

        setForm({
            code: row.code ?? "",
            name: row.name ?? "",
            description: row.description ?? "",
            parentId: row.parentId ?? null,
            level: row.level ?? 1,
            seqNo: row.seqNo ?? 0,
            isActive: row.isActive ?? true,
        });

        setOpenModal(true);
    };

    /*
        * =========================================================
        * FORM CHANGE
        * =========================================================
    */
    const handleChange = (
        field,
        value
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    /*
        * =========================================================
        * CANCEL
        * =========================================================
    */
    const handleCancel = () => {
        setOpenModal(false);
        setEditingData(null);
        setOriginalData(null);

        setForm({
            ...initialValues,
        });
    };

    /*
        * =========================================================
        * SAVE
        * =========================================================
    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        /*
         * Basic validation
         */
        if (!form.code?.trim()) {
            showWarning("Code is required.");
            return;
        }

        if (!form.name?.trim()) {
            showWarning("Name is required.");
            return;
        }

        try {
            setSaving(true);

            if (editingData) {

                const changed =
                    hasChanges(
                        originalData,
                        form,
                        [
                            "code",
                            "name",
                            "description",
                            "parentId",
                            "level",
                            "seqNo",
                            "isActive",
                        ]
                    );

                if (!changed) {
                    showWarning(
                        "No changes detected."
                    );

                    setOpenModal(false);
                    return;
                }
                
                await updateCategory(
                    businessId,
                    businessMemberId,
                    editingData.id,
                    form
                );

                showSuccess(
                    "Product category updated successfully."
                );

            } else {
                               
                await createCategory(
                    businessId,
                    businessMemberId,
                    form
                );

                showSuccess(
                    "Product category created successfully."
                );
            }

            /*
             * Reload current page
             */

            await fetchCategory({
                businessId,
                businessMemberId,
                page,
                limit,
                search: appliedSearch || "",
                sortBy,
                sortOrder,
                ...(appliedFilters.isActive !==
                    "" &&
                appliedFilters.isActive !==
                    undefined
                    ? {
                        isActive:
                            appliedFilters.isActive,
                    }
                    : {}),
            });

            handleCancel();

        } catch (err) {
            // console.error(err);

            showError(
                err.response?.data?.message ??
                "Failed to save product category."
            );

        } finally {
            setSaving(false);
        }
    };

    /*
        * =========================================================
        * DELETE
        * =========================================================
    */
    const handleDelete = async (
        row
    ) => {
        const ok = await confirm({
            title: "Delete Product Category",
            message: `Delete "${row.code}" - ${row.name}?`,
            variant: "danger",
            confirmText: "Delete",
        });

        if (!ok) return;

        try {
            setDeletingId(row.id);
            await deleteCategory(
                businessId,
                businessMemberId,
                row.id
            );

            await fetchCategory({
                businessId,
                businessMemberId,
                page,
                limit,
                search: appliedSearch || "",
                sortBy,
                sortOrder,
            });

            showWarning(
                "Product category deleted."
            );
            setDeletingId(null);
        } catch (err) {
            // console.error(err);
            showError(
                err.response?.data?.message ??
                "Failed to delete product category."
            );
            setDeletingId(null);
        } finally {
            setDeletingId(null);
        }
    };

    /*
        * =========================================================
        * FILTER APPLY
        * =========================================================
    */
    const handleApplyFilter = () => {
        setAppliedFilters({
            ...filters,
        });

        setPage(1);
    };

    /*
        * =========================================================
        * FILTER RESET
        * =========================================================
    */
    const handleResetFilter = () => {
        const reset = {
            isActive: "",
        };

        setFilters(reset);
        setAppliedFilters(reset);

        setPage(1);
    };

    /*
        * =========================================================
        * REFRESH
        * =========================================================
    */
    const handleRefresh = async () => {
        try {
            setRefreshing(true);

            await fetchCategory({
                businessId,
                businessMemberId,
                page,
                limit,
                search: appliedSearch || "",
                sortBy,
                sortOrder,
                ...(appliedFilters.isActive !==
                    "" &&
                appliedFilters.isActive !==
                    undefined
                    ? {
                        isActive:
                            appliedFilters.isActive,
                    }
                    : {}),
            });
        } finally {
            setRefreshing(false);
        }
    };

    /*
        * =========================================================
        * TABLE
        * =========================================================
    */
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
            key: "level",
            title: "Level",
            width: 80,
        },
        // {
        //     key: "seqNo",
        //     title: "Seq",
        //     width: 80,
        // },
        {
            key: "isActive",
            title: "Status",
            render: (row) => (
                <StatusBadge
                    active={
                        row.isActive
                    }
                />
            ),
        },
        {
            key: "action",
            title: "Action",
            render: (row) => (
                <div className="flex gap-1">

                    <button
                        onClick={() => handleEdit(row)}
                        disabled={deletingId === row.id}
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                    >
                        <Pencil size={16}/>
                    </button>

                    <button
                        onClick={() => handleDelete(row)}
                        disabled={deletingId === row.id}
                        className="p-2 rounded-md hover:bg-red-50 text-red-600"
                    >
                        {deletingId === row.id ? (
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />
                        ) : (
                            <Trash2 size={16} />
                        )}
                    </button>

                </div>
            ),
        },
    ];

    /*
        * =========================================================
        * CATEGORIES
        * =========================================================
    */
    const flattenCategories = (
        items,
        result = []
    ) => {

        if (!Array.isArray(items)) {
            return result;
        }

        items.forEach((item) => {

            result.push({
                id: item.id,
                code: item.code,
                name: item.name,
                level: item.level,
                seqNo: item.seqNo,
                parentId: item.parentId ?? null,
            });

            if (
                Array.isArray(
                    item.children
                )
            ) {
                flattenCategories(
                    item.children,
                    result
                );
            }

        });

        return result;
    };


    const flatCategories = useMemo(() =>
            flattenCategories(
                rows
            ),
        [rows]
    );

    const parentOptions = useMemo(() => {

        const options = flatCategories
            .filter((item) =>
                Number(
                    item.level
                ) === 1
            )
            .filter((item) =>
                !editingData ||
                item.id !== editingData.id
            )
            .map((item) => ({
                label: `${item.code} - ${item.name}`,
                value: item.id,
            })
            );

        return [
            // {
            //     label:
            //         "",
            //     value: "",
            // },
            ...options,
        ];

    }, [
        flatCategories,
        editingData,
    ]);

    const getParent =
    (parentId) => {

        if (!parentId) {
            return null;
        }

        return flatCategories.find(
            (item) =>
                item.id === parentId
        ) ?? null;
    };

    const getNextRootSequence =
    () => {

        const rootCategories =
            flatCategories.filter(
                (item) =>
                    Number(
                        item.level
                    ) === 1
            );

        if (
            rootCategories.length === 0
        ) {
            return 1;
        }

        const maxSeq =
            Math.max(
                ...rootCategories.map(
                    (item) =>
                        Number(
                            item.seqNo
                        ) || 0
                )
            );

        return maxSeq + 1;
    };

    const getNextChildSequence = (parentId) => {

        if (!parentId) {
            return getNextRootSequence();
        }

        /**
         * Karena parent selection hanya
         * level 1, ambil semua child
         * langsung dari parent tersebut.
         */
        const children =
            rows.find(
                (item) =>
                    item.id === parentId
            )?.children ?? [];


        if (
            children.length === 0
        ) {
            return 1;
        }


        const maxSeq =
            Math.max(
                ...children.map(
                    (item) =>
                        Number(
                            item.seqNo
                        ) || 0
                )
            );


        return maxSeq + 1;
    };

    const handleParentChange = (parentId) => {

        const parent = getParent(parentId);

        if (!parent) {
            setForm(
                (prev) => ({
                    ...prev,
                    parentId: "",
                    level: 1,
                    seqNo:getNextRootSequence(),
                })
            );
            return;
        }

        setForm(
            (prev) => ({
                ...prev,
                parentId,
                level:Number(parent.level) + 1,
                seqNo:getNextChildSequence(parentId),
            })
        );
    };

    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <div>
            <CardHeader
                description="Product Category List"
                action={
                    <Button onClick={handleAdd}>
                        <Plus size={14}/>
                    </Button>
                }
            />

            <Toolbar

                left={
                    <SearchInput
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setAppliedSearch(search.trim());
                                setPage(1);
                            }
                        }}
                        placeholder="Search category..."
                    />
                }

                right={
                    <div className="flex items-center gap-2">
                        <Button
                                variant="secondary"
                                onClick={handleRefresh}
                                disabled={refreshing || loading}
                                title="Refresh"
                            >
                                {refreshing ? (
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <RefreshCw size={14} />
                                )}
                            </Button>

                        <FilterPanel
                            filters={filterFields}
                            values={filters}
                            onChange={(
                                key,
                                value
                            ) =>
                                setFilters(
                                    (prev) => ({
                                        ...prev,
                                        [key]:
                                            value,
                                    })
                                )
                            }
                            onApply={handleApplyFilter}
                            onReset={handleResetFilter}
                        />
                    </div>
                }
            />

            <DataTableV2
                rowKey="id"
                tree
                childrenKey="children"
                height={600}
                columns={columns}
                data={rows}
                loading={loading}
                emptyMessage="No data found"
                page={page}
                limit={limit}
                total={meta.total}
                totalPages={meta.totalPages}
                onPageChange={setPage}
                onLimitChange={(value) => {
                    setLimit(value);
                    setPage(1);
                }}
            />

            {/* =================================================
                ADD / EDIT MODAL
            ================================================= */}

            <Modal
                open={openModal}
                onClose={handleCancel}
                loading={saving}
                title={
                    editingData
                        ? "Edit Product Category"
                        : "Add Product Category"
                }
            >
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">

                        {/* Business */}
                        <div>
                            <label className="text-sm font-medium">
                                Business
                            </label>
                            <input
                                value={businessName ?? ""}
                                readOnly
                                className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Business Member */}
                        <div>
                            <label className="text-sm font-medium">
                                Business Member
                            </label>
                            <input value={selectedBusinessMember?.name ?? ""}
                                readOnly
                                className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Code */}
                        <div>
                            <label className="text-sm font-medium">
                                Code
                            </label>
                            <TextInput
                                label="Code"
                                value={form.code}
                                onChange={(e) =>
                                    handleChange(
                                        "code",
                                        e.target.value
                                    )
                                }
                                disabled={!!editingData}
                            />
                        </div>
                        

                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium">
                                Name
                            </label>
                            <TextInput
                                label="Name"
                                value={form.name}
                                onChange={(e) =>
                                    handleChange(
                                        "name",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        
                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>

                            <TextInput
                                label="Description"
                                value={form.description}
                                onChange={(e) =>
                                    handleChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        {/* Parent */}
                        <div>
                            <label className="text-sm font-medium">
                                Parent
                            </label>
                            <Select
                                label="Parent Category"
                                value={form.parentId}
                                options={parentOptions}
                                placeholder="- Parent -"
                                onChange={handleParentChange}
                            />
                        </div>

                        {/* Level */}
                        <div>
                            <label className="text-sm font-medium">
                                Level
                            </label>
                            <TextInput
                                label="Level"
                                type="number"
                                value={form.level}
                                disabled
                                readOnly
                                onChange={(e) =>
                                    handleChange(
                                        "level",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            />
                        </div>

                        {/* Sequence */}
                        {/* <div>
                            <label className="text-sm font-medium">
                                Sequence No
                            </label>
                                
                            <TextInput
                                label="Sequence"
                                type="number"
                                value={form.seqNo}
                                disabled={form.parentId}
                                readOnly={form.parentId}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        seqNo: Number(e.target.value),
                                    }))
                                }
                            />

                            {form.parentId && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Sequence can be adjusted for child categories.
                                </p>
                            )}
                        </div> */}

                        {/* Active */}

                        <Checkbox
                            label="Active"
                            checked={
                                form.isActive
                            }
                            onChange={(e) =>
                                handleChange(
                                    "isActive",
                                    e.target.checked
                                )
                            }
                        />

                        {/* Footer */}

                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : editingData
                                        ? "Update"
                                        : "Save"}
                            </Button>

                        </div>

                    </div>

                </form>

            </Modal>

        </div>
    );
}