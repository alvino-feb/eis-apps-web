import { create } from "zustand";
import * as service from "./pos-config.service";
import { useAppStore } from "../../../store/appStore";

const initialState ={
    error: null,

    loading: {
        posOutlet: false,
        posConfigOutlet: false,

        savePosConfig: false,
        deletePosConfig: false,
    },
}

export const POSConfigStore = create((set, get) => ({
    ...initialState,

    setLoading: (key,value) =>
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: value,
        },
      })),

    // *********************** POS OUTLET *********************** //
    fetchPosOutlet: async (query) => {
        
        try {
            // Global Loader ON
            useAppStore.getState().setLoading(true);

            get().setLoading(
                "posOutlet",
                true
            );

            set({
                 posOutlet: {
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

            const result = await service.getPosOutletList(query);            
            set({ posOutlet: result.data.data });

        } catch (err) {
            console.error(err);

            set({
                error:
                err.response?.data?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "posOutlet",
                false
            );

            // Global Loader ON
            useAppStore.getState().setLoading(false);
        }
    },

    clearPosOutlet: () =>
    set({
        posOutlet: {
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

    posOutlet: [],
    posOutletMeta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasPrevious: false,
        hasNext: false,
    },

    posOutletQuery: {
        page: 1,
        limit: 10,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
    },

    // *********************** POS CONFIG OUTLET *********************** //
    fetchPosConfigOutlet: async (query) => {
        try {

            // Global Loader ON
            useAppStore.getState().setLoading(true);

            get().setLoading(
                "posConfigOutlet",
                true
            );

            set({
                 posConfigOutlet: {
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

            const result = await service.getPosConfigOutlet(query);  
                      
            set({ posConfigOutlet: result.data });

        } catch (err) {
            console.error(err);

            set({
                error:
                err.response?.data?.message ||
                "Failed to load data",
            });
        } finally {
            get().setLoading(
                "posConfigOutlet",
                false
            );

            // Global Loader OFF
            useAppStore.getState().setLoading(false);
        }
    },

    createPosConfig: async (businessId,businessMemberId,payload) => {
        try{
            get().setLoading(
                "savePosConfig",
                true
            );

            return await service.createPosOutlet(
                {
                    businessId,
                    businessMemberId,
                    outletId : payload.outletId,
                    posName : payload.posName,
                    mainWarehouseId : payload.mainWarehouseId,
                    returnWarehouseId : payload.returnWarehouseId,
                    priceListId : payload.priceListId,
                    receiptHeader : payload.receiptHeader,
                    receiptFooter : payload.receiptFooter,
                    isActive : payload.isActive
                }
                
            );
        } finally{
            get().setLoading(
                "savePosConfig",
                false
            );
        }
    },

    updatePosConfig: async (businessId,businessMemberId,id,payload) => {
        
        try{
            get().setLoading(
                "savePosConfig",
                true
            );            
            return await service.updatePosOutlet(
                businessId,
                businessMemberId,
                id,
                // payload,
                {
                    posName : payload.posName,
                    mainWarehouseId : payload.mainWarehouseId,
                    returnWarehouseId : payload.returnWarehouseId,
                    priceListId : payload.priceListId,
                    receiptHeader : payload.receiptHeader,
                    receiptFooter : payload.receiptFooter,
                    isActive : payload.isActive
                }
            );
        } finally{
            get().setLoading(
                "savePosConfig",
                false
            );
        }
    },

    deletePosConfig: async (businessId,businessMemberId,id) => {
        try{
            get().setLoading(
                "deletePosConfig",
                true
            );
            return await service.deletePosConfig(
                businessId,
                businessMemberId,
                id
            );
        } finally {
            get().setLoading(
                "deletePosConfig",
                false
            );
        }
    },

    clearPosConfigOutlet: () =>
    set({
        posConfigOutlet: {
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

    posConfigOutlet: [],
    posConfigOutletMeta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasPrevious: false,
        hasNext: false,
    },

}));