import { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardHeader,
  Toolbar,
  SearchInput,
  DataTable,
  Modal,
  Button,
  StatusBadge
} from "../../../../components/ui";
import { useAuthStore }
from "../../../../store/authStore";
import { tableInventoryStore } from "../tables.store";
import useToastStore 
from "../../../../store/toastStore";
import {
  hasChanges 
} from "../../../../common/helpers/object.js";
import { confirm } from "../../../../common/helpers/confirm.js";

export default function WarehouseType() {
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [editingData, setEditingData] = useState(null);
    const [saving, setSaving] = useState(false);

    // const userId = useAuthStore((state) => state.userId);
    const businessId = useAuthStore((state) => state.businessId);
    const businessName = useAuthStore((state) => state.businessName);
    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);
    const {setLoading} = tableInventoryStore();
    const createWarehouseType = tableInventoryStore((state) => state.createWarehouseType);
    const updateWarehouseType = tableInventoryStore((state)=> state.updateWarehouseType);
    const deleteWarehouseType = tableInventoryStore((state) => state.deleteWarehouseType);
    const clearWarehouseType = tableInventoryStore((state) => state.clearWarehouseType);
    const fetchWarehouseType = tableInventoryStore((state) => state.fetchWarehouseType);
    const warehouseType = tableInventoryStore((state) => state.warehouseType);
    const warehouseTypeLoading = tableInventoryStore((state) => state.loading.warehouseType);
    
    const {
        showSuccess,
        showError,
        showWarning,
        // showInfo,
    } = useToastStore();

    const formik = useFormik({
        initialValues:{
            code: "",
            name: "",
            description: "",
            isDefault: false,
            allowNegativeStock: false,
            isActive: true,
        },

        validationSchema: Yup.object({
            code: Yup.string().required("Code is required"),
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required")
        }),

        onSubmit: async (values) =>{
            try {
                setSaving(true);
                if (editingData){
                    const changed = hasChanges(
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

                    if (!changed) {
                        showWarning(
                            "No changes detected !"
                        );
                        setOpenModal(false);
                        return;
                    }

                    await updateWarehouseType(
                        businessId,
                        selectedBusinessMember.businessMemberId,
                        editingData.id,
                        values,
                    );

                }else{
                    await createWarehouseType(
                        businessId,
                        selectedBusinessMember.businessMemberId,
                        values
                    );
                }

                fetchWarehouseType(businessId,selectedBusinessMember.businessMemberId);

                setOpenModal(false);

                showSuccess(
                    "Data save successfully."
                );
            }catch(err){
                showError(
                    err.response?.data?.message ??
                    "Failed to save data."
                );
            }finally{
                setSaving(false);
            }
        }

    });

    useEffect(() => {       
        if (!businessId) return;
            fetchWarehouseType(businessId,selectedBusinessMember.businessMemberId);
    }, 
    [
        businessId,
        selectedBusinessMember.businessMemberId,
        fetchWarehouseType
    ]);

    const filteredWarehouseType =
        Array.isArray(warehouseType)
        ? warehouseType.filter(
            (item) =>
                item.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
            )
    : [];

    const handleAdd = () => {
        try{
            setLoading(true);
            setEditingData(null);
            formik.resetForm();
            setOpenModal(true);
        }finally{
            setLoading(false);
        }
    };

    const handleEdit = (whType) => {
        try{
            setLoading(true);
            setEditingData(whType);
            setOriginalData(whType);

            formik.setValues({
                code: whType.code ?? "",
                name: whType.name ?? "",
                description: whType.description ?? "",
                isDefault: whType.isDefault ?? false,
                allowNegativeStock: whType.allowNegativeStock ?? false,
                isActive: whType.isActive ?? true,
            });

            setOpenModal(true);
        }finally{
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
        formik.resetForm();
        setEditingData(null);
    };

    const handleDelete = async (whType) => {
        const ok = await confirm({
            title: "Delete Business Member",
            message: `Delete "${whType.code}" ?`,
            variant: "danger",
            confirmText: "Delete",
        });

        if (!ok) return;
        
        try {
            clearWarehouseType();
            await deleteWarehouseType(
                businessId,
                selectedBusinessMember.businessMemberId,
                whType.id
            );
            fetchWarehouseType(businessId,selectedBusinessMember.businessMemberId);
            showWarning(
                "Data deleted !"
            );
        } catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to delete data !"
            );
        } 
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
            title: "Allow Negative Stock",
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
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        onClick={() => handleDelete(row)}
                        className="p-2 rounded-md hover:bg-red-50 text-red-600"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="space-y-4 p-3">
                <PageHeader
                    title="Warehouse Type"
                    // description="Manage business profile and members"
                />
                <Card>
                    <CardHeader
                        title="Warehous Type List"
                        // description="Manage business users and roles"
                        action={
                            <Button onClick={handleAdd}
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
                                    setSearch(
                                    e.target.value
                                    )
                                }
                                placeholder="Search name..."
                            />
                        }
                    />

                    <DataTable
                        columns={columns}
                        data={filteredWarehouseType}
                        loading={warehouseTypeLoading}
                    />
                </Card>
            </div>

            {/* MODAL EDITING */}
            <Modal
                open={openModal}
                onClose={handleCancel}
                loading={saving}
                title={editingData ? "Edit Warehouse Type" : "Add Warehouse Type"}
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4">
                        <div>
                            <label className="text-sm font-medium">Business</label>
                            <input
                                value={businessName}
                                readOnly
                                className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Business Member</label>
                            <input
                                value={selectedBusinessMember.name}
                                readOnly
                                className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Code</label>
                            <input
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.code &&
                                    formik.errors.code
                                }
                                readOnly={!!editingData}
                                className={`mt-1 w-full border rounded-md px-3 py-2 ${
                                    editingData ? "bg-gray-100" : ""
                                }`}
                            />
                            {formik.touched.code && formik.errors.code && (
                                <p className="mt-1 text-sm text-red-500">
                                    {formik.errors.code}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.name &&
                                    formik.errors.name
                                }
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="mt-1 text-sm text-red-500">
                                    {formik.errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Description</label>
                            <input
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {formik.errors.description}
                                </p>
                            )}
                        </div>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={formik.values.isDefault}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.isDefault &&
                                    formik.errors.isDefault
                                } 
                            />
                            Default
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="allowNegativeStock"
                                checked={formik.values.allowNegativeStock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.allowNegativeStock &&
                                    formik.errors.allowNegativeStock
                                } 
                            />
                            Allow Negative Stock
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formik.values.isActive}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.isActive &&
                                    formik.errors.isActive
                                } 
                            />
                            Active
                        </label>

                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                            <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving
                                    ? "Saving..."
                                    : editingData
                                        ? "Update"
                                    : "Save"
                                }
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}