import { useState,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import useToastStore 
from "../../../../store/toastStore";
import {
  hasChanges 
} from "../../../../common/helpers/object.js";
import { confirm } from "../../../../common/helpers/confirm.js";

export default function BusinessMember(){
    const userId = useAuthStore((state) => state.userId);
    const businessId = useAuthStore((state) => state.businessId);
    const fetchBusinessMember = sysAdminStore((state) => state.fetchBusinessMember);
    const businessMember = sysAdminStore((state) => state.businessMember);
    const createBusinessMember = sysAdminStore((state) => state.createBusinessMember);
    const updateBusinessMember = sysAdminStore((state) => state.updateBusinessMember);
    const deleteBusinessMember = sysAdminStore((state) => state.deleteBusinessMember);
    const clearBusinessMember = sysAdminStore((state) => state.clearBusinessMember);
    const [search, setSearch] = useState("");
    const [openMemberModal, setOpenMemberModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [saving, setSaving] = useState(false);
    const [originalMember, setOriginalMember] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const {
        showSuccess,
        showError,
        showWarning,
        // showInfo,
    } = useToastStore();

    const formik = useFormik({
        initialValues: {
            code: "",
            name: "",
            phone: "",
            type:"",
            address: "",
            url: "",
            isActive: true,
        },

        validationSchema: Yup.object({
            code: Yup.string().required("Code is required"),
            name: Yup.string().required("Name is required"),
            phone: Yup.string().required("Phon is required"),
            type: Yup.string().required("Type is required"),
            address: Yup.string().required("Address"),
            url: Yup.string().required("Url is required"),
        }),

        onSubmit: async (values) => {
            try {
                setSaving(true);
                if (editingMember) {
                    const changed = hasChanges(
                        originalMember,
                        values,
                        [
                            "code",
                            "name",
                            "phone",
                            "type",
                            "address",
                            "url",
                            "isActive",
                        ]
                    );

                    if (!changed) {
                        showWarning(
                            "No changes detected !"
                        );
                        setOpenMemberModal(false);
                        return;
                    }

                    await updateBusinessMember(
                        editingMember.id,
                        values,
                    );
                } else {
                    await createBusinessMember({
                        ...values,
                        businessId,
                    });
                }

                await fetchBusinessMember(
                    businessId
                );

                setOpenMemberModal(false);

                showSuccess(
                    "Business member save successfully."
                );
            } catch (err) {
                showError(
                    err.response?.data?.message ??
                    "Failed to save business member."
                );
            } finally {
                setSaving(false);
            }
        },
    });
    
    const handleAdd = () => {
        setEditingMember(null);
        formik.resetForm();
        setOpenMemberModal(true);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setOriginalMember(member);
        formik.setValues({
            code: member.code ?? "",
            name: member.name ?? "",
            phone: member.phone ?? "",
            type: member.type ?? "",
            address: member.address ?? "",
            url: member.url ?? "",
            isActive: member.isActive ?? true,
        });
        setOpenMemberModal(true);
    };

    const handleCancel = () => {
        formik.resetForm();
        setEditingMember(null);
        setOpenMemberModal(false);
    };

    const handleDelete = async (member) => {
        const ok = await confirm({
            title: "Delete Business Member",
            message: `Delete "${member.code}" ?`,
            variant: "danger",
            confirmText: "Delete",
        });

        if (!ok) return;
        
        try {
            clearBusinessMember();
            setDeleting(true);
            await deleteBusinessMember(
                businessId,
                member.id
            );
            await fetchBusinessMember(
                businessId
            );
            showWarning(
                "Business member deleted !"
            );
        } catch (err) {
            showError(
                err.response?.data?.message ??
                "Failed to delete business member !"
            );
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
        businessId,
        fetchBusinessMember
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
                        onClick={() => handleEdit(row)}
                        className="p-2 rounded-md hover:bg-blue-50 text-blue-600"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(row)}
                        className="p-2 rounded-md hover:bg-red-50 text-red-600"
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
            <Button onClick={handleAdd}>
              <Plus size={14} />
            </Button>
          }
        />

        <Toolbar
          left={
            <SearchInput
              value={search}
              onChange={
                (e) => setSearch(e.target.value)
              }
              placeholder="Search name..."
            />
          }
        />

        <DataTable
          columns={columns}
          data={filteredMembers}
          loading={deleting}
        />
      </Card>

      {/* MEMBER MODAL */}
        <Modal
            open={openMemberModal}
            onClose={() => setOpenMemberModal(false)}
            loading={saving}
            title={
                editingMember
                    ? "Edit Business Member"
                    : "Add Business Member"
                }
        >
            <form
                onSubmit={formik.handleSubmit}
                // className="bg-white shadow-md rounded-lg p-8 border"
            >
                <div className="grid gap-4">
                    <div>
                        <label className="text-sm font-medium">Code</label>
                        <input 
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.code &&
                                formik.errors.code
                            }
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                        {formik.touched.code && formik.errors.code && (
                            <p className="mt-1 text-sm text-red-500">
                                {formik.errors.code}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input 
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.name &&
                                formik.errors.name
                            }
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {formik.errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm font-medium">Type</label>
                        <select 
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.type &&
                                formik.errors.type
                            }
                            className=" mt-1 w-full border rounded-md px-3 py-2 " 
                        >
                            <option value="">-- Select Type --</option>
                            <option>Electronic</option>
                            <option>Retail</option>
                            <option>FnB </option>
                            <option>Accesoris</option>
                        </select>
                        {formik.touched.type && formik.errors.type && (
                            <p className="mt-1 text-sm text-red-500">
                                {formik.errors.type}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className=" text-sm font-medium">Phone</label>
                        <input 
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.phone &&
                                formik.errors.phone
                            }
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                                {formik.errors.phone}
                            </p>
                        )}
                    </div>
                    
                    <div>
                        <label className=" text-sm font-medium">Address</label>
                        <input 
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.address &&
                                formik.errors.address
                            } 
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                        {formik.touched.address && formik.errors.address && (
                            <p className="mt-1 text-sm text-red-500">
                                {formik.errors.address}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className=" text-sm font-medium">Url</label>
                        <input 
                            name="url"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.url &&
                                formik.errors.url
                            } 
                            className="mt-1 w-full border rounded-md px-3 py-2"
                        />
                        {formik.touched.url && formik.errors.url && (
                            <p className="mt-1 text-sm text-red-500">
                                {formik.errors.url}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formik.values.isActive}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.isActive &&
                                    formik.errors.isActive
                                } 
                            />
                            Active
                        </label>
                    </div>

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            // onClick={handleSave}
                            type="submit"
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
            </form>
        </Modal>

    </div>
  );
}