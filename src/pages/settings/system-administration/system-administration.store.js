import { create } from "zustand";
import * as sysAdminService from "./system-administration.service.js";

const initialState = {
  loading: false,
};

export const sysAdminStore = create((set) => ({
    ...initialState,

    setLoading: (val) => set({ loading: val }),
    
    fetchBusiness: async (businessId) => {
        try {
            set({
                loading: true,
                error: null,
            });
            
            const result = await sysAdminService.getBusinessInfo(businessId);
           
            set({ business: result.data.data });
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            set({ loading: false });
        }
    },

    updateBusiness:
      async (
        businessId,
        payload
      ) => {

        return await sysAdminService.updateBusinessInfo(
          businessId,
          payload
        );

      },

    fetchBusinessMember: async (businessId) => {
        try {
            set({
                loading: true,
                error: null,
            });
            
            const result = await sysAdminService.getBusinessMembers(businessId);
           
            set({ businessMember: result.data.data.data });
        
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.result?.message ||
                "Failed to load data",
            });
        } finally {
            set({ loading: false });
        }
    },

    createBusinessMember:
      async (payload) => {

        return await sysAdminService.createBusinessMember(
          payload
        );

      },

    updateBusinessMember:
      async (
        businessId,
        payload
      ) => {

        return await sysAdminService.updateBusinessMember(
          businessId,
          payload
        );

      },

    deleteBusinessMember:
      async (
        businessMemberId
      ) => {

        return await sysAdminService.deleteBusinessMember(
          businessMemberId
        );

      },

}));