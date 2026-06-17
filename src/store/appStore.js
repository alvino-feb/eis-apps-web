import { create } from "zustand";

export const useAppStore = create((set) => ({
    collapsed: false,
    dark: false,
    loading: false,
    
    setLoading: (val) => set({ loading: val }),

    toggleSidebar: () =>
    set((s) => ({
        collapsed: !s.collapsed,
    })),

    toggleDark: () =>
    set((s) => ({
        dark: !s.dark,
    })),
}));