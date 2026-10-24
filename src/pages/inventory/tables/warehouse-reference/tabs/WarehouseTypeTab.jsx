import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Pencil,
    Trash2,
    Plus,
    RefreshCw,
    Loader2,
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
} from "../../../../../components/ui";

import { useAuthStore } from "../../../../../store/authStore";
import { warehouseReferenceStore } from "../warehouse-reference.store";
import useToastStore from "../../../../../store/toastStore";
import { hasChanges } from "../../../../../common/helpers/object.js";
import { confirm } from "../../../../../common/helpers/confirm.js";

export default function WarehouseTypeTab({
    search,
    onSearchChange,
}) {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const [sortBy] = useState("code");
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

    const fetchWarehouseType = warehouseReferenceStore((state) => state.fetchWarehouseType); 
    const createWarehouseType = warehouseReferenceStore((state) => state.createWarehouseType);
    const updateWarehouseType = warehouseReferenceStore((state) => state.updateWarehouseType);
    const deleteWarehouseType = warehouseReferenceStore((state) => state.deleteWarehouseType);
    const warehouseType = warehouseReferenceStore((state) => state.warehouseType);
    const loading = warehouseReferenceStore((state) => state.loading.warehouseType);

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
        isDefault: false,
        allowNegativeStock: false,
        isActive: true,
    };

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("Code is required")
            .min(2, "Code minimum 2 charaters")
            .max(9, "Code maximum 9 characters"),

        name: Yup.string()
            .required("Name is required")
            .min(3, "Name minimum 3 charaters")
            .max(50, "Name maximum 50 characters"),

        description: Yup.string()
            .required("Description is required")
            .min(3, "Description minimum 3 charaters")
            .max(100, "Description maximum 100 characters"),
    });
    
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
    const rows = warehouseType?.data ?? [];

    const meta = warehouseType?.meta ?? {
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

        if (
            appliedFilters.isActive !== "" &&
            appliedFilters.isActive !==
                undefined &&
            appliedFilters.isActive !== null
        ) {
            query.isActive =
                appliedFilters.isActive;
        }
        fetchWarehouseType(query)
    }, [
        businessId,
        businessMemberId,
        page,
        limit,
        appliedSearch,
        sortBy,
        sortOrder,
        appliedFilters,
        fetchWarehouseType
    ]);

    /*
        * =========================================================
        * ADD
        * =========================================================
    */
    const handleAdd = () => {
        setEditingData(null);
        setOriginalData(null);
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
        setOpenModal(true);
    };

    /*
        * =========================================================
        * CANCEL
        * =========================================================
    */
    const handleCancel = () => {
        formik.resetForm();

        setEditingData(null);
        setOriginalData(null);
        setOpenModal(false);
    };

    /*
        * =========================================================
        * SAVE
        * =========================================================
    */
    const formik = useFormik({
        initialValues:
            editingData
                ? {
                    id: editingData.id ?? "",
                    code: editingData.code ?? "",
                    name: editingData.name ?? "",
                    description: editingData.description ?? "",
                    isDefault: editingData.isDefault ?? false,
                    allowNegativeStock: editingData.allowNegativeStock ?? false,
                    isActive: editingData.isActive ?? true,
                }
                : initialValues,

        enableReinitialize: true,

        validationSchema,

        onSubmit: async (values) => {
            try {
                setSaving(true);

                if (editingData) {   
                    const changed= hasChanges(
                        originalData,
                        values,
                        [
                            "code",
                            "name",
                            "description",
                            "isDefault",
                            "allowNegativeStock",
                            "isActive",
                        ]
                    );

                    if(!changed){
                        showWarning("No changes detected.");
                        setOpenModal(false);
                        return;
                    }

                    await updateWarehouseType(
                        businessId,
                        businessMemberId,
                        editingData.id,
                        values
                    );
                    showSuccess("Warehouse type updated successfully.");
                } else {
                    await createWarehouseType(
                        businessId,
                        businessMemberId,
                        values
                    );
                    showSuccess("Warehouse type saved successfully.");
                }
                // ==========================================
                // RESET FORM
                // ==========================================
                formik.resetForm();

                setEditingData(null);
                setOriginalData(null);
                setOpenModal(false);

                // ==========================================
                // REFRESH LIST
                // ==========================================
                await fetchWarehouseType({
                    businessId,
                    businessMemberId,
                    page,
                    limit,
                    search : appliedSearch || "",
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
            
            } catch (err) {
                setSaving(false);
                showError(
                    err.response?.data?.message ??
                    "Failed to save warehouse type."
                );
            } finally {
                setSaving(false);
            }
        },
    });

    /*
        * =========================================================
        * DELETE
        * =========================================================
    */
    const handleDelete = async (
        row
    ) => {

        const ok = await confirm({
            title: "Delete warehouse type",
            message: `Delete "${row.code}" - ${row.name}?`,
            variant: "danger",
            confirmText: "Delete",
        });

        if (!ok) return;

        try {
            setDeletingId(row.id);
            await deleteWarehouseType(
                businessId,
                businessMemberId,
                row.id
            );

            await fetchWarehouseType({
                businessId,
                businessMemberId,
                page,
                limit,
                search: appliedSearch || "",
                sortBy,
                sortOrder,
            });

            showWarning(
                "Warehouse type deleted."
            );

            setDeletingId(null);
        } catch (err) {
            // console.error(err);
            showError(
                err.response?.data?.message ??
                "Failed to delete warehouse type."
            );
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

            await fetchWarehouseType({
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
            key: "isDefault",
            title: "Default",
            render: (row) => (
                <StatusBadge
                    active={row.isDefault}
                    activeText="Yes"
                    inactiveText="No"
                />
            ),
        },
        {
            key: "allowNegativeStock",
            title: "Negative Stock",
            render: (row) => (
                <StatusBadge
                    active={row.allowNegativeStock}
                    activeText="Allowed"
                    inactiveText="Not Allowed"
                />
            ),
        },
        {
            key: "isActive",
            title: "Status",
            render: (row) => (
                <StatusBadge
                    active={row.isActive}
                    activeText="Active"
                    inactiveText="Inactive"
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
        * RENDER
        * =========================================================
    */
    return (
        <div>

            <CardHeader
                description="Warehouse Type List"
                action={
                    <Button
                        onClick={handleAdd}
                    >
                        <Plus size={14}/>
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setAppliedSearch(search.trim());
                                setPage(1);
                            }
                        }}
                        placeholder="Search type..."
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
                            filters={
                                filterFields
                            }
                            values={
                                filters
                            }
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
                            onApply={
                                handleApplyFilter
                            }
                            onReset={
                                handleResetFilter
                            }
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
                onLimitChange={(
                    value
                ) => {
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
                        ? "Edit Warehouse Type"
                        : "Add Warehouse Type"
                }
            >
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <div className="grid gap-4">

                        {/* Business */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
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
                            <label className="mb-1 block text-sm font-medium">
                                Business Member
                            </label>

                            <input
                                value={selectedBusinessMember?.name ?? ""}
                                readOnly
                                className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        {/* Code */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Code
                            </label>
                            <TextInput
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={!!editingData}
                                error={
                                    formik.touched.code &&
                                    formik.errors.code
                                }
                            />
                            {formik.touched.code &&
                            formik.errors.code && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formik.errors.code}
                                </p>
                            )}
                        </div>
                        
                        {/* Name */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Name
                            </label>
                            <TextInput
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.name &&
                                    formik.errors.name
                                }
                            />
                            {formik.touched.name &&
                            formik.errors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>
                        
                        {/* Description */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                rows={2}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />
                        </div>
                        
                        {/* Default */}
                        <div>
                            <Checkbox
                                label="Default"
                                checked={formik.values.isDefault}
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        "isDefault",
                                        e.target.checked
                                    )
                                }
                            />
                        </div>

                        {/* Negative Stock */}
                        <div>
                            <Checkbox
                                label="Negative Stock"
                                checked={formik.values.allowNegativeStock}
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        "allowNegativeStock",
                                        e.target.checked
                                    )
                                }
                            />
                        </div>

                        {/* Active */}
                        <div>
                            <Checkbox
                                label="Active"
                                checked={formik.values.isActive}
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        "isActive",
                                        e.target.checked
                                    )
                                }
                            />
                        </div>

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