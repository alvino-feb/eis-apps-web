import { useEffect, useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    CardHeader,
    Toolbar,
    SearchInput,
    DataTable,
    DataTableV2,
    Modal,
    Button,
    StatusBadge,
    FilterPanel,
    TextInput,
    Checkbox,
    Select,
    PageHeader,
    Card,
} from "../../../../components/ui";
import {
  Pencil,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  RefreshCw,
  Loader2,
} from "lucide-react";

import { useAuthStore } from "../../../../store/authStore";
import { sysAdminStore } from "../system-administration.store";
import { useAppStore }  from "../../../../store/appStore";
import useToastStore  from "../../../../store/toastStore";
import { ROLE_PERMISSION }
from "../../../../common/helpers/role.js";
import { hasChanges } from "../../../../common/helpers/object.js";
import { confirm } from "../../../../common/helpers/confirm.js";
import UserModal from "./components/UserModal.jsx";

export default function UserManagement() {
    /*
     * =========================================================
     * AUTH
     * =========================================================
    */
    const businessId = useAuthStore((state) => state.businessId);

    /*
     * =========================================================
     * TOAST
     * =========================================================
    */
    const {
        showSuccess,
        showError,
        showWarning,
    } = useToastStore();
    
    /*
     * =========================================================
     * MEMBER
     * =========================================================
    */
    const fetchBusinessMember = sysAdminStore((state) => state.fetchBusinessMember);
    const businessMember = sysAdminStore((state) => state.businessMember) || [];
    const loadingBusinessMember = sysAdminStore((state) => state.loading.businessMember);

    const memberSortBy = "username";
    const memberSortOrder = "asc";

    const [selectedBusinessMember, setSelectedBusinessMember] = useState(null);
    const [selectedBusinessMemberId, setSelectedBusinessMemberId] = useState(null);

    /*
     * =========================================================
     * ROLE
     * =========================================================
    */
    const fetchRole = sysAdminStore((state) => state.fetchRole);
    const role = sysAdminStore((state) => state.role);
    const fetchRoleOptions = sysAdminStore((state) => state.fetchRoleOptions);
    const roleOptions = sysAdminStore((state) => state.roleOptions);
    const [selectedRole, setSelectedRole] = useState("");

    /*
     * =========================================================
     * USER 
     * =========================================================
    */
        // USER BY BUSINESS MEMBER AND TYPE
        const fetchUserByMemberAndType = sysAdminStore((state) => state.fetchUserByMemberAndType);
        const userByMemberAndType = sysAdminStore((state) => state.userByMemberAndType) || [];
        const loadingUserMemberAndType = sysAdminStore((state) => state.loading.userByMemberAndType);
        const userSortBy = "username";
        const userSortOrder = "asc";

        const [selectedUser, setSelectedUser] = useState(null);

        // USER
        const createUser = sysAdminStore((state) => state.createUser);
        const updateUser = sysAdminStore((state)=> state.updateUser);
    /*
     * =========================================================
     * MODAL STATE
     * =========================================================
    */
    const [openModalUser, setOpenModalUser] = useState(false);
    const [editingDataUser, setEditingDataUser] = useState(null);
    const [originalDataUser, setOriginalDataUser] = useState(null);

    /*
     * =========================================================
     * UI STATE
     * =========================================================
    */
    const {setLoading} = useAppStore();
    const [refreshingUser, setRefreshingUser] = useState(false);;
    const [deletingUser, setDeletingUser] = useState(null);

    /*
     * =========================================================
     * DATA
     * =========================================================
    */

    /*
     * =========================================================
     * FETCH BUSINESS MEMBER
     * =========================================================
    */
    const loadBusinessMember = useCallback(async () => {
        if (!businessId) {
            return;
        }

        await fetchBusinessMember({
            businessId,
        });

    }, [
        businessId,
        fetchBusinessMember
    ]);

    useEffect(() => {
        loadBusinessMember();
    }, [loadBusinessMember]);
    
    const rowsBusinessMember = businessMember?.data ?? [];

    /*
     * =========================================================
     * FETCH ROLE
     * =========================================================
    */
    const loadRole = useCallback(async () => {
        if (!businessId) {
            return;
        }

        await fetchRole({
            businessId,
        });

        await fetchRoleOptions({
            businessId,
        });

    }, [
        businessId,
        fetchRole,
        fetchRoleOptions
    ]);

    useEffect(() => {
        loadRole();
    }, [loadRole]);

    const roleOptionsRows = roleOptions?.data ?? [];
    const roleOption =
    roleOptionsRows.map((item) => ({
        value: item.code,
        label: `${item.name}`,
        // label: `${item.code} - ${item.name}`,
    }));

    const loadUserByMemberType = useCallback(async (selectMember, selectRole) => {
        if (!businessId || !selectRole) {
            return;
        }
        // console.log(selectMember);
        // console.log(selectRole);
        // console.log(selectedRole);

        await fetchUserByMemberAndType({
            businessId,
            businessMemberId: selectMember,
            type: selectRole,
        });


    }, [
        businessId,
        fetchUserByMemberAndType
    ]);

    /*
     * =========================================================
     * SELECT BUSINESS MEMBER
     * =========================================================
    */
    const handleSelectBusinessMember = async (row) => {
        if (selectedBusinessMember === row.id) {
            return;
        }

        setSelectedBusinessMember(row);
        setSelectedBusinessMemberId(row.id);

        loadUserByMemberType(row.id,selectedRole);
    };

    /*
     * =========================================================
     * SELECT ROLE
     * =========================================================
    */
    const handleRoleChange = (value) => {
        setSelectedRole(value);

        loadUserByMemberType(selectedBusinessMember.id,value);
    };

    /*
     * =========================================================
     * REFRESH USER
     * =========================================================
     */
    const handleRefreshUser = async () => {
        try {
            setRefreshingUser(true);
            await loadUserByMemberType(selectedBusinessMember.id, selectedRole);
        } finally {
            setRefreshingUser(false);
        }
    };

    /*
     * =========================================================
     * SELECT USER
     * =========================================================
    */
    const handleSelectUser = (row) => {
        if (selectedUser?.id === row.id) {
            return;
        }
        setSelectedUser(row);
    };

    /*
     * =========================================================
     * DELETE USER
     * =========================================================
    */
    const handleAddUser = () => {
        if (!selectedBusinessMember || !selectedRole) {
            showWarning("Please select a Business Member and Role before adding a new user.");
            return;
        }

        if (!selectedBusinessMember || !selectedRole || selectedRole === "BUSINESS_ADMINISTRATOR") {
            showWarning("You are not allowed to add users with this role.");
            return;
        }
        
        setEditingDataUser(null);
        setOriginalDataUser(null);
        setOpenModalUser(true);
    }

    /*
     * =========================================================
     * DELETE USER
     * =========================================================
    */
    const handleDeleteUser = async (row) => {
        const userName =
            row.username ??
            row.code ??
            "this user";

        const confirmed =
            await confirm({
                title: "Delete User",
                message: `Are you sure you want to delete user "${userName}"?`,
                variant: "danger",
                confirmText: "Delete",
                cancelText: "Cancel",
            });

        if (!confirmed) {
            return;
        }

        try {
            setDeletingUser(row.id);
            
            // await deleteUser(
            //     businessId,
            //     selectedMember,
            //     row.id
            // );

            // await fetchUserByMemberAndRole(
            //     businessId,
            //     selectedMember,
            //     selectedRole
            // );
            showSuccess("User deleted successfully.");

            setSelectedUser(null);
        } catch(err){
            showError(
                err.response?.data?.message ??
                "Failed to delete user !"
            );
        } finally {
            setDeletingUser(null);
        }
    };

    /*
     * =========================================================
     * CLOSE MODAL USER
     * =========================================================
    */
    const handleCloseModalUser = () => {
        setOpenModalUser(false);
        setEditingDataUser(null);
        setOriginalDataUser(null);
    };

    /*
     * =========================================================
     * SAVE USER
     * =========================================================
    */

    const handleSave = async (values,id) => {

        console.log(values);
        if (
            values.password !==
            values.confirmPassword
        ) {
            showWarning(
                "Password do not match."
            );
        return;
        }

        try {
            if (editingDataUser) {   
                const changed= hasChanges(
                    originalDataUser,
                    values,
                    [
                        "username",
                        "employeeId",
                        "passwordHash",
                        "type",
                        "isActive",
                    ]
                );

                if(!changed){
                    showWarning(
                        "No changes detected."
                    );
                    setOpenModalUser(false);
                    return;
                }

                const data = {
                    businessId: businessId,
                    businessMemberId: selectedBusinessMember.id,
                    id: id,
                    username: values.username ?? "",
                    employeeId: values.employeeId ?? null,
                    password: values.password ?? null,
                    type: values.type ?? null,
                    isActive: values.isActive ?? true,
                };

                // await updateUser(
                //     data
                // );
            } else {
                const data = {
                    businessId: businessId,
                    businessMemberId: selectedBusinessMember.id,
                    username: values.username ?? "",
                    employeeId: values.employeeId ?? null,
                    password: values.password ?? null,
                    type: selectedRole ?? null,
                    isActive: values.isActive ?? true,
                };

                console.log(data)
                await createUser(
                    data
                );
            }

            loadUserByMemberType(selectedBusinessMember.id, selectedRole);

            showSuccess(
                "User saved successfully."
            );
        } catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to save User."
            );
        } 
    };

    /*
     * =========================================================
     * BUSINESS MEMBER COLUMN
     * =========================================================
    */
    const columnsMember = [
        {
        key: "code",
        title: "Code",
        },
        {
        key: "name",
        title: "Member Name",
        }
    ];

    /*
     * =========================================================
     * USER COLUMN
     * =========================================================
    */
    const columnsUser = [
        {
            key: "username",
            title: "Username",
        },
        {
            key: "isActive",
            title: "Status",

            render: (row) => (
                <StatusBadge
                active={row.isActive}
                />
            ),
        },
        {
            key: "action",
            title: "Action",
            render: (row) => (
                <div className="flex gap-1">
                <button
                    onClick={() =>
                    {
                    if (!ROLE_PERMISSION.canDeleteUser(row))
                        return;
                    //   handleEditUser(row)
                    }
                    }
                    className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                >
                    <Pencil size={16}
                    className={
                        ROLE_PERMISSION.canDeleteUser(row)
                            ? "cursor-pointer text-blue-600 hover:text-blue-800"
                            : "cursor-not-allowed text-gray-300"
                    }
                    />
                </button>

                <button
                    onClick={()=>{
                    if (!ROLE_PERMISSION.canDeleteUser(row))
                        return;
                      handleDeleteUser(row)
                    }}
                    className="p-2 rounded-md hover:bg-red-50 text-red-600"
                >
                    <Trash2 size={16} 
                    className={
                        ROLE_PERMISSION.canDeleteUser(row)
                            ? "cursor-pointer text-red-600 hover:text-red-800"
                            : "cursor-not-allowed text-gray-300"
                    }
                    />
                </button>

                </div>
            ),
        },
    ];
    
    /*
    * =========================================================
    * RENDER
    * =========================================================
    */
    return (
        <>
            <div className="space-y-4 p-3">
                <PageHeader
                    title="User Management"
                    description="Manage users, role assignment and menu access"
                />

                {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="h-[250px] flex flex-col">

                    </Card>

                    <Card className="h-[380px] flex flex-col lg:col-span-2">
   
                    </Card>
                </div> */}

                {/* =================================================
                    BUSINESS MEMBER LIST
                ================================================== */}
                <Card className="h-[250px] w-1/2 flex flex-col">
                    <CardHeader
                        title="Business Member"
                        description="Select Business Member"
                    />

                    <div className="flex-1 overflow-auto">
                        <DataTable
                            columns={columnsMember}
                            data={businessMember}
                            selectedRowId={selectedBusinessMemberId}
                            loading={loadingBusinessMember}
                            onRowClick={handleSelectBusinessMember}
                        />
                    </div>
                </Card>

                {/* =================================================
                    USERS LISTS
                ================================================== */}
                <Card className="h-[480px] w-1/2 flex flex-col">
                    <CardHeader
                        title="Users"
                        action={
                            <Button
                                onClick={handleAddUser}
                                // disabled={
                                //     !selectedBusinessMember ||
                                //     !selectedRole ||
                                //     selectedRole === "BUSINESS_ADMINISTRATOR"
                                // }
                            >
                                <Plus size={14}/>
                            </Button>
                        }
                    />

                    <Toolbar
                        left={
                            <div className="flex items-center gap-2">
                                <label className="mb-1 block text-sm font-medium">
                                    Role
                                </label>
                                <Select
                                    name="userType"
                                    options={roleOption}
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    // placeholder="Role..."
                                />
                            </div>
                            }

                        right={
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={handleRefreshUser}
                                    disabled={refreshingUser || loadingUserMemberAndType}
                                    title="Refresh"
                                >
                                    {refreshingUser ? (
                                        <Loader2
                                            size={14} className="animate-spin"
                                        />
                                    ) : (
                                        <RefreshCw size={14} />
                                    )}
                                </Button>

                            </div>
                            }
                    />

                    <div className="flex-1 overflow-auto">
                        <DataTable
                            columns={columnsUser}
                            data={userByMemberAndType}
                            selectedRowId={selectedUser}
                            loading={loadingUserMemberAndType}
                            onRowClick={handleSelectUser}
                        />
                    </div>

                </Card>
            </div>

            {/* =================================================
                MODAL USER
            ================================================== */}
            <UserModal
                open={openModalUser}
                onClose={handleCloseModalUser}
                editingData={editingDataUser}
                businessId={businessId}
                businessMember={selectedBusinessMember}
                selectedRole={selectedRole}
                // brandOptions={brandRows}
                // unitOptions={unitRows}
                onCreate={handleSave}
                onUpdate={handleSave}
            />

        </>
    )

}