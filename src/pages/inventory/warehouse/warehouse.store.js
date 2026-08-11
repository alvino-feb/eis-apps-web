import { create } from "zustand";
import * as warehouseService from "./warehouse.service.js";

const initialState ={
    error: null,

    loading: {
        warehouse: false,
        saveWarehouse: false,
        deleteWarehouse: false,
    },
}

export const warehouseStore = create((set, get) => ({
    ...initialState,

    setLoading: (key,value) =>
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: value,
        },
      })),

    // *********************** WAREHOUSE *********************** //
    fetchWarehouse: async (query) => {
        
        try {
            get().setLoading(
                "warehouse",
                true
            );

            set({
                 warehouse: {
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
            
            const result = await warehouseService.getWarehouseList(query);            
            set({ warehouse: result.data.data });
        } catch (err) {
            console.error(err);

            set({
                error:
                err.response?.data?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "warehouse",
                false
            );
        }
    },

    createWarehouse: async (businessId,businessMemberId,payload) => {
        try{
            get().setLoading(
                "saveWarehouse",
                true
            );
            return await warehouseService.createWarehouse(
                {
                    businessId,
                    businessMemberId,
                    code : payload.code,
                    name : payload.name,
                    description : payload.description,
                    warehouseTypeId: payload.warehouseTypeId,
                    email: payload.email,
                    phone: payload.phone,
                    address: payload.address,
                    city: payload.city,
                    province: payload.province,
                    postalCode: payload.postalCode,
                    isDefault : payload.isDefault,
                    allowNegativeStock : payload.allowNegativeStock,
                    isActive : payload.isActive
                }
                
            );
        } finally{
            get().setLoading(
                "saveWarehouse",
                false
            );
        }
    },

    updateWarehouse: async (businessId,businessMemberId,id,payload) => {
        try{
            get().setLoading(
                "saveWarehouse",
                true
            );            
            return await warehouseService.updateWarehouse(
                businessId,businessMemberId,id,
                payload
            );
        } finally{
            get().setLoading(
                "saveWarehouse",
                false
            );
        }
    },

    deleteWarehouse: async (businessId,businessMemberId,id) => {
        try{
            get().setLoading(
                "deleteWarehouse",
                true
            );
            return await warehouseService.deleteWarehouse(
                businessId,
                businessMemberId,
                id
            );
        } finally {
            get().setLoading(
                "deleteWarehouse",
                false
            );
        }
    },

    clearWarehouse: () =>
    set({
        warehouse: {
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