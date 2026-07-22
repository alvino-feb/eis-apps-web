import { create } from "zustand";
import * as tablesService from "./tables.service.js";

const initialState ={
    error: null,

    loading: {
        warehouseType: false,
        saveWarehouseType: false,
        deleteWarehouseType: false,

        productCategory: false,
        saveProductCategory: false,
        deleteProductCategory: false
    },
}

export const tableInventoryStore = create((set, get) => ({
    ...initialState,

    setLoading: (key,value) =>
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: value,
        },
      })),

// *********************** WAREHOUSE TYPE *********************** //
    fetchWarehouseType: async (businessId,businessMemberId) => {
        try {
            get().setLoading(
                "warehouseType",
                true
            );

            set({
                warehouseType: [],
                error: null,
            });
            
            const result = await tablesService.getWarehouseTypeList(businessId,businessMemberId);
            
            set({ warehouseType: result.data.data });
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "warehouseType",
                false
            );
        }
    },

    createWarehouseType: async (payload) => {
        try{
            get().setLoading(
                "saveWarehouseType",
                true
            );
            return await tablesService.createWarehouseType(
                payload
            );
        } finally{
            get().setLoading(
                "saveWarehouseType",
                false
            );
        }
    },
    
    updateWarehouseType: async (businessId,businessMemberId,id,payload) => {
        try{
            get().setLoading(
                "saveWarehouseType",
                true
            );
            return await tablesService.updateWarehouseType(
                businessId,businessMemberId,id,
                payload
            );
        } finally{
            get().setLoading(
                "saveWarehouseType",
                false
            );
        }
    },

    deleteWarehouseType: async (businessId,businessMemberId,id) => {
        try{
            get().setLoading(
                "deleteWarehouseType",
                true
            );
            return await tablesService.deleteWarehouseType(
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

    clearWarehouseType: () =>
        set({
            warehouseType: [],
    }), 

    warehouse: [],
    warehouseMeta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasPrevious: false,
        hasNext: false,
    },

    warehouseQuery: {
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
    },

}));
