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
  DataTableV2,
  Modal,
  Button,
  StatusBadge,
  ActionMenu,
  ActionMenuItem
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

export default function ProductCategory() {
    const [search, setSearch] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [editingData, setEditingData] = useState(null);
    const [saving, setSaving] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mode, setMode] = useState("root");
    const [expandedKeys, setExpandedKeys] = useState([]);

    // const userId = useAuthStore((state) => state.userId);
    const businessId = useAuthStore((state) => state.businessId);
    const businessName = useAuthStore((state) => state.businessName);
    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);
    const {setLoading} = tableInventoryStore();
    const createProductCategory = tableInventoryStore((state) => state.createProductCategory);
    const updateProductCategory = tableInventoryStore((state)=> state.updateProductCategory);
    const deleteProductCategory = tableInventoryStore((state) => state.deleteProductCategory);
    const clearProductCategory = tableInventoryStore((state) => state.clearProductCategory);
    const fetchProductCategory = tableInventoryStore((state) => state.fetchProductCategory);
    const productCategory = tableInventoryStore((state) => state.productCategory);
    const productCategoryLoading = tableInventoryStore((state) => state.loading.productCategory);
    
    const {
        showSuccess,
        showError,
        showWarning,
        // showInfo,
    } = useToastStore();

    const formik = useFormik({
        initialValues:{
            parentId:null,
            code: "",
            name: "",
            description: "",
            seqNo: 1,
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
                            "parentId",
                            "code",
                            "name",
                            "description",
                            "seqNo",
                            "level",
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

                    await updateProductCategory(
                        businessId,
                        selectedBusinessMember.businessMemberId,
                        editingData.id,
                        values,
                    );

                }else{
                    console.log("save")
                    await createProductCategory(
                        businessId,
                        selectedBusinessMember.businessMemberId,
                        values
                    );
                }

                fetchProductCategory(businessId,selectedBusinessMember.businessMemberId);

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
            fetchProductCategory(businessId,selectedBusinessMember.businessMemberId);
    }, 
    [
        businessId,
        selectedBusinessMember.businessMemberId,
        fetchProductCategory
    ]);

    const filteredProductCategory =
        Array.isArray(productCategory)
        ? productCategory.filter(
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
            clearProductCategory();
            await deleteProductCategory(
                businessId,
                selectedBusinessMember.businessMemberId,
                whType.id
            );
            fetchProductCategory(businessId,selectedBusinessMember.businessMemberId);
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

    const handleCreateRoot = () => {
        setMode("root");
        setSelectedCategory(null);
        formik.resetForm();
        setOpenModal(true);
    };

    const handleCreateChild = (category) => {
        setMode("child");
        setSelectedCategory(category);
        formik.resetForm();
        formik.setValues({
            parentId: category.id,
            code: "",
            name: "",
            description: "",
            seqNo:1,
            isActive: true,
        });
        setOpenModal(true);
    };

    const columns = [
        {
            key: "name",
            title: "Name",
            minWidth: 100,
            render: (row) => (
                <div
                    style={{
                        paddingLeft: row.level * 24,
                    }}
                    className="flex items-center gap-2"
                >
                    {row.name}
                </div>
            )
        },
        {
            key:"code",
            title:"Code",
        },
        {
            key:"level",
            title:"Level",
        },
        {
            key:"seqNo",
            title:"Seq No",
        },
        {
            key:"isActive",
            title:"Status",
            render:(row)=>
                <StatusBadge
                    active={row.isActive}
                />
        },
        {
            key:"action",
            title:"",
            width:60,
            cellClassName:"text-right",
            render:(row)=>(
                <ActionMenu
                    items={[
                        {
                            label:"Edit",
                            icon:<Pencil size={16}/>,
                            onClick:()=>handleEdit(row)
                        },
                        {
                            label:"Delete",
                            icon:<Trash2 size={16}/>,
                            danger:true,
                            onClick:()=>handleDelete(row)
                        }
                    ]}
                />
            )
        }
    ];

    return (
        <>
            <div className="space-y-4 p-3">
                <PageHeader
                    title="Product Category"
                    // description="Manage business profile and members"
                />
                <Card>
                    <CardHeader
                        title="Product Category List"
                        // description="Manage business users and roles"
                        action={
                            <Button onClick={handleCreateRoot}
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

                    <DataTableV2
                        columns={columns}
                        data={filteredProductCategory}
                        loading={productCategoryLoading}
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
                    mode==="root" ? "New Root Category" : 
                    mode==="child" ? "New Child Category" : 
                    "Edit Category"
                }
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
                        {
                            mode==="child" &&
                            <div>
                                <label>
                                    Parent Category
                                </label>
                                <input
                                    value={selectedCategory?.name}
                                    readOnly
                                    className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                                />
                            </div>
                        }
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

                        <div>
                            <label>Sequence</label>
                            <input
                                type="Sequence"
                                name="seqNo"
                                value={formik.values.seqNo}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.seqNo &&
                                    formik.errors.seqNo
                                }
                                className="mt-1 w-full border rounded-md px-3 py-2"
                            />
                        </div>

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
                            <Button type="submit" disabled={saving}>{
                                saving
                                    ? "Saving..."
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