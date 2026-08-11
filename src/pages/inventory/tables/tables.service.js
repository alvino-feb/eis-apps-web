import api from "../../../api/axios";

// *********************** WAREHOUSE TYPE *********************** //
export const getWarehouseTypeList = (businessId,businessMemberId) =>
    api.get(
        `api/inventory/warehouse-type/${businessId}/${businessMemberId}`
    );

export const getWarehouseTypeDetail = (businessId,businessMemberId,id) =>
    api.get(
        `api/inventory/warehouse-type/${businessId}/${businessMemberId}/${id}`
    );

export const createWarehouseType = (payload) =>
    api.post(
        "/api/inventory/warehouse-type",
        payload
    );

export const updateWarehouseType = (businessId,businessMemberId,id,payload) =>
    api.put(
        `/api/inventory/warehouse-type/${businessId}/${businessMemberId}/${id}`,
        payload
    );

export const deleteWarehouseType = (businessId,businessMemberId,id) =>
    api.delete(
        `/api/inventory/warehouse-type/${businessId}/${businessMemberId}/${id}`
    );

// *********************** PRODUCT CATEGORY *********************** //
export const getProductCategoryList = (businessId,businessMemberId) =>
    api.get(
        `api/inventory/product-category/${businessId}/${businessMemberId}`
    );

export const getProductCategoryDetail = (businessId,businessMemberId,id) =>
    api.get(
        `api/inventory/product-category/${businessId}/${businessMemberId}/${id}`
    );

export const createProductCategory = (payload) =>
    api.post(
        "/api/inventory/product-category",
        payload
    );

export const updateProductCategory = (businessId,businessMemberId,id,payload) =>
    api.put(
        `/api/inventory/product-category/${businessId}/${businessMemberId}/${id}`,
        payload
    );

export const deleteProductCategory = (businessId,businessMemberId,id) =>
    api.delete(
        `/api/inventory/product-category/${businessId}/${businessMemberId}/${id}`
    );