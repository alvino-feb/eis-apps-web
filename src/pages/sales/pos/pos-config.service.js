import api from "../../../api/axios";

// ======================================================
// POS OUTLET
// ======================================================
export const getPosOutletList = (query) =>
api.get(
    `/api/sales/pos/outlet`, {params: query}
);

export const createPosOutlet = (payload) =>
api.post(
    "/api/sales/pos/outlet",
    payload
);

export const updatePosOutlet = (
    businessId,
    businessMemberId,
    id,
    payload
) =>
api.put(
    "/api/sales/pos/outlet",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

export const deletePosOutlet = (
    businessId,
    businessMemberId,
    id
) =>
api.delete(
    "/api/sales/pos/outlet",
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

// ======================================================
// POS CONFIG
// ======================================================
export const getPosConfigOutlet = (query) =>
api.get(
    `/api/sales/pos/config`, {params: query}
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
