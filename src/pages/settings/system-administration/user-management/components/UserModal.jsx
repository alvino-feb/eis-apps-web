import { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
    Modal,
    Button,
} from "../../../../../components/ui";
import { sysAdminStore } from "../../system-administration.store";
import useToastStore from "../../../../../store/toastStore";
import UserTab from "../tabs/UserTab";
import UserMenuTab from "../tabs/UserMenuTab"

export default function UserModal({
    open,
    onClose,
    editingData,
    onSubmit,
    // saving = false,

    businessId,
    businessMember,
    selectedRole,
    // brandOptions = [],
    // unitOptions = [],

    onCreate,
    onUpdate,
}) {

    const fetchMenu = sysAdminStore((state) => state.fetchMenu);
    const menu = sysAdminStore((state) => state.menu);
    const saveUserMenus = sysAdminStore((state) => state.saveUserMenus);

    const [currentUserId, setCurrentUserId] = useState(editingData?.id ?? null);

    const [saving, setSaving] = useState(false);
    const [savingMenus, setSavingMenus] = useState(false);
    const [activeTab, setActiveTab] = useState("user");
    const [userMenus, setUserMenus] = useState([]);
    const isEdit = Boolean(editingData?.id);

    useEffect(() => {
         fetchMenu();
    }, [fetchMenu]);

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required")
            .max(25),

        // employeeId: Yup.string()
        //     .required("Employee is required")
        //     .max(150),

        password: Yup.string()
            .required("Password is required"),

        confirmPassword: Yup.string()
            .required("Confirm Password is required"),
    });

    const handleSaveUser = async (values) => {

        // validationSchema
        try {
            
            setSaving(true);

            const payload = {
                ...values,
                businessId,
                businessMemberId: businessMember?.id ?? null,
            };

            if (currentUserId) {
                await onUpdate(payload, currentUserId);
                setActiveTab("userMenu");
                return;
            }

            const result = await onCreate(payload);

            const userId =
            result?.data?.data?.id ??
            result?.data?.id ??
            result?.data?.user?.id ??
            result?.id;

            if (!userId) {
            throw new Error(
                "User berhasil disimpan, tetapi user ID tidak ditemukan pada response API."
            );
            }

            setCurrentUserId(userId);
            setActiveTab("userMenu");
        } catch (error) {
            console.error("Failed to save user:", error);
        } finally {
            setSaving(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: editingData?.username ?? "",
            employeeId: editingData?.employeeId ?? null,
            password: "XXXXXXXXXXXXXXXXXXX",
            confirmPassword: "YYYYYYYYYYYYYYYY",
            type: selectedRole,
            isActive: editingData?.isActive ?? true,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleSaveUser,
    });

    const handleSavePermissions = async () => {
        if (!currentUserId) {
            setActiveTab("user");
            return;
        }

        try {
            setSavingMenus(true);

            const flattenMenus = (items) =>
                items.flatMap((item) => [
                    item,
                    ...(Array.isArray(item.children)
                        ? flattenMenus(item.children)
                        : []),
                ]);

            const menus = flattenMenus(userMenus)
                .filter((item) => item.type !== "P")
                .map((item) => ({
                    code: item.code,
                    type: item.type,
                    view: Boolean(item.view),
                    create: Boolean(item.create),
                    edit: Boolean(item.edit),
                    delete: Boolean(item.delete),
                }));

            await saveUserMenus(currentUserId, {
                businessId,
                businessMemberId: businessMember?.id,
                menus,
            });

            onClose();
        } catch (error) {
            console.error(
                "Failed to save user menu permissions:",
                error
            );
        } finally {
            setSavingMenus(false);
        }
    };

    if (!open) {
        return null;
    }

    const tabs = [
        {
            key: "user",
            label: "User",
        },
        {
            key: "userMenu",
            label: "Menu Access",
        }
    ];

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                editingData
                    ? "Edit User"
                    : "Add User"
            }
            loading={saving}
        >
            <form onSubmit={formik.handleSubmit}>

                {/* =================================================
                    TABS
                ================================================= */}
                <div className="border-b">
                    <div className="flex gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition
                                    ${
                                        activeTab ===
                                        tab.key
                                            ? "border-blue-600 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}

                    </div>

                </div>

                {/* =================================================
                    TAB CONTENT
                ================================================= */}
                <div className="py-5">
                    {activeTab === "user" && (
                        <UserTab
                            formik={formik}
                            businessMember = {businessMember}
                            selectedRole={selectedRole}
                            // brandOptions={brandOptions}
                            // unitOptions={unitOptions}
                        />

                    )}

                    {activeTab === "userMenu" && (
                        <UserMenuTab
                            formik={formik}
                            businessMember = {businessMember}
                            selectedRole={selectedRole}
                            userMenus={userMenus}
                            setUserMenus={setUserMenus}
                        />
                    )}

                </div>
                
                {/* =================================================
                    FOOTER
                ================================================= */}
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        disabled={saving || savingMenus}
                    >
                        Cancel
                    </Button>

                    <Button
                        type={activeTab === "user" ? "submit" : "button"}
                        onClick={
                        activeTab === "user"
                            ? undefined
                            : handleSavePermissions
                        }
                        disabled={saving || savingMenus}
                        loading={saving || savingMenus}
                    >
                        {activeTab === "user"
                        ? currentUserId
                            ? "Update User"
                            : "Save User"
                        : "Save Permissions"}

                        {/* {saving
                            ? "Saving..."
                            : editingData
                                ? "Update"
                                : "Save"
                        } */}
                    </Button>
                </div>

            </form>
        </Modal>
    )
}
