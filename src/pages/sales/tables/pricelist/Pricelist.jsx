import { useState, useEffect, useCallback } from "react";
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
    PageHeader,
    Card,
    CardHeader,
    Toolbar,
    SearchInput,
    DataTableV2,
    Modal,
    Button,
    StatusBadge,
    Select,
    FilterPanel,
    TextInput,
    Checkbox,
} from "../../../../components/ui";

import { useAppStore } from "../../../../store/appStore";
import { useAuthStore } from "../../../../store/authStore.js";
import useToastStore from "../../../../store/toastStore";

import {
    hasChanges,
} from "../../../../common/helpers/object.js";

import { confirm } from "../../../../common/helpers/confirm.js";

import {
    formatDate,
    formatDateInput,
} from "../../../../common/helpers/date.js";

import {formatNumber} from "../../../../common/helpers/number.js";

import { pricelistStore } from "./pricelist.store.js";

import {
    PRICE_TYPE_OPTIONS,
} from "../../../../common/constants/enum.js";

export default function Pricelist() {
    /*
     * =========================================================
     * AUTH
     * =========================================================
     */
    const businessId = useAuthStore((state) => state.businessId);
    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);
    const businessMemberId =selectedBusinessMember?.businessMemberId;

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
     * PRICELIST STORE
     * =========================================================
     */
    const loadingPricelist = pricelistStore((state) => state.loading.pricelist);
    const savingPricelist = pricelistStore((state) => state.loading.savePricelist);
    const fetchPricelist = pricelistStore((state) => state.fetchPricelist);
    const pricelist = pricelistStore((state) => state.pricelist);
    const createPricelist = pricelistStore((state) => state.createPricelist);
    const updatePricelist = pricelistStore((state) => state.updatePricelist);
    const deletePricelist = pricelistStore((state) => state.deletePricelist);

    /*
     * =========================================================
     * PRODUCT PRICE STORE
     * =========================================================
     */
    const fetchProductPrice = pricelistStore((state) => state.fetchProductPrice);
    const loadingProductPrice = pricelistStore((state) => state.loading.productPrice);
    const productPrice = pricelistStore((state) => state.productPrice);
    const createProductPrice = pricelistStore((state) => state.createProductPrice);
    const updateProductPrice = pricelistStore((state) => state.updateProductPrice);
    const deleteProductPrice = pricelistStore((state) => state.deleteProductPrice);
    const clearProductPrice = pricelistStore((state) => state.clearProductPrice);
    const savingProductPrice = pricelistStore((state) => state.loading.saveProductPrice);
    /*
     * =========================================================
     * PRICELIST PRODUCT OPTIONS STORE
     * =========================================================
     */
    const fetchPricelistProductOptions = pricelistStore((state) => state.fetchPricelistProductOptions);
    const pricelistProductOptions = pricelistStore((state) => state.pricelistProductOptions);

    /*
     * =========================================================
     * PRICELIST TABLE STATE
     * =========================================================
     */
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const sortBy = "code";
    const sortOrder = "asc";

    /*
     * =========================================================
     * PRODUCT PRICE TABLE STATE
     * =========================================================
     */
    const [productPage, setProductPage] = useState(1);
    const [productLimit, setProductLimit] = useState(20);
    const productSortBy = "priceType";
    const productSortOrder = "asc";

    /*
     * =========================================================
     * SELECTED PRICELIST
     * =========================================================
     */
    const [selectedPricelist, setSelectedPricelist] = useState(null);

    /*
     * =========================================================
     * SELECTED PRODUCT PRICE
     * =========================================================
     */
    const [selectedProductPrice, setSelectedProductPrice] = useState(null);

    /*
     * =========================================================
     * MODAL STATE
     * =========================================================
     */
    const [openModal, setOpenModal] = useState(false);
    const [openModalProduct, setOpenModalProduct] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [editingDataProduct, setEditingDataProduct] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [originalDataProduct, setOriginalDataProduct] = useState(null);

    /*
     * =========================================================
     * UI STATE
     * =========================================================
     */
    const {setLoading} = useAppStore();
    const [refreshing, setRefreshing] = useState(false);
    const [refreshingProduct, setRefreshingProduct] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deletingProductId, setDeletingProductId] = useState(null);

    /*
     * =========================================================
     * FILTER
     * =========================================================
     */
    const [filters, setFilters] = useState({isActive: "",});
    const [appliedFilters, setAppliedFilters] = useState({isActive: "",});

    /*
     * =========================================================
     * DATA
     * =========================================================
     */
    const rowsPricelist = pricelist?.data ?? [];
    const metaPricelist = pricelist?.meta ?? {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
    };

    const rowsProduct = productPrice?.data ?? [];
    const metaProduct = productPrice?.meta ?? {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 1,
        hasPrevious: false,
        hasNext: false,
    };

    const pricelistProductOptionRows = pricelistProductOptions?.data ?? [];
    const pricelistProductOption =
    pricelistProductOptionRows.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
    }));
    

    /*
     * =========================================================
     * FILTER FIELDS
     * =========================================================
     */
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
     * FETCH PRICELIST
     * =========================================================
     */
    const loadPricelist = useCallback(async () => {
        if (!businessId || !businessMemberId) {
            return;
        }

        await fetchPricelist({
            businessId,
            businessMemberId,
            page,
            limit,
            search: appliedSearch,
            isActive: appliedFilters.isActive,
            sortBy,
            sortOrder,
        });

    }, [
        businessId,
        businessMemberId,
        page,
        limit,
        appliedSearch,
        appliedFilters,
        fetchPricelist,
    ]);

    useEffect(() => {
        loadPricelist();
    }, [loadPricelist]);

    /*
     * =========================================================
     * FETCH PRODUCT PRICE
     * =========================================================
     */
    const loadProductPrice = useCallback(async () => {
        if (
            !businessId ||
            !businessMemberId ||
            !selectedPricelist?.id
        ) {
            clearProductPrice();
            return;
        }

        await fetchProductPrice({
            businessId,
            businessMemberId,
            priceListId: selectedPricelist.id,
            page: productPage,
            limit: productLimit,
            sortBy: productSortBy,
            sortOrder: productSortOrder,
        });

    }, [
        businessId,
        businessMemberId,
        selectedPricelist,
        productPage,
        productLimit,
        fetchProductPrice,
        clearProductPrice,
    ]);

    useEffect(() => {
        loadProductPrice();
    }, [loadProductPrice]);


    /*
     * =========================================================
     * SELECT PRICELIST
     * =========================================================
     */
    const handleSelectPricelist = (row) => {
        if (selectedPricelist?.id === row.id) {
            return;
        }

        setSelectedPricelist(row);
        setProductPage(1);
        clearProductPrice();

        fetchPricelistProductOptions({
            businessId,
            businessMemberId,
            priceListId: row.id,
        })
    };

    /*
     * =========================================================
     * SELECT PRODUCT RPICE
     * =========================================================
     */
    const handleSelectProductPrice = (row) => {
        if (selectedProductPrice?.id === row.id) {
            return;
        }
        setSelectedProductPrice(row);
    };

    /*
     * =========================================================
     * PRICELIST MODAL
     * =========================================================
     */
    const handleCreate = () => {
        setEditingData(null);
        setOriginalData(null);
        setOpenModal(true);
    };

    const handleEdit = (row) => {
        setOriginalData(row);
        setEditingData(row);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        formik.resetForm();
        setOpenModal(false);
        setEditingData(null);
        setOriginalData(null);
    };

    /*
     * =========================================================
     * PRODUCT PRICE MODAL
     * =========================================================
     */
    const handleCreateProduct = () => {
        if (!selectedPricelist) {
            showWarning(
                "Please select a pricelist first."
            );
            return;
        }

        setEditingDataProduct(null);
        setOriginalDataProduct(null);
        setOpenModalProduct(true);
    };

    const handleEditProduct = (row) => {
        handleSelectProductPrice(row)
        setOriginalDataProduct(row);
        setEditingDataProduct(row);
        setOpenModalProduct(true);
    };

    const handleCloseModalProduct = () => {
        formikProduct.resetForm();
        setOpenModalProduct(false);
        setEditingDataProduct(null);
        setOriginalDataProduct(null);
    };

    /*
     * =========================================================
     * FILTER
     * =========================================================
     */
    const handleApplyFilter = () => {
        setPage(1);
        setAppliedFilters({
            ...filters,
        });
    };

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
     * PRICELIST VALIDATION
     * =========================================================
     */
    const pricelistValidationSchema = Yup.object({
        code: Yup.string()
            .required("Code is required")
            .max(50, "Code maximum 50 characters"),

        name: Yup.string()
            .required("Name is required")
            .max(100,"Name maximum 100 characters"),

        startAt: Yup.date()
            .required("Start Date is required"),

        expiresAt: Yup.date()
            .nullable()
            .test(
                "after-start",
                "Expiry Date must be after Start Date",
                function (value) {
                    const {startAt} = this.parent;

                    if (!value || !startAt) {
                        return true;
                    }

                    return (
                        new Date(value) >=
                        new Date(startAt)
                    );
                }
            ),
    });

    /*
     * =========================================================
     * PRODUCT PRICE VALIDATION
     * =========================================================
     */
    const productPriceValidationSchema =
        Yup.object({

            productId: Yup.string()
                .required(
                    "Product is required"
                ),

            priceType: Yup.string()
                .required(
                    "Price Type is required"
                ),

            price: Yup.number()
                .typeError(
                    "Price must be a number"
                )
                .required(
                    "Price is required"
                )
                .min(
                    0,
                    "Price cannot be negative"
                ),
        });

    /*
     * =========================================================
     * PRICELIST FORMIK
     * =========================================================
     */
    const formik = useFormik({
        initialValues:
            editingData ? {
                id: editingData.id ?? "",
                code: editingData.code ?? "",
                name: editingData.name ?? "",
                description: editingData.description ?? "",
                startAt: formatDateInput(editingData.startAt),
                expiresAt: formatDateInput(editingData.expiresAt),
                isActive: editingData.isActive ?? true,
            } : {
                code: "",
                name: "",
                description: "",
                startAt: new Date().toISOString().split("T")[0],
                expiresAt: "",
                isActive: true,
            },

        enableReinitialize: true,

        pricelistValidationSchema,

        onSubmit: async (values) => {
            try {
                /*
                 * =========================================
                 * UPDATE
                 * =========================================
                 */
                if (editingData) {
                    const changed =
                        hasChanges(
                            originalData,
                            values,
                            [
                                "code",
                                "name",
                                "description",
                                "startAt",
                                "expiresAt",
                                "isActive",
                            ]
                        );

                    if (!changed) {
                        showWarning("No changes detected.");
                        handleCloseModal();
                        return;
                    }

                    await updatePricelist(
                        businessId,
                        businessMemberId,
                        editingData.id,
                        values
                    );

                }

                /*
                 * =========================================
                 * CREATE
                 * =========================================
                 */
                else {
                    await createPricelist(
                        businessId,
                        businessMemberId,
                        values
                    );
                }

                handleCloseModal();

                await loadPricelist();

                showSuccess("Pricelist saved successfully.");

            } catch (err) {
                showError(
                    err.response?.data?.message ??
                    "Failed to save pricelist."
                );
            }
        },
    });


    /*
     * =========================================================
     * PRODUCT PRICE FORMIK
     * =========================================================
     */
    const formikProduct = useFormik({
        initialValues:
            editingDataProduct ? {
                id: editingDataProduct.id ?? "",
                priceListId: editingDataProduct.priceListId ?? selectedPricelist?.id ?? "",
                productId: editingDataProduct.productId ?? "",
                priceType: editingDataProduct.priceType ?? "SELL",
                price: editingDataProduct.price ?? "",
                isActive: editingDataProduct.isActive ?? true,
            }
            : {
                priceListId: selectedPricelist?.id ?? "",
                productId: "",
                priceType: "SELL",
                price: "",
                isActive: true,
            },

        enableReinitialize: true,

        validationSchema: productPriceValidationSchema,

        onSubmit: async (values) => {        
            try {
                /*
                 * =========================================
                 * SAFETY CHECK
                 * =========================================
                 */
                if (!selectedPricelist?.id) {
                    showWarning("Please select a pricelist first.");
                    return;
                }

                /*
                 * =========================================
                 * PAYLOAD
                 * =========================================
                 */
                const payload = {
                    priceListId: selectedPricelist.id,
                    productId: values.productId,
                    priceType: values.priceType,
                    price: Number(values.price),
                    isActive: values.isActive,
                };

                setLoading(true);

                /*
                 * =========================================
                 * UPDATE
                 * =========================================
                 */

                if (editingDataProduct) {

                    const changed =
                        hasChanges(
                            originalDataProduct,
                            values,
                            [
                                "productId",
                                "priceType",
                                "price",
                                "isActive",
                            ]
                        );

                    if (!changed) {
                        showWarning("No changes detected.");
                        handleCloseModalProduct();
                        return;
                    }
                    
                    await updateProductPrice(
                        businessId,
                        businessMemberId,
                        selectedPricelist.id,
                        payload.productId,
                        editingDataProduct.id,
                        payload
                    );
                }
                /*
                 * =========================================
                 * CREATE
                 * =========================================
                 */
                else {                   
                    await createProductPrice(
                        businessId,
                        businessMemberId,
                        payload
                    );
                }


                handleCloseModalProduct();

                await loadProductPrice();

                showSuccess("Product price saved successfully.");

            } catch (err) {
                showError(
                    err.response?.data?.message ??
                    "Failed to save product price."
                );
            }
            finally {
                setLoading(false);
            }
        },
    });

    /*
     * =========================================================
     * DELETE PRICELIST
     * =========================================================
     */
    const handleDelete = async (row) => {
        const confirmed =
            await confirm({
                title: "Delete Pricelist",
                message: `Are you sure you want to delete pricelist "${row.name}"?`,
                variant: "danger",
                confirmText: "Delete",
                cancelText: "Cancel",
            });

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(row.id);

            await deletePricelist(
                businessId,
                businessMemberId,
                row.id
            );

            /*
             * If deleted row was selected
             */
            if (selectedPricelist?.id === row.id
            ) {
                setSelectedPricelist(null);
                clearProductPrice();
            }

            await loadPricelist();

            showSuccess("Pricelist deleted successfully.");

        } catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to delete pricelist."
            );

        } finally {
            setDeletingId(null);
        }
    };

    /*
     * =========================================================
     * DELETE PRODUCT PRICE
     * =========================================================
     */
    const handleDeleteProduct = async (row) => {       
        const productName =
            row.name ??
            row.code ??
            "this product";

        const confirmed =
            await confirm({
                title: "Delete Product Price",
                message: `Are you sure you want to delete product price "${productName}"?`,
                variant: "danger",
                confirmText: "Delete",
                cancelText: "Cancel",
            });

        if (!confirmed) {
            return;
        }

        try {
            setDeletingProductId(row.id);

            await deleteProductPrice(
                businessId,
                businessMemberId,
                row.id
            );

            await loadProductPrice();

            showSuccess("Product price deleted successfully.");

        } catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to delete product price."
            );

        } finally {
            setDeletingProductId(null);
        }
    };

    /*
     * =========================================================
     * REFRESH PRICELIST
     * =========================================================
     */
    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await loadPricelist();
        } finally {
            setRefreshing(false);
        }
    };

    /*
     * =========================================================
     * REFRESH PRODUCT PRICE
     * =========================================================
     */
    const handleRefreshProduct = async () => {
        if (!selectedPricelist) {
            showWarning("Please select a pricelist first.");
            return;
        }

        try {
            setRefreshingProduct(true);
            await loadProductPrice();
        } finally {
            setRefreshingProduct(false);
        }
    };

    /*
     * =========================================================
     * PRICELIST COLUMNS
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
            key: "startAt",
            title: "Start",
            render: (row) => formatDate(row.startAt),
        },
        {
            key: "expiresAt",
            title: "Expired",
            render: (row) => formatDate(row.expiresAt),
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
                        type="button"
                        onClick={(e) => {e.stopPropagation();
                            handleEdit(row);
                        }}
                        disabled={deletingId === row.id}
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {e.stopPropagation();
                            handleDelete(row);
                        }}
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
     * PRODUCT PRICE COLUMNS
     * =========================================================
     */
    const columnsProductPrice = [
        {
            key: "Product",
            title: "code",
            render: (rowsProduct) => (
                <span>
                    <span className="font-medium">
                        {rowsProduct.code ?? "-"}
                    </span>
                    {" - "}
                    {rowsProduct.name ?? "-"}
                </span>
            ),
        },
        {
            key: "priceType",
            title: "Type",
            render: (rowsProduct) => rowsProduct.priceType
        },
        {
            key: "price",
            title: "Price",
            render: (rowsProduct) => formatNumber(rowsProduct.price)
        },
        {
            key: "isActive",
            title: "Status",
            render: (rowsProduct) => (
                <StatusBadge
                    active={rowsProduct.isActive}
                />
            ),
        },
        {
            key: "action",
            title: "Action",
            render: (rowsProduct) => (
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEditProduct(rowsProduct);
                        }}
                        disabled={deletingProductId === rowsProduct.id}
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(rowsProduct);
                        }}
                        disabled={deletingProductId === rowsProduct.id}
                        className="p-2 rounded-md hover:bg-red-50 text-red-600"
                    >
                        {deletingProductId === rowsProduct.id ? (
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
        <>
            <div className="space-y-4 p-3">
                <PageHeader
                    title="Pricelist"
                />

                {/* =================================================
                    PRICELIST
                ================================================== */}
                <Card className="h-[400px] flex flex-col">
                    <CardHeader
                        title="Pricelist Header"
                        action={
                            <Button onClick={handleCreate}>
                                <Plus size={14} />
                            </Button>
                        }
                    />

                    <Toolbar
                        left={
                            <div className="flex gap-3">
                                <SearchInput
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter"
                                        ) {
                                            setAppliedSearch(
                                                search.trim()
                                            );
                                            setPage(1);
                                        }
                                    }}
                                    placeholder="Search pricelist..."
                                />
                            </div>
                        }

                        right={
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={handleRefresh}
                                    disabled={refreshing || loadingPricelist}
                                    title="Refresh"
                                >
                                    {refreshing ? (
                                        <Loader2 size={14} className="animate-spin"/>
                                    ) : (
                                        <RefreshCw size={14}/>
                                    )}
                                </Button>

                                <FilterPanel
                                    filters={filterFields}
                                    values={filters}
                                    onChange={(key, value
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
                        height={300}
                        columns={columns}
                        data={rowsPricelist}
                        loading={loadingPricelist}
                        emptyMessage="No pricelist found"
                        onRowClick={handleSelectPricelist}
                        page={page}
                        limit={limit}
                        total={metaPricelist.total}
                        totalPages={metaPricelist.totalPages}
                        onPageChange={setPage}
                        onLimitChange={(
                            value
                        ) => {
                            setLimit(value);
                            setPage(1);
                        }}
                    />
                </Card>

                {/* =================================================
                    PRODUCT PRICE DETAIL
                ================================================== */}
                <Card className="h-[380px] flex flex-col">
                    <CardHeader
                        title="Product Price"
                        // description={
                        //     selectedPricelist
                        //         ? `${selectedPricelist.name} (${selectedPricelist.code})`
                        //         : "Select a price list"
                        // }
                        action={
                            <Button
                                onClick={handleCreateProduct}
                                disabled={!selectedPricelist}
                            >
                                <Plus size={14} />
                            </Button>
                        }
                    />

                    <Toolbar
                        left={
                            <div className="text-sm text-gray-500">
                                {selectedPricelist ? (
                                    <>
                                        Price List:
                                        <span className="ml-1 font-medium text-gray-700">
                                            {selectedPricelist.code} - {selectedPricelist.name}
                                        </span>
                                    </>
                                ) : (
                                    "Please select a pricelist above."
                                )}

                            </div>
                        }

                        right={
                            <Button
                                variant="secondary"
                                onClick={handleRefreshProduct}
                                disabled={
                                    !selectedPricelist ||
                                    refreshingProduct ||
                                    loadingProductPrice
                                }
                                title="Refresh"
                            >
                                {refreshingProduct ? (
                                    <Loader2 size={14} className="animate-spin"/>
                                ) : (
                                    <RefreshCw size={14}/>
                                )}
                            </Button>
                        }
                    />

                    <DataTableV2
                        rowKey="id"
                        height={300}
                        columns={columnsProductPrice}
                        data={rowsProduct}
                        loading={loadingProductPrice}
                        emptyMessage={
                            selectedPricelist
                                ? "No product price found"
                                : "Select a pricelist first"
                        }
                        onRowClick={handleSelectProductPrice}
                        page={productPage}
                        limit={productLimit}
                        total={metaProduct.total}
                        totalPages={metaProduct.totalPages}
                        onPageChange={setProductPage}
                        onLimitChange={(
                            value
                        ) => {
                            setProductLimit(value);
                            setProductPage(1);
                        }}
                    />
                </Card>
            </div>

            {/* =====================================================
                MODAL PRICELIST
            ====================================================== */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                loading={savingPricelist}
                title={
                    editingData
                        ? "Edit Pricelist"
                        : "Add Pricelist"
                }
            >

                <form onSubmit={formik.handleSubmit} className="space-y-3">
                    {/* CODE + NAME */}
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

                    {/* DESCRIPTION */}
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


                    {/* DATE */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Start Date
                            </label>

                            <TextInput
                                type="date"
                                name="startAt"
                                value={formik.values.startAt}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Expiry Date
                            </label>

                            <TextInput
                                type="date"
                                name="expiresAt"
                                value={formik.values.expiresAt}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.expiresAt &&
                                formik.errors.expiresAt && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {formik.errors.expiresAt}
                                    </p>
                                )}
                        </div>
                    </div>

                    {/* ACTIVE */}
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

                    {/* FOOTER */}
                    <div className="flex justify-end gap-2 border-t pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCloseModal}
                            disabled={savingPricelist}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={savingPricelist}
                        >
                            {savingPricelist
                                ? "Saving..."
                                : editingData
                                    ? "Update"
                                    : "Save"}

                        </Button>
                    </div>
                </form>
            </Modal>

            {/* =====================================================
                MODAL PRODUCT PRICE
            ====================================================== */}
            <Modal
                open={openModalProduct}
                onClose={handleCloseModalProduct}
                loading={savingProductPrice}
                title={
                    editingDataProduct
                        ? "Edit Product Price"
                        : "Add Product Price"
                }
            >
                <form
                    onSubmit={formikProduct.handleSubmit}
                    className="space-y-3"
                >
                    {/* PRICELIST */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Pricelist
                        </label>

                        <TextInput
                            value={
                                selectedPricelist
                                    ? `${selectedPricelist.code} - ${selectedPricelist.name}`
                                    : ""
                            }
                            disabled
                        />
                    </div>

                    {/* PRODUCT */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Product
                        </label>
                        
                        {editingDataProduct ?
                            <TextInput
                                name="productId"
                                value={`${editingDataProduct.code} - ${editingDataProduct.name}`}
                                disabled
                            />
                            :
                            <Select
                                name="productId"
                                options={pricelistProductOption}
                                value={formikProduct.values.productId}
                                onChange={(value) =>
                                    formikProduct.setFieldValue(
                                        "productId",
                                        value
                                    )
                                }
                                onBlur={() => formikProduct.setFieldTouched("productId", true)}
                            />
                        }
                        
                        {!editingDataProduct &&
                            formikProduct.touched.productId &&
                            formikProduct.errors.productId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikProduct.errors.productId}
                                </p>
                            )
                        }
                    </div>

                    {/* PRICE TYPE */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Price Type
                        </label>

                        <Select
                            name="priceType"
                            options={PRICE_TYPE_OPTIONS}
                            value={formikProduct.values.priceType}
                            onChange={(value) =>
                                formikProduct.setFieldValue(
                                    "priceType",
                                    value
                                )
                            }
                        />

                        {formikProduct.touched.priceType &&
                            formikProduct.errors.priceType && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikProduct.errors.priceType}
                                </p>
                            )}
                    </div>

                    {/* PRICE */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Price
                        </label>

                        <TextInput
                            name="price"
                            type="number"
                            min="0"
                            value={formikProduct.values.price}
                            onChange={formikProduct.handleChange}
                            onBlur={formikProduct.handleBlur}
                            placeholder="0"
                        />

                        {formikProduct.touched.price &&
                            formikProduct.errors.price && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikProduct.errors.price}
                                </p>
                            )}
                    </div>

                    {/* ACTIVE */}
                    <Checkbox
                        label="Active"
                        checked={formikProduct.values.isActive}
                        onChange={(e) =>
                            formikProduct.setFieldValue(
                                "isActive",
                                e.target.checked
                            )
                        }
                    />

                    {/* FOOTER */}
                    <div className="flex justify-end gap-2 border-t pt-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCloseModalProduct}
                            disabled={savingProductPrice}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={savingProductPrice}
                        >
                           {savingProductPrice
                                ? "Saving..."
                                : editingDataProduct
                                    ? "Update"
                                    : "Save"}

                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}