import { useEffect } from "react";
import {
    FaExclamationTriangle,
    FaTrash,
    FaCheckCircle,
    FaInfoCircle,
} from "react-icons/fa";

import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { useConfirmStore } from "../store/confirmStore";

const iconMap = {
    danger: (
        <FaTrash className="text-red-500 text-4xl" />
    ),
    warning: (
        <FaExclamationTriangle className="text-yellow-500 text-4xl" />
    ),
    success: (
        <FaCheckCircle className="text-green-500 text-4xl" />
    ),
    primary: (
        <FaInfoCircle className="text-blue-500 text-4xl" />
    ),
};

export default function ConfirmDialog() {
    const {
        open,
        title,
        message,
        variant,
        confirmText,
        cancelText,
        loading,
        confirm,
        cancel,
    } = useConfirmStore();

    useEffect(() => {
        if (!open)
            return;

        const listener = (e) => {
            if (loading)
                return;
            if (e.key === "Escape")
                e.preventDefault();
                cancel();
        };

        window.addEventListener(
            "keydown",
            listener
        );

        return () =>
            window.removeEventListener(
                "keydown",
                listener
            );

    }, [
        open,
        loading,
        cancel,
        confirm
    ]);

    return (
        <Modal
            open={open}
            onClose={loading ? undefined : cancel}
            title={title}
            width="max-w-md"
        >
            <div className="flex flex-col items-center text-center">
                {iconMap[variant]}
                <p className="mt-5 text-gray-600">
                    {message}
                </p>
                <div className="flex gap-3 mt-8">
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={loading}
                        onClick={cancel}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        type="button"
                        variant={variant}
                        disabled={loading}
                        onClick={confirm}
                    >
                        {
                            loading
                                ? "Processing..."
                                : confirmText
                        }
                    </Button>
                </div>
            </div>
        </Modal>
    );
}