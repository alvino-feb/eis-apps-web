import {
    TextInput,
    Select,
    Checkbox,
} from "../../../../components/ui";
import { PRODUCT_TYPE_OPTIONS } from "../../../../common/constants/enum.js";

export default function POSGeneralTab({
    formik,
    categoryOptions = [],
    brandOptions = [],
    unitOptions = [],
}) {

    return (
        <div className="grid gap-5">
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Outlet
                </label>
                <TextInput
                    name="outletId"
                    value={formik.values.outletId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!!formik.values.outletId}
                    error={
                        formik.touched.outletId &&
                        formik.errors.outletId
                    }
                />
                {formik.touched.outletId &&
                formik.errors.outletId && (
                    <p className="mt-1 text-xs text-red-500">
                        {formik.errors.outletId}
                    </p>
                )}
            </div>
            
            <div>
                <label className="mb-1 block text-sm font-medium">
                    POS Name
                </label>
                <TextInput
                    name="posName"
                    value={formik.values.posName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.posName &&
                        formik.errors.posName
                    }
                />
                {formik.touched.posName &&
                formik.errors.posName && (
                    <p className="mt-1 text-xs text-red-500">
                        {formik.errors.posName}
                    </p>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">
                    Main Warehouse
                </label>
                <textarea
                    name="mainWarehouse"
                    value={formik.values.mainWarehouse}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={2}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Return Warehouse
                    </label>
                    <Select
                        name="returnWarehouse"
                        options={PRODUCT_TYPE_OPTIONS}
                        value={formik.values.returnWarehouse}
                        onChange={(value) =>
                            formik.setFieldValue(
                                "returnWarehouse",
                                value
                            )
                        }
                        error={
                            formik.touched.returnWarehouse &&
                            formik.errors.returnWarehouse
                        }
                    />
                    {formik.touched.returnWarehouse &&
                    formik.errors.returnWarehouse && (
                        <p className="mt-1 text-xs text-red-500">
                            {formik.errors.returnWarehouse}
                        </p>
                    )}
                </div>
                
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Receipt Header
                    </label>
                    <Select
                        name="categoryId"
                        options={ categoryOptions}
                        value={formik.values.categoryId}
                        onChange={(value) =>
                            formik.setFieldValue(
                                "categoryId",
                                value
                            )
                        }
                        error={
                            formik.touched.categoryId &&
                            formik.errors.categoryId
                        }
                    />
                    {formik.touched.categoryId &&
                    formik.errors.categoryId && (
                        <p className="mt-1 text-xs text-red-500">
                            {formik.errors.categoryId}
                        </p>
                    )}
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Unit
                    </label>
                    <Select
                        name="unitId"
                        options={unitOptions}
                        value={formik.values.unitId}
                        onChange={(value) =>
                            formik.setFieldValue(
                                "unitId",
                                value
                            )
                        }
                        error={
                            formik.touched.unitId &&
                            formik.errors.unitId
                        }
                    />
                    {formik.touched.unitId &&
                    formik.errors.unitId && (
                        <p className="mt-1 text-xs text-red-500">
                            {
                                formik.errors
                                    .unitId
                            }
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Brand
                    </label>
                    <Select
                        name="brandId"
                        options={brandOptions}
                        value={formik.values.brandId}
                        onChange={(value) =>
                            formik.setFieldValue(
                                "brandId",
                                value
                            )
                        }
                    />
                </div>
            </div>
            
            <div>
                <label className="mb-1 block text-sm font-medium">
                    SKU
                </label>
                <TextInput
                    name="sku"
                    value={formik.values.sku}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.sku &&
                        formik.errors.sku
                    }
                />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">
                    Barcode
                </label>
                <TextInput
                    name="barcode"
                    value={formik.values.barcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.barcode &&
                        formik.errors.barcode
                    }
                />
            </div>

            <Checkbox
                label="Active"
                name="isActive"
                checked={formik.values.isActive}
                onChange={(e) =>
                    formik.setFieldValue(
                        "isActive",
                        e.target.checked
                    )
                }
            />

        </div>
    );
}