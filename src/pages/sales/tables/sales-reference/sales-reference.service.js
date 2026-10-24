import api from "../../../../api/axios";

// ======================================================
// WAREHOUSE TYPE
// ======================================================

export const getOutletList = (query) =>
api.get(
    `/api/sales/outlet`, {params: query}
);

export const createOutlet = (payload) =>
api.post(
    "/api/sales/outlet",
    payload
);

export const updateOutlet = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
api.put(
    "/api/sales/outlet",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

export const deleteOutlet = (
    businessId,
    businessMemberId,
    id
) =>
api.delete(
    "/api/sales/outlet",
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
