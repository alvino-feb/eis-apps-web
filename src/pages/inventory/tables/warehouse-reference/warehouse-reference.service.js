import api from "../../../../api/axios";

// ======================================================
// WAREHOUSE TYPE
// ======================================================

export const getWarehouseTypeList = (query) =>
api.get(
    `/api/inventory/warehouse-type`, {params: query}
);

export const createWarehouseType = (payload) =>
api.post(
    "/api/inventory/warehouse-type",
    payload
);

export const updateWarehouseType = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
api.put(
    "/api/inventory/warehouse-type",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

export const deleteWarehouseType = (
    businessId,
    businessMemberId,
    id
) =>
api.delete(
    "/api/inventory/warehouse-type",
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);


// ======================================================
// TRANSACTION TYPE
// ======================================================
export const getTransactionTypeList = (query) =>
api.get(
    `/api/inventory/warehouse-transaction-type`,{params: query}
);

export const createTransactionType= (payload) =>
api.post(
    "/api/inventory/warehouse-transaction-type",
    payload
);

export const updateTransactionType = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
api.put(
    "/api/inventory/warehouse-transaction-type",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

export const deleteTransactionType = (
    businessId,
    businessMemberId,
    id
) =>
api.delete(
    "/api/inventory/warehouse-transaction-type",
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);
