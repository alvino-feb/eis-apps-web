import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Modal,
    Button,
} from "../../../../components/ui";

import POSGeneralTab from "../tabs/POSGeneralTab";
// import ProductDetailTab from "../tabs/ProductDetailTab";
// import ProductSeoTab from "../tabs/ProductSeoTab";

export default function POSModal({
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
        outletId: editingData?.outletId ?? "",
        mainWarehouseId: editingData?.mainWarehouseId ?? null,
        returnWarehousId: editingData?.returnWarehousId ?? null,
        priceListId: editingData?.priceListId ?? null,
        posName: editingData?.posName ?? "",
        receiptHeader: editingData?.receiptHeader ?? null,
        receiptFooter: editingData?.receiptFooter ?? null,
        isActive: editingData?.isActive ?? true,
    };

    const validationSchema = Yup.object({
        outletId: Yup.string()
            .required("Outlet is required")
            .max(50),

        mainWarehouseId: Yup.string()
            .required("Main warehouse is required")
            .max(150),

        returnWarehousId: Yup.string()
            .required("Return warehouse is required"),

        priceListId: Yup.string()
            .required("Pricelist is required"),

        posName: Yup.string()
            .required("POS name is required"),

        receiptHeader: Yup.string()
        .required("Receipt header is required"),

        receiptFooter: Yup.string()
        .required("Receipt footer is required"),

        // costPrice: Yup.number()
        //     .typeError("Cost price must be a number")
        //     .min(0, "Cost price cannot be negative"),
    });


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
                    outletId: values.outletId === ""
                            ? null
                            : Number(values.outletId),
                    mainWarehouseId: values.mainWarehouseId === ""
                            ? null
                            : Number(values.mainWarehouseId),
                    returnWarehousId: values.returnWarehousId === ""
                            ? null
                            : Number(values.returnWarehousId),
                    priceListId: values.priceListId === ""
                            ? null
                            : Number(values.priceListId),
                    posName: values.posName === ""
                            ? null
                            : Number(values.posName),
                    receiptHeader: values.receiptHeader === ""
                            ? null
                            : Number(values.receiptHeader),
                    receiptFooter: values.receiptFooter === ""
                            ? null
                            : Number(values.receiptFooter),
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
                    "Failed to save ",
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
            key: "general",
            label: "POS General Setting",
        },
        {
            key: "user",
            label: "POS User",
        }
    ];
    
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                editingData
                    ? "Edit POS Setup"
                    : "Add POS Setup"
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
                        <POSGeneralTab
                            formik={formik}
                            categoryOptions={categoryOptions}
                            brandOptions={brandOptions}
                            unitOptions={unitOptions}
                        />

                    )}

                    {/* {activeTab === "detail" && (
                        <ProductDetailTab
                            formik={formik}
                        />
                    )}

                    {activeTab === "seo" && (
                        <ProductSeoTab
                            formik={formik}
                        />
                    )} */}
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