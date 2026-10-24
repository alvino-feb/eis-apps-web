import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Modal,
    Button,
} from "../../../../components/ui";

import ProductBasicTab from "../tabs/ProductBasicTab";
import ProductDetailTab from "../tabs/ProductDetailTab";
import ProductSeoTab from "../tabs/ProductSeoTab";

export default function ProductModal({
    open,
    onClose,
    editingData,
    onSubmit,
    // saving = false,

    businessId,
    businessMemberId,
    categoryOptions = [],
    brandOptions = [],
    unitOptions = [],

    onCreate,
    onUpdate,
}) {
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("basic");
    const isEdit = Boolean(editingData?.id);

    const initialValues = {
        code: editingData?.code ?? "",
        name: editingData?.name ?? null,
        description: editingData?.description ?? null,
        categoryId: editingData?.categoryId ?? null,
        type: editingData?.type ?? "GOODS",
        unitId: editingData?.unitId ?? null,
        brandId: editingData?.brandId ?? null,
        sku: editingData?.sku ?? null,
        barcode: editingData?.barcode ?? null,
        isActive: editingData?.isActive ?? true,

        costPrice: editingData?.costPrice ?? 0,
        sellingPrice: editingData?.sellingPrice ?? 0,

        minStock: editingData?.minStock ?? 0,
        maxStock: editingData?.maxStock ?? 0,

        weight: editingData?.weight ?? 0,
        length: editingData?.length ?? 0,
        width: editingData?.width ?? 0,
        height: editingData?.height ?? 0,

        allowNegativeStock: editingData?.allowNegativeStock ?? false,

        slug: editingData?.slug ?? null,
        seoTitle: editingData?.seoTitle ?? null,
        seoDescription: editingData?.seoDescription ?? null,
        seoKeywords: editingData?.seoKeywords ?? null,
        trackInventory: editingData?.trackInventory ?? true,
    };

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("Code is required")
            .max(50),

        name: Yup.string()
            .required("Product name is required")
            .max(150),

        categoryId: Yup.string()
            .required("Category is required"),

        unitId: Yup.string()
            .required("Unit is required"),

        type: Yup.string()
            .required("Type is required"),

        // costPrice: Yup.number()
        //     .typeError("Cost price must be a number")
        //     .min(0, "Cost price cannot be negative"),
    });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     console.log("FORM SUBMIT EVENT");

    //     const errors = await formik.validateForm();

    //     console.log("VALIDATION ERRORS:", errors);

    //     if (Object.keys(errors).length > 0) {
    //         console.log("FORM INVALID");
    //         return;
    //     }

    //     console.log("FORM VALID");

    //     formik.handleSubmit(e);
    // };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,

        onSubmit: async (values, { resetForm }) => {
            try {
                setSaving(true);

                const payload = {
                    ...values,

                    businessId,
                    businessMemberId,

                    costPrice: values.costPrice === ""
                            ? null
                            : Number(values.costPrice),

                    sellingPrice: values.sellingPrice === ""
                            ? null
                            : Number(values.sellingPrice),

                    minStock: values.minStock === ""
                            ? null
                            : Number(values.minStock),

                    maxStock: values.maxStock === ""
                            ? null
                            : Number(values.maxStock),

                    weight: values.weight === ""
                            ? null
                            : Number(values.weight),

                    length: values.length === ""
                            ? null
                            : Number(values.length),

                    width: values.width === ""
                            ? null
                            : Number(values.width),

                    height: values.height === ""
                            ? null
                            : Number(values.height),
                };

                if (isEdit) {
                    
                    await onUpdate(
                        payload,
                        editingData.id,
                    );
                } else {
                    await onCreate(payload);
                }
                
                resetForm();

                onClose();

            } catch (error) {
                console.error(
                    "Failed to save product:",
                    error
                );
            } finally {
                setSaving(false);
            }
        },
    });

    if (!open) {
        return null;
    }

    const tabs = [
        {
            key: "basic",
            label: "Basic Information",
        },
        {
            key: "detail",
            label: "Detail Information",
        },
        {
            key: "seo",
            label: "SEO",
        },
    ];
    
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                editingData
                    ? "Edit Product"
                    : "Add Product"
            }
            loading={saving}
        >

            <form onSubmit={formik.handleSubmit}>

                {/* =================================================
                    TABS
                ================================================= */}
                <div className="border-b">
                    <div className="flex gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition
                                    ${
                                        activeTab ===
                                        tab.key
                                            ? "border-blue-600 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}

                    </div>

                </div>

                {/* =================================================
                    TAB CONTENT
                ================================================= */}
                <div className="py-5">
                    {activeTab === "basic" && (
                        <ProductBasicTab
                            formik={formik}
                            categoryOptions={categoryOptions}
                            brandOptions={brandOptions}
                            unitOptions={unitOptions}
                        />

                    )}

                    {activeTab === "detail" && (
                        <ProductDetailTab
                            formik={formik}
                        />
                    )}

                    {activeTab === "seo" && (
                        <ProductSeoTab
                            formik={formik}
                        />
                    )}
                </div>

                {/* =================================================
                    FOOTER
                ================================================= */}
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={saving}
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
                                : "Save"
                        }
                    </Button>
                </div>
            </form>
        </Modal>
    );
}