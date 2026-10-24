import { create } from "zustand";
import * as service from "./warehouse-reference.service";

const emptyMeta = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasPrevious: false,
    hasNext: false,
};

const initialState = {
    error: null,

    loading: {
        warehouseType: false,
        transactionType: false,

        saveWarehouseType: false,
        saveTransactionType: false,

        deleteWarehouseType: false,
        deleteTransactionType: false,
    },

    warehouseType: {
        data: [],
        meta: emptyMeta,
    },

    transactionType: {
        data: [],
        meta: emptyMeta,
    },
};

export const warehouseReferenceStore = create(
    (set, get) => ({

        ...initialState,

        // ==================================================
        // LOADING
        // ==================================================
        setLoading: (key, value) =>
            set((state) => ({
                loading: {
                    ...state.loading,
                    [key]: value,
                },
            })),

        // ==================================================
        // WAREHOUSE TYPE
        // ==================================================
        fetchWarehouseType: async (query) => {
            
            try {

                get().setLoading(
                    "warehouseType",
                    true
                );
                
                const result =
                    await service.getWarehouseTypeList(
                        query
                    );

                set({
                    warehouseType: result.data.data
                });

            } catch (err) {
                console.error(err);
                set({
                    error:
                        err.response?.data?.message ??
                        "Failed to load data",
                });
            } finally {
                get().setLoading(
                    "warehouseType",
                    false
                );
            }
        },

        createWarehouseType: async (
            businessId,
            businessMemberId,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveWarehouseType",
                    true
                );

                return await service.createWarehouseType({
                    businessId,
                    businessMemberId,
                    ...payload,
                });

            } finally {

                get().setLoading(
                    "saveWarehouseType",
                    false
                );
            }
        },

        updateWarehouseType: async (
            businessId,
            businessMemberId,
            id,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveWarehouseType",
                    true
                );

                return await service.updateWarehouseType(
                    businessId,
                    businessMemberId,
                    id,
                    payload
                );

            } finally {

                get().setLoading(
                    "saveWarehouseType",
                    false
                );
            }
        },

        deleteWarehouseType: async (
            businessId,
            businessMemberId,
            id
        ) => {

            try {

                get().setLoading(
                    "deleteWarehouseType",
                    true
                );

                return await service.deleteWarehouseType(
                    businessId,
                    businessMemberId,
                    id
                );

            } finally {

                get().setLoading(
                    "deleteWarehouseType",
                    false
                );
            }
        },


        // ==================================================
        // TRANSACTION TYPE
        // ==================================================
        fetchTransactionType: async (query) => {

            try {

                get().setLoading(
                    "transactionType",
                    true
                );

                const result =
                await service.getTransactionTypeList(
                    query
                );
                
                set({
                    transactionType: result.data.data,
                    error: null,
                });

            } catch (err) {

                console.error(err);

                set({
                    error:
                        err.response?.data?.message ??
                        "Failed to load brand",
                });

            } finally {

                get().setLoading(
                    "transactionType",
                    false
                );
            }
        },

        createTransactionType: async (
            businessId,
            businessMemberId,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveTransactionType",
                    true
                );

                return await service.createTransactionType({
                    businessId,
                    businessMemberId,
                    ...payload,
                });

            } finally {

                get().setLoading(
                    "saveTransactionType",
                    false
                );
            }
        },

        updateTransactionType: async (
            businessId,
            businessMemberId,
            id,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveTransactionType",
                    true
                );

                return await service.updateTransactionType(
                    businessId,
                    businessMemberId,
                    id,
                    payload
                );

            } finally {

                get().setLoading(
                    "saveTransactionType",
                    false
                );
            }
        },

        deleteTransactionType: async (
            businessId,
            businessMemberId,
            id
        ) => {

            try {

                get().setLoading(
                    "deleteTransactionType",
                    true
                );

                return await service.deleteTransactionType(
                    businessId,
                    businessMemberId,
                    id
                );

            } finally {

                get().setLoading(
                    "deleteTransactionType",
                    false
                );
            }
        },

    })
);