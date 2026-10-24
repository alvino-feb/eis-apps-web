import { useState,useEffect } from "react";
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
import { productStore } from "./products.store.js";
import { productReferenceStore } from "../tables/product-reference/product-reference.store.js"
import ProductModal from "./components/ProductModal.jsx";

export default function Products(){
    const [openModal, setOpenModal] = useState(false);
    const [originalData, setOriginalData] = useState(null);
    const [editingData, setEditingData] = useState(null);
    
    const [page, setPage]=useState(1);
    const [limit, setLimit]=useState(20);
    const [search, setSearch]=useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [sortBy]=useState("name");
    const [sortOrder]=useState("asc");

    const businessId = useAuthStore((state) => state.businessId);
    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);
    const businessMemberId = selectedBusinessMember.businessMemberId;

    const loading = productStore((state) => state.loading.product);
    const fetchProduct = productStore((state) => state.fetchProduct);
    const product = productStore((state) => state.product);
    const createProduct = productStore((state) => state.createProduct);
    const updateProduct = productStore((state) => state.updateProduct);
    const deleteProduct = productStore((state) => state.deleteProduct);

    const fetchCategory = productReferenceStore((state) => state.fetchCategory); 
    const fetchCategoryOption = productReferenceStore((state) => state.fetchCategoryOption); 
    const category = productReferenceStore((state) => state.category);
    const categoryOptions = productReferenceStore((state) => state.categoryOptions);

    const fetchBrand = productReferenceStore((state) => state.fetchBrand); 
    const brand = productReferenceStore((state) => state.brand);

    const fetchUnit = productReferenceStore((state) => state.fetchUnit); 
    const unit = productReferenceStore((state) => state.unit);

    const saving = productStore((state) => state.loading.saveProduct);
    const [refreshing, setRefreshing] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

      const {
        showSuccess,
        showError,
        showWarning,
    } = useToastStore();

    const initProduct = {
        categoryId: "",
        code: "",
        name: "",
        description: "",
        sku: "",
        type: "",
        unitId:null,
        brandId: null,
        barcode: null,
        isActive: true,
    };

    const [filters, setFilters] = useState({
        categoryId: "",
        isActive: "",
    });

    const [appliedFilters, setAppliedFilters] = useState({
        categoryId: "",
        isActive: "",
    });

    /*
        * =========================================================
        * DATA
        * =========================================================
    */
    const rows = product?.data ?? [];
    const meta = product?.meta ?? {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
    };

    const productCategoryRows = categoryOptions?.data ?? [];
    const productCategoryOptions =
    productCategoryRows.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
    }));

    const brandRows = brand?.data ?? [];
    const brandOptions =
    brandRows.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
    }));

    const unitRows = unit?.data ?? [];
    const unitOptions =
    unitRows.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
    }));

    useEffect(() => {      
        if (!businessId || !businessMemberId) return;

            fetchCategoryOption({
                businessId,
                businessMemberId,
                page: 1,
                limit: 1000,
                sortBy: "code",
                sortOrder: "asc",
            });

            fetchBrand({
                businessId,
                businessMemberId
            });

            fetchUnit({
                businessId,
                businessMemberId
            });
        }, 
        [
            businessId,
            businessMemberId,
            fetchCategoryOption,
            fetchBrand,
            fetchUnit
        ]
    );

    useEffect(()=>{
            if (!businessId || !businessMemberId) return;

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
            
            fetchProduct(query);
        },

        [
            businessId,
            businessMemberId,
            page,
            limit,
            appliedSearch,
            sortBy,
            sortOrder,
            fetchProduct,
            appliedFilters
        ]
    );

    /*
        * =========================================================
        * FILTER
        * =========================================================
    */
    const filterFields = [
        {
            key: "productCategoryId",
            label: "Category",
            type: "select",
            valueField: "id",
            placeholder: "- Select -",
            options: productCategoryOptions,
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

    const handleCreate = () => {
        setEditingData(null);
        setOriginalData(null);
        setOpenModal(true);
    };

    const handleApplyFilter = () => {
        setPage(1);
        setAppliedFilters(filters);
    };

    const handleResetFilter = () => {
        setFilters({
            categoryId: "",
            isActive: "",
        });
        setAppliedFilters({
            categoryId: "",
            isActive: "",
        });
        setPage(1);
    };

    const columns = [
        {
            key: "code",
            title: "Code",
            width: 140,
        },
        {
            key: "name",
            title: "Name",
            width: 200,
        },
        {
            key: "description",
            title: "Description",
            width: 300,
        },
        {
            key: "category",
            title: "Category",
            width: 150,
            render: (row) => row.ProductCategory?.code ?? "-"
        },
        {
            key: "sku",
            title: "SKU",
            width: 200,
        },
        {
            key: "type",
            title: "Type",
            width: 150,
        },
        {
            key: "unitId",
            title: "Unit",
            width: 140,
            render: (row) => row.UnitProduct?.code ?? "-"
        },
        {
            key: "brandId",
            title: "Brand",
            width: 140,
        },
        {
            key: "barcode",
            title: "Barcode",
            width: 200,
        },
        {
            key: "isActive",
            title: "Status",
            render: (row) => (
                <StatusBadge 
                    active={row.isActive}
                />
            ),
            width: 140,
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
            name: row.name ?? null,
            categoryId: row.categoryId ?? null,
            description: row.description ?? null,
            sku: row.sku ?? null,
            type: row.type ?? null,
            unitId: row.unitId ?? null,
            brandId: row.brandId ?? null,
            barcode: row.barcode ?? null,
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

    const handleSave = async (values,id) => {
        try {
            if (editingData) {   
                const changed= hasChanges(
                    originalData,
                    values,
                    [
                        "code",
                        "name",
                        "description",
                        "categoryId",
                        "sku",
                        "type",
                        "unitId",
                        "brandId",
                        "barcode",
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

                const data = {
                        businessId: businessId,
                        businessMemberId: businessMemberId,
                        id: id,
                        code: values.code ?? "",
                        name: values.name ?? null,
                        categoryId: values.categoryId ?? null,
                        description: values.description ?? null,
                        sku: values.sku ?? null,
                        type: values.type ?? null,
                        unitId: values.unitId ?? null,
                        brandId: values.brandId ?? null,
                        barcode: values.barcode ?? null,
                        isActive: values.isActive ?? true,
                    };

                await updateProduct(
                    data
                );
            } else {
                const data = {
                    businessId: values.businessId,
                    businessMemberId: values.businessMemberId,
                    code: values.code ?? "",
                    name: values.name ?? null,
                    categoryId: values.categoryId ?? null,
                    description: values.description ?? null,
                    sku: values.sku ?? null,
                    type: values.type ?? null,
                    unitId: values.unitId ?? null,
                    brandId: values.brandId ?? null,
                    barcode: values.barcode ?? null,
                    isActive: values.isActive ?? true,
                };

                await createProduct(
                    data
                );
            }

            await fetchProduct({
                businessId,
                businessMemberId,
                page,
                limit,
                search : appliedSearch,
                sortBy,
                sortOrder,
                ...appliedFilters,
            });
            showSuccess(
                "Product saved successfully."
            );
        } catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to save product."
            );
        } 
    };

    const handleDelete = async (row) => {
        const confirmed = await confirm({
            title: "Delete Product",
            message: `Are you sure you want to delete product "${row.name}"?`,
            variant: "danger",
            confirmText: "Delete",
            cancelText: "Cancel",
        });

        if (!confirmed) return;
        
        try {
            setDeletingId(row.id);
            await deleteProduct(
                businessId,
                businessMemberId,
                row.id
            );

            await fetchProduct({
                businessId,
                businessMemberId,
                page,
                limit,
                search : appliedSearch,
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

            await fetchProduct({
                businessId,
                businessMemberId,
                page,
                limit,
                search : appliedSearch,
                sortBy,
                sortOrder,
                ...appliedFilters,
            });

        } finally {
            setRefreshing(false);
        }
    };

    return (
        <>
            <div className="space-y-4 p-3">
                <PageHeader
                    title="Product"
                    // description="Manage product category hierarchy"
                />
                <Card>

                    <CardHeader
                    title="Product List"
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setAppliedSearch(search.trim());
                                            setPage(1);
                                        }
                                    }}
                                    placeholder="Search product..."
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
                        minWidth={1200}
                        horizontalScroll={true}
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
            <ProductModal
                open={openModal}
                onClose={handleCloseModal}
                editingData={editingData}
                businessId={businessId}
                businessMemberId={businessMemberId}
                categoryOptions={productCategoryOptions}
                brandOptions={brandRows}
                unitOptions={unitRows}
                onCreate={handleSave}
                onUpdate={handleSave}
            />

        </>

    );
}