import {
    TextInput,
    Select,
    Checkbox,
} from "../../../../components/ui";
import { PRODUCT_TYPE_OPTIONS } from "../../../../common/constants/enum.js";

export default function ProductBasicTab({
    formik,
    categoryOptions = [],
    brandOptions = [],
    unitOptions = [],
}) {

    return (
        <div className="grid gap-5">
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Code
                </label>
                <TextInput
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!!formik.values.code}
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

            <div>
                <label className="text-sm font-medium">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={2}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Type
                    </label>
                    <Select
                        name="type"
                        options={PRODUCT_TYPE_OPTIONS}
                        value={formik.values.type}
                        onChange={(value) =>
                            formik.setFieldValue(
                                "type",
                                value
                            )
                        }
                        error={
                            formik.touched.type &&
                            formik.errors.type
                        }
                    />
                    {formik.touched.type &&
                    formik.errors.type && (
                        <p className="mt-1 text-xs text-red-500">
                            {formik.errors.type}
                        </p>
                    )}
                </div>
                
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        Category
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