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

import { sysAdminStore } 
from "../system-administration.store"

export default function BusinessMember(){
    const userId =
        useAuthStore(
            (state) => state.userId
    );
    
    const businessId =
        useAuthStore(
            (state) => state.businessId
    );

    const fetchBusinessMember =
        sysAdminStore(
            (state) => state.fetchBusinessMember
    );

    const businessMember =
        sysAdminStore(
            (state) => state.businessMember
    );

    const createBusinessMember =
    sysAdminStore(
        (state) =>
        state.createBusinessMember
    );

    const updateBusinessMember =
    sysAdminStore(
        (state) =>
        state.updateBusinessMember
    );

    const deleteBusinessMember =
    sysAdminStore(
        (state) =>
        state.deleteBusinessMember
    );

    const [search, setSearch] =
        useState("");

    const [openMemberModal, setOpenMemberModal] =
    useState(false);

    const [editingMember, setEditingMember] =
    useState(null);

    const [saving, setSaving] =
    useState(false);

    const [deleting, setDeleting] =
    useState(false);

    const [form, setForm] =
    useState({
        code: "",
        name: "",
        phone: "",
        type:"",
        address: "",
        url: "",
        isActive: true,
    });

    const handleAdd = () => {
        setEditingMember(null);

        setForm({
            code: "",
            name: "",
            phone: "",
            type:"",
            address: "",
            url: "",
            isActive: true,
        });

        setOpenMemberModal(true);
    };

    const handleEdit = (
        member
        ) => {

        setEditingMember(member);

        setForm({
            code: member.code || "",
            name: member.name || "",
            phone: member.phone || "",
            type: member.type || "",
            address: member.address || "",
            url: member.url || "",
            isActive: member.isActive,
        });

        setOpenMemberModal(true);
    };

    const handleSave = async () => {
          if (!form.type?.trim()) {
            alert("Type wajib dipilih");
            return;
        }
        try {
     
            setSaving(true);

            if (editingMember) {
                await updateBusinessMember(
                editingMember.id,
                form,
                
                );
            } else {
                await createBusinessMember({
                ...form,
                businessId,
                });
            }

            await fetchBusinessMember(
                businessId
            );
            setOpenMemberModal(false);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete =
    async (
        businessMemberId
    ) => {

        const confirmed = window.confirm(
            "Delete this member?"
        );

        if (!confirmed) return;

        try {

            setDeleting(true);

            await deleteBusinessMember(
                businessMemberId
            );

            await fetchBusinessMember(
                businessId
            );

        } catch (err) {
            console.error(err);
        } finally {
            setDeleting(false);
        }
    };

    useEffect(() => {
  
        if (!businessId) return;
            fetchBusinessMember(businessId);
    }, 
    [
        userId,
        businessId
    ]);

    const filteredMembers =
        Array.isArray(businessMember)
        ? businessMember.filter(
            (item) =>
                item.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
            )
    : [];

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
            key: "type",
            title: "Type",
        },
        {
            key: "phone",
            title: "Phone",
        },
        {
            key: "address",
            title: "Address",
        },
        {
            key: "url",
            title: "Url",
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
                    handleEdit(row)
                    }
                    className="
                    p-2
                    rounded-md
                    hover:bg-blue-50
                    text-blue-600
                    "
                >
                    <Pencil size={16} />
                </button>

                <button
                    onClick={() =>
                    handleDelete(
                        row.businessMemberId
                    )
                    }
                    className="
                    p-2
                    rounded-md
                    hover:bg-red-50
                    text-red-600
                    "
                >
                    <Trash2 size={16} />
                </button>

                </div>

            ),
        },
    ];

    return (
    <div>
      {/* BUSINESS MEMBERS */}

      <Card>

        <CardHeader
          title="Business Members"
          description="Manage business users and roles"
          action={
            <Button
              onClick={handleAdd}
            >
              <Plus size={14} />
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
          data={filteredMembers}
        />

      </Card>

      {/* MEMBER MODAL */}

      <Modal
        open={openMemberModal}
        onClose={() =>
          setOpenMemberModal(
            false
          )
        }
        title={
            editingMember
                ? "Edit Business Member"
                : "Add Business Member"
            }
      >
        
        <div className="grid gap-4">
            <div>
                <label className="text-sm font-medium">Code</label>
                <input value={form.code}
                onChange={(e) =>
                    setForm({
                    ...form,
                    code:
                        e.target.value,
                    })
                } className="mt-1 w-full border rounded-md px-3 py-2"/>
            </div>

            <div>
                <label className="text-sm font-medium">Name</label>
                <input value={form.name}
                onChange={(e) =>
                    setForm({
                    ...form,
                    name:
                        e.target.value,
                    })
                } className="mt-1 w-full border rounded-md px-3 py-2"/>
            </div>
            
            <div>
                <label className="text-sm font-medium">Type</label>
                <select value={form.type}
                onChange={(e) =>
                setForm({
                    ...form,
                    type:
                    e.target.value,
                })
                } className=" mt-1 w-full border rounded-md px-3 py-2 " >
                    <option value="">-- Select Type --</option>
                    <option>Electronic</option>
                    <option>Retail</option>
                    <option>FnB </option>
                    <option>Accesoris</option>
                </select>
            </div>

            <div>
                <label className=" text-sm font-medium">Phone</label>
                <input value={form.phone}
                onChange={(e) =>
                    setForm({
                    ...form,
                    phone:
                        e.target.value,
                    })
                } className="mt-1 w-full border rounded-md px-3 py-2"/>
            </div>
            
            <div>
                <label className=" text-sm font-medium">Address</label>
                <input value={form.address}
                onChange={(e) =>
                    setForm({
                    ...form,
                    address:
                        e.target.value,
                    })
                } className="mt-1 w-full border rounded-md px-3 py-2"/>
            </div>

            <div>
                <label className=" text-sm font-medium">Url</label>
                <input value={form.url}
                onChange={(e) =>
                    setForm({
                    ...form,
                    url:
                        e.target.value,
                    })
                } className="mt-1 w-full border rounded-md px-3 py-2"/>
            </div>

            <div>
                <label
                    className="
                        flex
                        items-center
                        gap-2
                    "
                    >
                    <input
                        type="checkbox"
                        checked={form.isActive}
                        onChange={(e) =>
                        setForm({
                            ...form,
                            isActive:
                            e.target.checked,
                        })
                        }
                    />

                    Active
                </label>
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    variant="secondary"
                    onClick={() =>
                    setOpenMemberModal(
                        false
                    )
                    }
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleSave}
                    disabled={saving}
                >
                    {
                    saving
                        ? "Saving..."
                        : "Save"
                    }
                </Button>
            </div>

        </div>

      </Modal>

    </div>
  );
}