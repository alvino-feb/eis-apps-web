import { create } from "zustand";
import * as productService from "./products.service.js";

const initialState ={
    error: null,

    loading: {
        product: false,
        saveProduct: false,
        deleteProduct: false,
    },
}

export const productStore = create((set, get) => ({
    ...initialState,

    setLoading: (key,value) =>
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: value,
        },
      })),

    // *********************** PRODUCTS *********************** //
    fetchProduct: async (query) => {
        
        try {
            get().setLoading(
                "product",
                true
            );
        
            const result = await productService.getProductList(query);   

            set({ product: result.data.data });
        } catch (err) {
            console.error(err);

            set({
                error:
                err.response?.data?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "product",
                false
            );
        }
    },

    createProduct: async (payload) => {
        try{
            get().setLoading(
                "saveProduct",
                true
            );
            
            return await productService.createProduct(
                {
                    businessId : payload.businessId,
                    businessMemberId : payload.businessMemberId,
                    code : payload.code,
                    name : payload.name,
                    description : payload.description,
                    categoryId: payload.categoryId,
                    type: payload.type,
                    unitId: payload.unitId,
                    brandId: payload.brandId,
                    sku: payload.sku,
                    isActive : payload.isActive
                }
            );
        } finally{
            get().setLoading(
                "saveProduct",
                false
            );
        }
    },

    updateProduct: async (payload) => {
        try{
            get().setLoading(
                "saveProduct",
                true
            );            
            return await productService.updateProduct(
                payload.businessId,
                payload.businessMemberId,
                payload.id,
                {
                    code : payload.code,
                    name : payload.name,
                    description : payload.description,
                    categoryId: payload.categoryId,
                    type: payload.type,
                    unitId: payload.unitId,
                    brandId: payload.brandId,
                    sku: payload.sku,
                    isActive : payload.isActive
                }
            );
        } finally{
            get().setLoading(
                "saveProduct",
                false
            );
        }
    },

    deleteProduct: async (businessId,businessMemberId,id) => {
        try{
            get().setLoading(
                "deleteProduct",
                true
            );
            return await productService.deleteProduct(
                businessId,
                businessMemberId,
                id
            );
        } finally {
            get().setLoading(
                "deleteProduct",
                false
            );
        }
    },

    clearProduct: () =>
    set({
        product: {
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

    product: [],
    productMeta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasPrevious: false,
        hasNext: false,
    },

    productQuery: {
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
    },
}));