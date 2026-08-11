import { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Pencil,
  Trash2,
  Plus,
  Loader2,
  RefreshCw
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardHeader,
  Toolbar,
  SearchInput,
  DataTable,
  DataTableV2,
  Modal,
  Button,
  StatusBadge,
  Select,
  FilterPanel,
  TextInput,
  Checkbox
} from "../../../components/ui";
import { useAuthStore }
from "../../../store/authStore.js";
import useToastStore 
from "../../../store/toastStore";
import {
  hasChanges 
} from "../../../common/helpers/object.js";
import { confirm } from "../../../common/helpers/confirm.js";
import { warehouseStore } from "./warehouse.store.js";
import { tableInventoryStore } from "../tables/tables.store.js";

export default function Warehouse(){
    const [openModal, setOpenModal] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [editingData, setEditingData] = useState(null);
    
    const [page,setPage]=useState(1);
    const [limit,setLimit]=useState(20);
    const [search,setSearch]=useState("");
    const [sortBy]=useState("name");
    const [sortOrder]=useState("asc");

    const {
        showSuccess,
        showError,
        showWarning,
    } = useToastStore();

    const businessId = useAuthStore((state) => state.businessId);
    // const businessName = useAuthStore((state) => state.businessName);
    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);
    const loading = warehouseStore((state) => state.loading.warehouse);
    const fetchWarehouse = warehouseStore((state) => state.fetchWarehouse);
    const warehouse = warehouseStore((state) => state.warehouse);
    const createWarehouse = warehouseStore((state) => state.createWarehouse);
    const updateWarehouse = warehouseStore((state) => state.updateWarehouse);
    const deleteWarehouse = warehouseStore((state) => state.deleteWarehouse);
    // const [warehouseTypeId, setWarehouseTypeId] = useState("");
    const fetchWarehouseType = tableInventoryStore((state) => state.fetchWarehouseType);
    const warehouseType = tableInventoryStore((state) => state.warehouseType);
    const businessMemberId = selectedBusinessMember.businessMemberId;
    // const [filterOpen, setFilterOpen] = useState(false);
    // const {setLoading} = tableInventoryStore();
    const saving = warehouseStore((state) => state.loading.saveWarehouse);
    const [refreshing, setRefreshing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const initWarehouse = {
        code: "",
        name: "",
        description: "",
        warehouseTypeId: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        isDefault: false,
        allowNegativeStock: false,
        isActive: true,
    };

    const [filters, setFilters] = useState({
        warehouseTypeId: "",
        isActive: "",
    });

    const [appliedFilters, setAppliedFilters] = useState({
        warehouseTypeId: "",
        isActive: "",
    });

    const rows = warehouse?.data ?? [];
    const meta = warehouse?.meta ?? {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
    };

    const filterFields = [
        {
            key: "warehouseTypeId",
            label: "Warehouse Type",
            type: "select",
            valueField: "id",
            labelField: "name",
            secondaryField: "code",
            placeholder: "- Select -",
            options: warehouseType,
        },
        {
            key: "isActive",
            label: "Status",
            type: "select",
            placeholder: "- Select -",
            options: [
                { label: "Active", value: true },
                { label: "Inactive", value: false },
            ],
        },
    ];

    useEffect(()=>{
            if (!businessId || !businessMemberId) return;

            fetchWarehouse({
                businessId,
                businessMemberId,
                page,
                limit,
                search: search,
                warehouseTypeId: appliedFilters.warehouseTypeId,
                isActive: appliedFilters.isActive,
                sortBy,
                sortOrder,
            });
        },
        [
            businessId,
            businessMemberId,
            page,
            limit,
            search,
            sortBy,
            sortOrder,
            fetchWarehouse,
            appliedFilters
        ]
    );

    useEffect(() => {      
        if (!businessId || !businessMemberId) return;

            fetchWarehouseType({
                businessId,
                businessMemberId
            });
        }, 
        [
            businessId,
            businessMemberId,
            fetchWarehouseType
        ]
    );

    const handleCreate = () => {
        setEditingData(null);
        setOriginalData(null);
        setOpenModal(true);
    };

    const handleApplyFilter = () => {
        // kembali ke halaman pertama
        setPage(1);
        setAppliedFilters(filters);
    };

    const handleResetFilter = () => {
        setFilters({
            warehouseTypeId: "",
            isActive: "",
        });
        setAppliedFilters({
            warehouseTypeId: "",
            isActive: "",
        });
        setPage(1);
    };

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
            key: "WarehouseType",
            title: "Type",
            render: (row) => row.WarehouseType?.code ?? "-"
        },
        {
            key: "email",
            title: "Email",
        },
        {
            key: "phone",
            title: "Phone",
        },
        {
            key: "address",
            title: "Address",
        },
        {
            key: "city",
            title: "City",
        },
        {
            key: "province",
            title: "Province",
        },
        {
            key: "postalCode",
            title: "Postal Code",
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
                        <Pencil size={16} />
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

    const handleEdit = (row) => {
        const data = {
            id: row.id ?? "",
            code: row.code ?? "",
            name: row.name ?? "",
            description: row.description ?? "",
            warehouseTypeId: row.warehouseTypeId ?? "",
            phone: row.phone ?? "",
            email: row.email ?? "",
            address: row.address ?? "",
            city: row.city ?? "",
            province: row.province ?? "",
            postalCode: row.postalCode ?? "",
            isDefault: row.isDefault ?? false,
            allowNegativeStock: row.allowNegativeStock ?? false,
            isActive: row.isActive ?? true,
        };

        setOriginalData(data);
        setEditingData(row);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingData(null);
        setOriginalData(null);
    };

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("Code is required")
            .max(50, "Code maximum 50 characters"),

        name: Yup.string()
            .required("Name is required")
            .max(100, "Name maximum 100 characters"),

        warehouseTypeId: Yup.string()
            .required("Warehouse type is required"),

        email: Yup.string()
            .email("Invalid email"),

        phone: Yup.string()
            .max(30, "Phone maximum 30 characters"),
    });

    const formik = useFormik({
        initialValues:
            editingData
                ? {
                    id: editingData.id ?? "",
                    code: editingData.code ?? "",
                    name: editingData.name ?? "",
                    description: editingData.description ?? "",
                    warehouseTypeId: editingData.warehouseTypeId ?? "",
                    phone: editingData.phone ?? "",
                    email: editingData.email ?? "",
                    address: editingData.address ?? "",
                    city: editingData.city ?? "",
                    province: editingData.province ?? "",
                    postalCode: editingData.postalCode ?? "",
                    isDefault: editingData.isDefault ?? false,
                    allowNegativeStock: editingData.allowNegativeStock ?? false,
                    isActive: editingData.isActive ?? true,
                }
                : initWarehouse,

        enableReinitialize: true,

        validationSchema,

        onSubmit: async (values) => {
            try {
                if (editingData) {   
                    const changed= hasChanges(
                        originalData,
                        values,
                        [
                            "code",
                            "name",
                            "description",
                            "warehouseTypeId",
                            "email",
                            "phone",
                            "address",
                            "city",
                            "province",
                            "postalCode",
                            "isDefault",
                            "allowNegativeStock",
                            "isActive",
                        ]
                    );

                    if(!changed){
                        showWarning(
                            "No changes detected."
                        );
                        setOpenModal(false);
                        return;
                    }

                    await updateWarehouse(
                        businessId,
                        businessMemberId,
                        editingData.id,
                        values
                    );
                } else {
                    await createWarehouse(
                        businessId,
                        businessMemberId,
                        values
                    );
                }
                handleCloseModal();
                // refresh list
                await fetchWarehouse({
                    businessId,
                    businessMemberId,
                    page,
                    limit,
                    search,
                    sortBy,
                    sortOrder,
                    ...appliedFilters,
                });
                showSuccess(
                    "Warehouse saved successfully."
                );
            } catch (err) {
                showError(
                    err.response?.data?.message ??
                    "Failed to save warehouse."
                );
            } 
        },
    });

    const handleDelete = async (row) => {
        const confirmed = await confirm({
            title: "Delete Warehouse",
            message: `Are you sure you want to delete warehouse "${row.name}"?`,
            variant: "danger",
            confirmText: "Delete",
            cancelText: "Cancel",
        });

        if (!confirmed) return;
        
        try {
            setDeletingId(row.id);
            await deleteWarehouse(
                businessId,
                businessMemberId,
                row.id
            );

            await fetchWarehouse({
                businessId,
                businessMemberId,
                page,
                limit,
                search,
                sortBy,
                sortOrder,
                ...appliedFilters,
            });
            showWarning(
                "Data deleted !"
            );
            setDeletingId(null);
        } catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to delete data !"
            );
            setDeletingId(null);
        }finally{
            setDeletingId(null);
        }
    };

    const handleRefresh = async () => {
        try {
            setRefreshing(true);

            await fetchWarehouse({
                businessId,
                businessMemberId:
                    selectedBusinessMember.businessMemberId,
                page,
                limit,
                search,
                sortBy,
                sortOrder,
                ...appliedFilters,
            });

        } finally {
            setRefreshing(false);
        }
    };
    // console.log("loading:", loading);
    // console.log("warehouse:", warehouse);
    // console.log("rows:", rows);
    // console.log("meta:", meta);
    // console.log("warehouseType:", warehouseType);

    return (
        <>
        <div className="space-y-4 p-3">
            <PageHeader
                title="Warehouse"
                // description="Manage product category hierarchy"
            />
            <Card>

                <CardHeader
                title="Warehouse List"
                // description="Manage category hierarchy"
                action={
                    <Button onClick={handleCreate}>
                        <Plus size={14} />
                    </Button>
                }
                />

                <Toolbar
                    left={
                        <div className="flex gap-3">
                            <SearchInput value={search}
                                onChange={(e)=> setSearch(e.target.value)}
                                placeholder="Search warehouse..."
                            />
                        </div>
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
                                onChange={(key,value)=>
                                    setFilters(prev=>({
                                        ...prev,
                                        [key]:value,
                                    }))
                                }
                                onApply={handleApplyFilter}
                                onReset={handleResetFilter}
                            />
                        </div>
                        
                    }
                />

                <DataTableV2
                    rowKey="id"
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
            </Card>
        </div>

        {/* Modal Editor */}
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            loading={saving}
            title={
                editingData
                    ? "Edit Warehouse"
                    : "Add Warehouse"
            }
        >
            <form
                onSubmit={formik.handleSubmit}
                className="space-y-3"
            >
                {/* Basic Information */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Warehouse Type
                    </label>

                    <Select
                        name="warehouseTypeId"
                        options={warehouseType}
                        value={
                            formik.values.warehouseTypeId
                        }
                        valueField="id"
                        labelField="name"
                        secondaryField="code"
                        onChange={(value) =>
                            formik.setFieldValue(
                                "warehouseTypeId",
                                value
                            )
                        }
                    />

                    {formik.touched.warehouseTypeId &&
                        formik.errors.warehouseTypeId && (
                            <p className="mt-1 text-xs text-red-500">
                                {
                                    formik.errors
                                        .warehouseTypeId
                                }
                            </p>
                        )}
                </div>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Phone
                        </label>

                        <TextInput
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Email
                        </label>

                        <TextInput
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.email &&
                                formik.errors.email
                            }
                        />
                    </div>
                </div>
                
                {/* Address */}
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Address
                    </label>

                    <textarea
                        name="address"
                        rows={2}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            City
                        </label>

                        <TextInput
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Province
                        </label>

                        <TextInput
                            name="province"
                            value={formik.values.province}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Postal Code
                        </label>

                        <TextInput
                            name="postalCode"
                            value={formik.values.postalCode}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>

                {/* Settings */}
                <div className="space-y-3">
                    <Checkbox
                        label="Default Warehouse"
                        checked={formik.values.isDefault}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "isDefault",
                                e.target.checked
                            )
                        }
                    />
                </div>
                <div>
                    <Checkbox
                        label="Allow Negative Stock"
                        checked={
                            formik.values.allowNegativeStock
                        }
                        onChange={(e) =>
                            formik.setFieldValue(
                                "allowNegativeStock",
                                e.target.checked
                            )
                        }
                    />
                </div>
                    
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
                <div className="flex justify-end gap-2 border-t pt-4">

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCloseModal}
                        disabled={saving}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" disabled={saving}>
                        {saving
                            ? "Saving..."
                            : editingData
                                ? "Update"
                                : "Save"
                        }
                    </Button>

                </div>

            </form>
        </Modal>

        </>

    );
}