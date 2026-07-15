import { useConfirmStore } from "../../store/confirmStore.js";

export const confirm = (options) =>
    useConfirmStore.getState().show(options);

export const setConfirmLoading = (loading) =>
    useConfirmStore
        .getState()
        .setLoading(loading);