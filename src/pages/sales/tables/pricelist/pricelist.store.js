import { create } from "zustand";
import * as pricelistService from "./pricelist.service.js";

const initialState ={
    error: null,

    loading: {
        pricelist: false,
        savePricelist: false,
        deletePricelist: false,

        productPrice: false,
        saveProductPrice: false,
        deleteProductPrice: false,

        pricelistProductOptions: false
    },
}

export const pricelistStore = create((set, get) => ({
    ...initialState,

    setLoading: (key,value) =>
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: value,
        },
      })),

    // *********************** PRICELIST *********************** //
    fetchPricelist: async (query) => {
        
        try {
            get().setLoading(
                "pricelist",
                true
            );

            set({
                 pricelist: {
                    data: [],
                    meta: {
                        page:1,
                        limit:10,
                        total:0,
                        totalPages:1,
                        hasPrevious:false,
                        hasNext:false,
                    }
                },

                error:null,
            });

            const result = await pricelistService.getPricelistList(query);            
            set({ pricelist: result.data.data });
        } catch (err) {
            console.error(err);

            set({
                error:
                err.response?.data?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "pricelist",
                false
            );
        }
    },

    createPricelist: async (businessId,businessMemberId,payload) => {
        try{
            get().setLoading(
                "savePricelist",
                true
            );
            
            return await pricelistService.createPricelist(
                {
                    businessId,
                    businessMemberId,
                    code : payload.code,
                    name : payload.name,
                    description : payload.description,
                    startAt: new Date(
                        `${payload.startAt}T00:00:00`
                    ).toISOString(),

                    expiresAt: payload.expiresAt
                    ? new Date(
                        `${payload.expiresAt}T23:59:59`
                    ).toISOString()
                    : null,

                    isActive : payload.isActive
                }
                
            );
        } finally{
            get().setLoading(
                "savePricelist",
                false
            );
        }
    },

    updatePricelist: async (businessId,businessMemberId,id,payload) => {
        try{
            get().setLoading(
                "savePricelist",
                true
            );            
            return await pricelistService.updatePricelist(
                businessId,
                businessMemberId,
                id,
                // payload,
                {
                    code : payload.code,
                    name : payload.name,
                    description : payload.description,
                    startAt: new Date(
                        `${payload.startAt}T00:00:00`
                    ).toISOString(),

                    expiresAt: payload.expiresAt
                    ? new Date(
                        `${payload.expiresAt}T23:59:59`
                    ).toISOString()
                    : null,

                    isActive : payload.isActive
                }
            );
        } finally{
            get().setLoading(
                "savePricelist",
                false
            );
        }
    },

    deletePricelist: async (businessId,businessMemberId,id) => {
        try{
            get().setLoading(
                "deletePricelist",
                true
            );
            return await pricelistService.deletePricelist(
                businessId,
                businessMemberId,
                id
            );
        } finally {
            get().setLoading(
                "deletePricelist",
                false
            );
        }
    },

    clearPricelist: () =>
    set({
        pricelist: {
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 1,
                hasPrevious: false,
                hasNext: false,
            },
        },
    }),

    pricelist: [],
    pricelistMeta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasPrevious: false,
        hasNext: false,
    },

    pricelistQuery: {
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
    },

    // *********************** PRODUCT PRICE *********************** //
    fetchProductPrice: async (query) => {

        try {
            get().setLoading(
                "productPrice",
                true
            );

            set({
                 productPrice: {
                    data: [],
                    meta: {
                        page:1,
                        limit:10,
                        total:0,
                        totalPages:1,
                        hasPrevious:false,
                        hasNext:false,
                    }
                },

                error:null,
            });

            const result = await pricelistService.getProductPriceList(query);            
            set({ productPrice: result.data.data });

        } catch (err) {
            console.error(err);

            set({
                error:
                err.response?.data?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "productPrice",
                false
            );
        }
    },

    createProductPrice: async (businessId,businessMemberId,payload) => {
        try{
            get().setLoading(
                "saveProductPrice",
                true
            );
            
            return await pricelistService.createProductPrice(
                {
                    businessId,
                    businessMemberId,
                    priceListId : payload.priceListId,
                    productId : payload.productId,
                    priceType : payload.priceType,
                    price : payload.price,
                    isActive : payload.isActive
                }
                
            );
        } finally{
            get().setLoading(
                "saveProductPrice",
                false
            );
        }
    },

    updateProductPrice: async (
        businessId,
        businessMemberId,
        pricelistId,
        productId,
        id,
        payload
    ) => {
        try{
            get().setLoading(
                "saveProductPrice",
                true
            );            
            
            return await pricelistService.updateProductPrice(
                businessId,
                businessMemberId,
                pricelistId,
                productId,
                id,
                // payload,
                {
                    priceType : payload.priceType,
                    price : payload.price,
                    isActive : payload.isActive
                }
            );
        } finally{
            get().setLoading(
                "saveProductPrice",
                false
            );
        }
    },

    deleteProductPrice: async (businessId,businessMemberId,id) => {
        try{
            get().setLoading(
                "deleteProductPrice",
                true
            );
            return await pricelistService.deleteProductPrice(
                businessId,
                businessMemberId,
                id
            );
        } finally {
            get().setLoading(
                "deleteProductPrice",
                false
            );
        }
    },

    clearProductPrice: () =>
    set({
        productPrice: {
            data: [],
            meta: {
                page: 1,
                limit: 10,
                total: 0,
                totalPages: 1,
                hasPrevious: false,
                hasNext: false,
            },
        },
    }),

    productPrice: [],
    productPriceMeta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasPrevious: false,
        hasNext: false,
    },

    productPriceQuery: {
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
    },

    // *********************** PRICELIST PRODUCT OPTION *********************** //
    fetchPricelistProductOptions: async (query) => {

        try {
            get().setLoading(
                "pricelistProductOptions",
                true
            );

            set({
                 pricelistProductOptions: {
                    data: []
                },

                error:null,
            });

            const result = await pricelistService.getProductPriceOptions(query);            
            set({ pricelistProductOptions: result.data.data });

        } catch (err) {
            console.error(err);

            set({
                error:
                err.response?.data?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "pricelistProductOptions",
                false
            );
        }
    },

    pricelistProductOptions: [],
}));