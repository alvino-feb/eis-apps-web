import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Pencil,
    Trash2,
    Plus,
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
    ActionMenu,
} from "../../../../components/ui";

import { useAuthStore }
from "../../../../store/authStore";

import {
    tableInventoryStore,
} from "../tables.store";

import useToastStore
from "../../../../store/toastStore";

import {
    hasChanges,
} from "../../../../common/helpers/object";

import {
    confirm,
} from "../../../../common/helpers/confirm";

export default function ProductCategory() {
    const businessId = useAuthStore(state => state.businessId);
    const businessName = useAuthStore(state => state.businessName);
    const selectedBusinessMember = useAuthStore(state => state.selectedBusinessMember);
    const {
        setLoading,
        fetchProductCategory,
        clearProductCategory,
        createProductCategory,
        updateProductCategory,
        deleteProductCategory,
    } = tableInventoryStore();
    const productCategory = tableInventoryStore(state => state.productCategory);
    const loading = tableInventoryStore(state => state.loading.productCategory);
    const {
        showSuccess,
        showError,
        showWarning,
    } = useToastStore();
    const [search,setSearch] = useState("");
    const [openModal,setOpenModal] = useState(false);
    const [saving,setSaving] = useState(false);
    const [editingData,setEditingData] = useState(null);
    const [originalData,setOriginalData] = useState(null);
    const [selectedCategory,setSelectedCategory] = useState(null);
    const [mode,setMode] = useState("root");

    const formik = useFormik({
        initialValues:{
            parentId:null,
            code:"",
            name:"",
            description:"",
            isActive:true,
        },

        validationSchema:Yup.object({
            code:Yup.string().required("Code is required"),
            name:Yup.string().required("Name is required"),
            description:Yup.string().nullable(),
        }),

        onSubmit:async(values)=>{
            try{
                setSaving(true);
                if(editingData){
                    const changed=
                        hasChanges(
                            originalData,
                            values,
                            [
                                "code",
                                "name",
                                "description",
                                "isActive",
                            ]
                        );

                    if(!changed){
                        showWarning(
                            "No changes detected."
                        );
                        return;
                    }

                    await updateProductCategory(
                        businessId,
                        selectedBusinessMember.businessMemberId,
                        editingData.id,
                        values
                    );
                }

                else{
                    await createProductCategory(
                        businessId,
                        selectedBusinessMember.businessMemberId,
                        values
                    );
                }

                await fetchProductCategory(
                    businessId,
                    selectedBusinessMember.businessMemberId
                );

                showSuccess(
                    "Category saved successfully."
                );

                setOpenModal(false);
            }

            catch(err){
                showError(
                    err.response?.data?.message ??
                    "Failed to save category."
                );

            }
            finally{
                setSaving(false);
            }
        }
    });

    useEffect(()=>{
        if(
            !businessId ||
            !selectedBusinessMember
        ){
            return;
        }

        fetchProductCategory(
            businessId,
            selectedBusinessMember.businessMemberId
        );
    },
    [
        businessId,
        selectedBusinessMember,
        fetchProductCategory,
    ]);

    const filteredProductCategory=
        Array.isArray(productCategory)
        ?
        productCategory.filter(item=>
            item.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        )
        :
        [];

// ======================================================
// CREATE ROOT
// ======================================================

    const handleCreateRoot = () => {
        setMode("root");
        setSelectedCategory(null);
        setEditingData(null);
        setOriginalData(null);
        formik.resetForm();
        formik.setValues({
            parentId: null,
            code: "",
            name: "",
            description: "",
            isActive: true,
        });
        setOpenModal(true);
    };

    // ======================================================
    // CREATE CHILD
    // ======================================================
    const handleCreateChild = (category) => {
        setMode("child");
        setSelectedCategory(category);
        setEditingData(null);
        setOriginalData(null);
        formik.resetForm();
        formik.setValues({
            parentId: category.id,
            code: "",
            name: "",
            description: "",
            isActive: true,
        });
        setOpenModal(true);
    };

    // ======================================================
    // EDIT
    // ======================================================
    const handleEdit = (category) => {
        setMode("edit");
        setSelectedCategory(category.parent ?? null);
        setEditingData(category);
        setOriginalData(category);
        formik.setValues({
            parentId: category.parentId,
            code: category.code ?? "",
            name: category.name ?? "",
            description: category.description ?? "",
            isActive: category.isActive,
        });
        setOpenModal(true);
    };

    // ======================================================
    // CANCEL
    // ======================================================
    const handleCancel = () => {
        formik.resetForm();
        setMode("root");
        setEditingData(null);
        setOriginalData(null);
        setSelectedCategory(null);
        setOpenModal(false);
    };

    // ======================================================
    // DELETE
    // ======================================================
    const handleDelete = async (category) => {
        const ok = await confirm({
            title: "Delete Product Category",
            message: `Delete "${category.name}" ?`,
            variant: "danger",
            confirmText: "Delete",
        });
        if (!ok) return;
        try {
            setLoading(true);
            clearProductCategory();
            await deleteProductCategory(
                businessId,
                selectedBusinessMember.businessMemberId,
                category.id
            );

            await fetchProductCategory(
                businessId,
                selectedBusinessMember.businessMemberId
            );

            showSuccess(
                "Category deleted successfully."
            );

        }
        catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to delete category."
            );
        }
        finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            key: "code",
            title: "Code",
            width: 120,
        },
        {
            key: "name",
            title: "Name",
            tree: true,
            minWidth: 120,
        },
        {
            key: "description",
            title: "Description",
            minWidth: 200,
        },
        {
            key: "level",
            title: "Level",
            width: 80,
            render: (row) => row.level,
        },
        {
            key: "isActive",
            title: "Status",
            width: 120,
            render: (row) => (
                <StatusBadge
                    active={row.isActive}
                />
            ),
        },
        {
            key: "action",
            title: "",
            width: 60,
            render: (row) => (
                <ActionMenu
                    items={[
                        {
                            label: "Add Child",
                            icon: <Plus size={16}/>,
                            onClick: () =>
                                handleCreateChild(row),
                        },
                        {
                            label: "Edit",
                            icon: <Pencil size={16}/>,
                            onClick: () =>
                                handleEdit(row),
                        },
                        {
                            label: "Delete",
                            danger: true,
                            icon: <Trash2 size={16}/>,
                            onClick: () =>
                                handleDelete(row),
                        },
                    ]}
                />
            ),
        },
    ];

    return (
        <>
            <div className="space-y-4 p-3">
                <PageHeader
                    title="Product Category"
                    description="Manage product category hierarchy"
                />
                <Card className="
                    h-[calc(100vh-170px)]
                    flex
                    flex-col
                ">
                    <CardHeader
                        title="Product Category List"
                        description="Manage category tree"
                        action={
                            <Button onClick={handleCreateRoot}>
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
                                placeholder="Search category..."
                            />
                        }
                    />

                    <DataTableV2
                        rowKey="id"
                        tree
                        columns={columns}
                        data={filteredProductCategory}
                        loading={loading}
                        childrenKey="children"
                        emptyMessage="No data found"
                    />
                </Card>
            </div>

            {/* MODAL EDITING */}
            <Modal
                open={openModal}
                onClose={handleCancel}
                loading={saving}
                title={
                    mode === "edit"
                        ? "Edit Product Category"
                        : mode === "child"
                            ? "Add Child Category"
                            : "Add Root Category"
            }
            >
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid gap-4">
                        <div>
                            <label className="text-sm font-medium">
                                Business
                            </label>
                            <input
                                readOnly
                                value={businessName}
                                className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">
                                Business Member
                            </label>
                            <input
                                readOnly
                                value={selectedBusinessMember.name}
                                className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2"
                            />
                        </div>
                        {
                            mode === "child" && (
                                <div>
                                    <label className="text-sm font-medium">
                                        Parent Category
                                    </label>
                                    <input
                                        readOnly
                                        value={selectedCategory?.name ?? ""}
                                        className="mt-1 w-full rounded-md border bg-gray-100 px-3 py-2"
                                    />
                                </div>
                            )
                        }
                        <div>
                            <label className="text-sm font-medium">
                                Code
                            </label>
                            <input
                                name="code"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                readOnly={!!editingData}
                                className={`mt-1 w-full rounded-md border px-3 py-2
                                    ${editingData ? "bg-gray-100" : ""}
                                `}
                            />
                            {
                                formik.touched.code &&
                                formik.errors.code &&
                                <p className="text-sm text-red-500 mt-1">
                                    {formik.errors.code}
                                </p>
                            }
                        </div>
                        <div>
                            <label className="text-sm font-medium">
                                Name
                            </label>
                            <input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                            />
                            {
                                formik.touched.name &&
                                formik.errors.name &&
                                <p className="text-sm text-red-500 mt-1">
                                    {formik.errors.name}
                                </p>
                            }
                        </div>
                        <div>
                            <label className="text-sm font-medium">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className="mt-1 w-full rounded-md border px-3 py-2"
                            />
                        </div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formik.values.isActive}
                                onChange={formik.handleChange}
                            />
                            Active
                        </label>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                            >
                                {
                                    saving
                                    ?
                                    "Saving..."
                                    :
                                    "Save"
                                }
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}