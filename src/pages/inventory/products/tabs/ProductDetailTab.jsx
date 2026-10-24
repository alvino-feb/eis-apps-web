import {
    TextInput,
    Checkbox,
} from "../../../../components/ui";

export default function ProductDetailTab({
    formik,
}) {

    return (
        <div className="grid gap-5">

            {/* ==========================================
                SKU / BARCODE
            ========================================== */}
            <div className="grid grid-cols-2 gap-4">

                <TextInput
                    label="SKU"
                    name="sku"
                    value={formik.values.sku}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <TextInput
                    label="Barcode"
                    name="barcode"
                    value={ formik.values.barcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

            </div>


            {/* ==========================================
                PRICE
            ========================================== */}
            <div className="grid grid-cols-2 gap-4">

                <TextInput
                    label="Cost Price"
                    name="costPrice"
                    type="number"
                    value={
                        formik.values.costPrice
                    }
                    onChange={
                        formik.handleChange
                    }
                />

                <TextInput
                    label="Selling Price"
                    name="sellingPrice"
                    type="number"
                    value={
                        formik.values
                            .sellingPrice
                    }
                    onChange={
                        formik.handleChange
                    }
                />

            </div>


            {/* ==========================================
                STOCK
            ========================================== */}
            <div className="grid grid-cols-2 gap-4">

                <TextInput
                    label="Minimum Stock"
                    name="minimumStock"
                    type="number"
                    value={
                        formik.values
                            .minimumStock
                    }
                    onChange={
                        formik.handleChange
                    }
                />

                <TextInput
                    label="Maximum Stock"
                    name="maximumStock"
                    type="number"
                    value={
                        formik.values
                            .maximumStock
                    }
                    onChange={
                        formik.handleChange
                    }
                />

            </div>


            {/* ==========================================
                DIMENSION
            ========================================== */}
            <div>

                <label className="text-sm font-medium">
                    Dimension
                </label>

                <div className="grid grid-cols-4 gap-3 mt-1">

                    <TextInput
                        placeholder="Weight"
                        name="weight"
                        type="number"
                        value={
                            formik.values.weight
                        }
                        onChange={
                            formik.handleChange
                        }
                    />

                    <TextInput
                        placeholder="Length"
                        name="length"
                        type="number"
                        value={
                            formik.values.length
                        }
                        onChange={
                            formik.handleChange
                        }
                    />

                    <TextInput
                        placeholder="Width"
                        name="width"
                        type="number"
                        value={
                            formik.values.width
                        }
                        onChange={
                            formik.handleChange
                        }
                    />

                    <TextInput
                        placeholder="Height"
                        name="height"
                        type="number"
                        value={
                            formik.values.height
                        }
                        onChange={
                            formik.handleChange
                        }
                    />

                </div>

            </div>


            {/* ==========================================
                INVENTORY
            ========================================== */}
            <div className="space-y-3">

                <Checkbox
                    label="Track Inventory"
                    name="trackInventory"
                    checked={
                        formik.values
                            .trackInventory
                    }
                    onChange={
                        formik.handleChange
                    }
                />

                <Checkbox
                    label="Allow Negative Stock"
                    name="allowNegativeStock"
                    checked={
                        formik.values
                            .allowNegativeStock
                    }
                    onChange={
                        formik.handleChange
                    }
                />

            </div>


            {/* ==========================================
                TRANSACTION
            ========================================== */}
            <div className="space-y-3">

                <Checkbox
                    label="Sellable"
                    name="isSellable"
                    checked={
                        formik.values
                            .isSellable
                    }
                    onChange={
                        formik.handleChange
                    }
                />

                <Checkbox
                    label="Purchasable"
                    name="isPurchasable"
                    checked={
                        formik.values
                            .isPurchasable
                    }
                    onChange={
                        formik.handleChange
                    }
                />

            </div>

        </div>
    );
}