import { create } from "zustand";

let resolver = null;

export const useConfirmStore = create((set) => ({
    open: false,
    loading: false,
    title: "",
    message: "",
    variant: "primary",
    confirmText: "OK",
    cancelText: "Cancel",
    show: (options) => {
        return new Promise((resolve) => {
            resolver = resolve;
            set({
                open: true,
                title: options.title || "Confirmation",
                message: options.message || "",
                variant: options.variant || "primary",
                confirmText: options.confirmText || "OK",
                cancelText: options.cancelText || "Cancel",
            });
        });
    },
    confirm: () => {
        resolver?.(true);
        resolver = null;
        set({ open: false,loading: false, });
    },
    cancel: () => {
        resolver?.(false);
        resolver = null;
        set({ open: false });
    },
    
    setLoading: (loading) =>
    set({
        loading,
    }),
}));