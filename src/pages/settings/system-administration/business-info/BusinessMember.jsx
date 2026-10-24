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
  DataTableV2,
  Modal,
  Button,
  StatusBadge,
  Select,
  FilterPanel,
  TextInput,
  Checkbox
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
import { BUSINESS_MEMBER_TYPE_OPTIONS } from "../../../../common/constants/enum.js";

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

    const validationSchema = Yup.object({
          name: Yup.string()
              .required("Name is required")
              .max(100,"Name maximum 100 characters"),
    
          type: Yup.string()
              .required("type is required"),
    
          phone: Yup.string()
              .required("Phone number is required"),
          
          address: Yup.string()
              .required("address Date is required"),
      });

    const formik = useFormik({

        initialValues:
        editingMember ? {
            id: editingMember.id ?? "",
            code: editingMember.code ?? "",
            name: editingMember.name ?? "",
            phone: editingMember.phone ?? "",
            type: editingMember.type ?? "",
            address: editingMember.address ?? "",
            url: editingMember.url ?? "",
            init : editingMember.init ?? "",
            isActive: editingMember.isActive ?? true,
        } : {
            code: "",
            name: "",
            phone: "",
            type: "",
            address: "",
            url: "",
            init: "",
            isActive: true,
        },

        enableReinitialize: true,

        validationSchema,

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
                            "init",
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

                    const payload = {
                        ...values,
                        init: values.init === "INIT" ? "INIT-Y" : values.init,
                    };

                    await updateBusinessMember(
                        editingMember.id,
                        payload,
                    );

                } else {
                    await createBusinessMember({
                        ...values,
                        businessId,
                    });
                }
                
                handleCloseModal();

                await fetchBusinessMember(
                    businessId
                );

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

    const handleEdit = (row) => {       
        setEditingMember(row);
        setOriginalMember(row);
        setOpenMemberModal(true);
    };

    const handleCloseModal = () => {
      formik.resetForm();
      setOpenMemberModal(false);
      setEditingMember(null);
      setOriginalMember(null);
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
                        onClick={(e) => {e.stopPropagation();
                            handleEdit(row);
                        }}
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
            onClose={handleCloseModal}
            loading={saving}
            title={
                editingMember
                    ? "Edit Business Member"
                    : "Add Business Member"
                }
        >
            <form onSubmit={formik.handleSubmit} className="space-y-3">
                <div className="grid gap-4">
                    <div>
                        <label className="text-sm font-medium">
                            Code
                        </label>
                        <input 
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={
                                !!editingMember &&
                                formik.initialValues.init !== "INIT"
                            }
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

                    {/* Type*/}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Type
                        </label>
                        <Select
                            name="type"
                            options={BUSINESS_MEMBER_TYPE_OPTIONS}
                            value={formik.values.type}
                            onChange={(value) =>
                                formik.setFieldValue(
                                    "type",
                                    value
                                )
                            }
                            error={
                                formik.touched.type &&
                                formik.errors.type
                            }
                        />
                        {formik.touched.type &&
                        formik.errors.type && (
                            <p className="mt-1 text-xs text-red-500">
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
                            onClick={handleCloseModal}
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