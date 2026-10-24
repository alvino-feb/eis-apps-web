import api from "../../../../api/axios";

// ======================================================
// PRODUCT CATEGORY
// ======================================================

export const getProductCategoryList = (query) =>
    api.get(
        `/api/inventory/product-category`, {params: query}
    );

export const getProductCategoryOptionList = (query) =>
    api.get(
        `/api/inventory/product-category/options`, {params: query}
    );

export const createProductCategory = (payload) =>
    api.post(
        "/api/inventory/product-category",
        payload
    );

export const updateProductCategory = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
    api.put(
        "/api/inventory/product-category",
        payload,
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );

export const deleteProductCategory = (
    businessId,
    businessMemberId,
    id
) =>
    api.delete(
        "/api/inventory/product-category",
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );


// ======================================================
// BRAND
// ======================================================

export const getBrandList = (query) =>
    api.get(
        `/api/inventory/brand`,{params: query}
    );

export const createBrand = (payload) =>
    api.post(
        "/api/inventory/brand",
        payload
    );

export const updateBrand = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
    api.put(
        "/api/inventory/brand",
        payload,
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );

export const deleteBrand = (
    businessId,
    businessMemberId,
    id
) =>
    api.delete(
        "/api/inventory/brand",
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );


// ======================================================
// UNIT OF MEASURE
// ======================================================

export const getUnitOfMeasureList = (query) =>
    api.get(
        `/api/inventory/uom`,{params: query}
    );

export const createUnitOfMeasure = (payload) =>
    api.post(
        "/api/inventory/uom",
        payload
    );

export const updateUnitOfMeasure = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
    api.put(
        "/api/inventory/uom",
        payload,
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );

export const deleteUnitOfMeasure = (
    businessId,
    businessMemberId,
    id
) =>
    api.delete(
        "/api/inventory/uom",
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );


// ======================================================
// PRODUCT TYPE
// ======================================================

export const getProductTypeList = (query) =>
    api.get(
        `/api/inventory/product-type/${query}`
    );

export const createProductType = (payload) =>
    api.post(
        "/api/inventory/product-type",
        payload
    );

export const updateProductType = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
    api.put(
        "/api/inventory/product-type",
        payload,
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );

export const deleteProductType = (
    businessId,
    businessMemberId,
    id
) =>
    api.delete(
        "/api/inventory/product-type",
        {
            params: {
                businessId,
                businessMemberId,
                id,
            },
        }
    );