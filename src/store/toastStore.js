import { create } from "zustand";

const useToastStore = create((set, get) => ({
    open: false,
    message: "",
    type: "info",
    duration: 3000,
    timer: null,

    showToast: (
        message,
        type = "info",
        duration = 3000
    ) => {

        // clear timer sebelumnya
        const timer = get().timer;

        if (timer) {
        clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
        set({
            open: false,
            timer: null,
        });

        }, duration);

        set({
            open: true,
            message,
            type,
            duration,
            timer: newTimer,
        });
    },

    showSuccess: (
        message,
        duration = 3000
    ) => {
        get().showToast(
        message,
        "success",
        duration
        );
    },

    showError: (
        message,
        duration = 5000
    ) => {
        get().showToast(
        message,
        "error",
        duration
        );
    },

    showWarning: (
        message,
        duration = 4000
    ) => {
        get().showToast(
        message,
        "warning",
        duration
        );
    },

    showInfo: (
        message,
        duration = 3000
    ) => {
        get().showToast(
        message,
        "info",
        duration
        );
    },

    closeToast: () => {
        const timer = get().timer;
        if (timer) {
            clearTimeout(timer);
        }

        set({
            open: false,
            timer: null,
        });
    },

}));

export default useToastStore;