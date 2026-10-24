import { create } from "zustand";
import * as service from "./product-reference.service";

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
        category: false,
        categoryOptions: false,
        brand: false,
        unit: false,
        type: false,

        saveCategory: false,
        saveBrand: false,
        saveUnit: false,
        saveType: false,

        deleteCategory: false,
        deleteBrand: false,
        deleteUnit: false,
        deleteType: false,
    },

    category: {
        data: [],
        meta: emptyMeta,
    },

    categoryOptions: {
        data: [],
        meta: emptyMeta,
    },

    brand: {
        data: [],
        meta: emptyMeta,
    },

    unit: {
        data: [],
        meta: emptyMeta,
    },

    type: {
        data: [],
        meta: emptyMeta,
    },
};

export const productReferenceStore = create(
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
        // CATEGORY
        // ==================================================

        fetchCategory: async (query) => {
            
            try {

                get().setLoading(
                    "category",
                    true
                );
                
                const result =
                    await service.getProductCategoryList(
                        query
                    );
                    
                set({
                    category: result.data.data
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
                    "category",
                    false
                );
            }
        },

        fetchCategoryOption: async (query) => {
            
            try {

                get().setLoading(
                    "categoryOptions",
                    true
                );
                
                const result =
                    await service.getProductCategoryOptionList(
                        query
                    );
                    
                set({
                    categoryOptions: result.data.data
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
                    "categoryOptions",
                    false
                );
            }
        },

        createCategory: async (
            businessId,
            businessMemberId,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveCategory",
                    true
                );

                return await service.createProductCategory({
                    businessId,
                    businessMemberId,
                    ...payload,
                });

            } finally {

                get().setLoading(
                    "saveCategory",
                    false
                );
            }
        },

        updateCategory: async (
            businessId,
            businessMemberId,
            id,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveCategory",
                    true
                );

                return await service.updateProductCategory(
                    businessId,
                    businessMemberId,
                    id,
                    payload
                );

            } finally {

                get().setLoading(
                    "saveCategory",
                    false
                );
            }
        },

        deleteCategory: async (
            businessId,
            businessMemberId,
            id
        ) => {

            try {

                get().setLoading(
                    "deleteCategory",
                    true
                );

                return await service.deleteProductCategory(
                    businessId,
                    businessMemberId,
                    id
                );

            } finally {

                get().setLoading(
                    "deleteCategory",
                    false
                );
            }
        },


        // ==================================================
        // BRAND
        // ==================================================

        fetchBrand: async (query) => {

            try {

                get().setLoading(
                    "brand",
                    true
                );

                const result =
                await service.getBrandList(
                    query
                );
                
                set({
                    brand: result.data.data,
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
                    "brand",
                    false
                );
            }
        },

        createBrand: async (
            businessId,
            businessMemberId,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveBrand",
                    true
                );

                return await service.createBrand({
                    businessId,
                    businessMemberId,
                    ...payload,
                });

            } finally {

                get().setLoading(
                    "saveBrand",
                    false
                );
            }
        },

        updateBrand: async (
            businessId,
            businessMemberId,
            id,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveBrand",
                    true
                );

                return await service.updateBrand(
                    businessId,
                    businessMemberId,
                    id,
                    payload
                );

            } finally {

                get().setLoading(
                    "saveBrand",
                    false
                );
            }
        },

        deleteBrand: async (
            businessId,
            businessMemberId,
            id
        ) => {

            try {

                get().setLoading(
                    "deleteBrand",
                    true
                );

                return await service.deleteBrand(
                    businessId,
                    businessMemberId,
                    id
                );

            } finally {

                get().setLoading(
                    "deleteBrand",
                    false
                );
            }
        },


        // ==================================================
        // UNIT
        // ==================================================

        fetchUnit: async (query) => {

            try {

                get().setLoading(
                    "unit",
                    true
                );

                const result =
                    await service.getUnitOfMeasureList(
                        query
                    );

                set({
                    unit: result.data.data,
                    error: null,
                });

            } catch (err) {

                console.error(err);

                set({
                    error:
                        err.response?.data?.message ??
                        "Failed to load unit",
                });

            } finally {

                get().setLoading(
                    "unit",
                    false
                );
            }
        },

        createUnit: async (
            businessId,
            businessMemberId,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveUnit",
                    true
                );

                return await service.createUnitOfMeasure({
                    businessId,
                    businessMemberId,
                    ...payload,
                });

            } finally {

                get().setLoading(
                    "saveUnit",
                    false
                );
            }
        },

        updateUnit: async (
            businessId,
            businessMemberId,
            id,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveUnit",
                    true
                );

                return await service.updateUnitOfMeasure(
                    businessId,
                    businessMemberId,
                    id,
                    payload
                );

            } finally {

                get().setLoading(
                    "saveUnit",
                    false
                );
            }
        },

        deleteUnit: async (
            businessId,
            businessMemberId,
            id
        ) => {

            try {

                get().setLoading(
                    "deleteUnit",
                    true
                );

                return await service.deleteUnitOfMeasure(
                    businessId,
                    businessMemberId,
                    id
                );

            } finally {

                get().setLoading(
                    "deleteUnit",
                    false
                );
            }
        },


        // ==================================================
        // PRODUCT TYPE
        // ==================================================

        fetchType: async (query) => {

            try {

                get().setLoading(
                    "type",
                    true
                );

                const result =
                    await service.getProductTypeList(
                        query
                    );

                set({
                    type: result.data.data,
                    error: null,
                });

            } catch (err) {

                console.error(err);

                set({
                    error:
                        err.response?.data?.message ??
                        "Failed to load product type",
                });

            } finally {

                get().setLoading(
                    "type",
                    false
                );
            }
        },

        createType: async (
            businessId,
            businessMemberId,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveType",
                    true
                );

                return await service.createProductType({
                    businessId,
                    businessMemberId,
                    ...payload,
                });

            } finally {

                get().setLoading(
                    "saveType",
                    false
                );
            }
        },

        updateType: async (
            businessId,
            businessMemberId,
            id,
            payload
        ) => {

            try {

                get().setLoading(
                    "saveType",
                    true
                );

                return await service.updateProductType(
                    businessId,
                    businessMemberId,
                    id,
                    payload
                );

            } finally {

                get().setLoading(
                    "saveType",
                    false
                );
            }
        },

        deleteType: async (
            businessId,
            businessMemberId,
            id
        ) => {

            try {

                get().setLoading(
                    "deleteType",
                    true
                );

                return await service.deleteProductType(
                    businessId,
                    businessMemberId,
                    id
                );

            } finally {

                get().setLoading(
                    "deleteType",
                    false
                );
            }
        },

    })
);