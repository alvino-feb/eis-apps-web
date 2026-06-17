import { create } from "zustand";
import * as appSettingService from "../services/appSetting.js";

const initialState = {
  tabs: [],
  menu:[],
  dark: false,
  collapsed: false,
  loading: false,
  density: "normal",
  error: null,
};

export const useAppSettingStore = create((set) => ({
    ...initialState,

    setLoading: (val) => set({ loading: val }),
    
    fetchMenu: async (userId,businessId,businessMemberId) => {
        try {
            set({
                loading: true,
                error: null,
            });
            
            const data = await appSettingService.getUserMenu(businessId,businessMemberId,userId);
           
            set({ menu: data.data.data });
        } catch (err) {
            console.error(err);
            
            set({
                error:
                err.response?.data?.message ||
                "Failed to load menu",
            });
        } finally {
            set({ loading: false });
        }
    },

    toggleSidebar: () =>
        set((s) => ({
        collapsed: !s.collapsed,
    })),

}));