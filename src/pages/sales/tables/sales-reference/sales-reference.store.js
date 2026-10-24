import { create } from "zustand";
import * as service from "./sales-reference.service";

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
        outlet: false,

        saveOutlet: false,

        deleteOutlet: false,
    },

    outlet: {
        data: [],
        meta: emptyMeta,
    },
};

export const salesReferenceStore = create(
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
        fetchOutlet: async (query) => {
            
            try {

                get().setLoading(
                    "outlet",
                    true
                );
                
                const result =
                    await service.getOutletList(
                        query
                    );

                set({
                    outlet: result.data.data
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
                    "outlet",
                    false
                );
            }
        },

        createOutlet: async (
            businessId,
            businessMemberId,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveOutlet",
                    true
                );

                return await service.createOutlet({
                    businessId,
                    businessMemberId,
                    ...payload,
                });

            } finally {

                get().setLoading(
                    "saveOutlet",
                    false
                );
            }
        },

        updateOutlet: async (
            businessId,
            businessMemberId,
            id,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveOutlet",
                    true
                );

                return await service.updateOutlet(
                    businessId,
                    businessMemberId,
                    id,
                    payload
                );

            } finally {

                get().setLoading(
                    "saveOutlet",
                    false
                );
            }
        },

        deleteOutlet: async (
            businessId,
            businessMemberId,
            id
        ) => {

            try {

                get().setLoading(
                    "deleteOutlet",
                    true
                );

                return await service.deleteOutlet(
                    businessId,
                    businessMemberId,
                    id
                );

            } finally {

                get().setLoading(
                    "deleteOutlet",
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