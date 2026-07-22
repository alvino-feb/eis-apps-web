import { useState,useEffect } from "react";
import {
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import {
  PageHeader,
  Card,
  CardHeader,
  Toolbar,
  SearchInput,
  DataTable,
  Modal,
  Button,
  StatusBadge
} from "../../../../components/ui";
import { useAuthStore }
from "../../../../store/authStore";
import { tableInventoryStore } from "../tables.store";

export default function WarehouseType() {
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const userId = useAuthStore((state) => state.userId);
    const businessId = useAuthStore((state) => state.businessId);
    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);
    const [saving, setSaving] = useState(false);
    const {setLoading} = tableInventoryStore();

    const fetchWarehouseType = tableInventoryStore(
        (state) => state.fetchWarehouseType
    );

    const warehouseType = tableInventoryStore(
        (state) => state.warehouseType
    );

    useEffect(() => {       
        if (!businessId) return;
            fetchWarehouseType(businessId,selectedBusinessMember.businessMemberId);
    }, 
    [
        businessId,
        selectedBusinessMember.businessMemberId,
        fetchWarehouseType
    ]);

    const filteredWarehouseType =
        Array.isArray(warehouseType)
        ? warehouseType.filter(
            (item) =>
                item.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
            )
    : [];

    const [form, setForm] =
        useState({
            code: "",
            name: "",
            description: "",
            isDefault: false,
            allowNegativeStock: false,
            isActive: true,
    });

      const handleEdit = (whType) => {
        try{
            setLoading(true);

            setEditing(whType);

            setForm({
                id: whType.id,
                code: whType.code || "",
                name: whType.name || "",
                description: whType.description || "",
                isDefault: whType.isDefault || false,
                allowNegativeStock: whType.allowNegativeStock || false,
                isActive: whType.isActive,
            });

            setOpenModal(true);
        }finally{
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpenModal(false);

        setForm({
            id:"",
            code: "",
            name: "",
            description: "",
            isDefault: false,
            allowNegativeStock: false,
            isActive: true,
        });

        setEditing(null);
    };

    const columns = [
        {
            key: "code",
            title: "Code",
        },
        {
            key: "name",
            title: "Name",
        },
        {
            key: "description",
            title: "Description",
        },
        {
            key: "isDefault",
            title: "Default",
            render: (row) => (
                <StatusBadge 
                    active={row.isDefault}
                    activeText="Yes"
                    inactiveText="No"
                />
            ),
        },
        {
            key: "allowNegativeStock",
            title: "Allow Negative Stock",
            render: (row) => (
                <StatusBadge 
                    active={row.allowNegativeStock}
                    activeText="Allowed"
                    inactiveText="Not Allowed"
                />
            ),
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
                        onClick={() => handleEdit(row)}
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                    >
                        <Pencil size={16} />
                    </button>

                    <button
                        // onClick={() => handleDelete(row.id)}
                        className="p-2 rounded-md hover:bg-red-50 text-red-600"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    // MODAL EDITING WH TYPE


    return (
        <>
            <div className="space-y-4 p-3">
                <PageHeader
                    title="Warehouse Type"
                    // description="Manage business profile and members"
                />
                <Card>
                    <CardHeader
                        title="Warehous Type List"
                        // description="Manage business users and roles"
                        action={
                            <Button //onClick={handleAdd}
                            >
                                <Plus size={14}/>
                            </Button>
                        }
                    />
                    <Toolbar 
                        left={
                            <SearchInput
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                    e.target.value
                                    )
                                }
                                placeholder="Search name..."
                            />
                        }
                    />

                    <DataTable
                        columns={columns}
                        data={filteredWarehouseType}
                    />
                </Card>
            </div>

            {/* MODAL EDITING */}
            <Modal
                open={openModal}
                onClose={handleCancel}
                loading={saving}
                title={editing ? "Edit Warehouse Type" : "Add Warehouse Type"}
            >
                <div className="grid gap-4">
                <div>
                    <label className="text-sm font-medium">Business Member</label>
                    <input
                        // value={
                        //     businessMember.find(
                        //     x =>
                        //     x.id === selectedMember
                        //     )?.name || ""
                        // }
                        readOnly
                        className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Role</label>
                    <input
                        // value={
                        //     rolesByMember.find(
                        //     x =>
                        //     x.id === selectedRole
                        //     )?.name || ""
                        // }
                        readOnly
                        className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Username</label>
                    <input
                        // value={userForm.username}
                        // onChange={(e)=>
                        //     setUserForm({
                        //         ...userForm,
                        //         username:e.target.value
                        //     })
                        // }
                        // readOnly={!!editingUser}
                        // className={`mt-1 w-full border rounded-md px-3 py-2 ${
                        //     editingUser ? "bg-gray-100" : ""
                        // }`}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                        // value={userForm.fullName}
                        // onChange={(e)=>
                        //     setUserForm({
                        //     ...userForm,
                        //     fullName:e.target.value
                        //     })
                        // }
                        className="mt-1 w-full border rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input
                        // value={userForm.phone}
                        // onChange={(e)=>
                        //     setUserForm({
                        //     ...userForm,
                        //     phone:e.target.value
                        //     })
                        // }
                        className="mt-1 w-full border rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative mt-1">
                    <input
                        // type={
                        // showPassword
                        //     ? "text"
                        //     : "password"
                        // }
                        // value={userForm.password}
                        // onChange={(e) =>
                        // setUserForm({
                        //     ...userForm,
                        //     password: e.target.value,
                        // })
                        // }
                        className="w-full border rounded-md px-3 py-2 pr-10"
                    />

                    {/* <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword
                        ? <EyeOff size={18} />
                        : <Eye size={18} />}
                    </button> */}
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium">Confirm Password</label>
                    <div className="relative mt-1">
                    <input
                        // type={
                        // showConfirmPassword
                        //     ? "text"
                        //     : "password"
                        // }
                        // value={userForm.confirmPassword}
                        // onChange={(e) =>
                        // setUserForm({
                        //     ...userForm,
                        //     confirmPassword: e.target.value,
                        // })
                        // }
                        className="w-full border rounded-md px-3 py-2 pr-10"
                    />

                    {/* <button
                        type="button"
                        onClick={() =>
                        setShowConfirmPassword(
                            !showConfirmPassword
                        )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword
                        ? <EyeOff size={18} />
                        : <Eye size={18} />}
                    </button> */}
                    </div>
                </div>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        // checked={userForm.isActive}
                        // onChange={(e)=>
                        //     setUserForm({
                        //         ...userForm,
                        //         isActive:e.target.checked
                        //     })
                        // }
                    />
                    Active
                </label>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                    {/* <Button variant="secondary" onClick={handleCancelUser}>Cancel</Button>
                    <Button onClick={handleSaveUser} disabled={savingUser}>Save</Button> */}
                </div>
                </div>
            </Modal>
        </>
    );
}