import { useState, useEffect } from "react";
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
import BusinessMember from "./businessMember";

export default function Business() {
  const [saving, setSaving] = useState(false);
  const userId = useAuthStore((state) => state.userId);
  const businessId = useAuthStore((state) => state.businessId);
  const fetchBusiness = sysAdminStore((state) => state.fetchBusiness);
  const business = sysAdminStore((state) => state.business);
  const updateBusiness = sysAdminStore((state) => state.updateBusiness);
  const [openBusinessModal, setOpenBusinessModal] = useState(false);

  const [form, setForm] =
  useState({
    id:"",
    name: "",
    ownerName: "",
    type: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    nation: "",
  });

  const {
    showSuccess,
    showError,
    // showWarning,
    // showInfo,
  } = useToastStore();

  const handleOpenEdit =
  () => {
    setForm({
      id: business?.id || "",
      name: business?.name || "",
      ownerName: business?.ownerName || "",
      type: business?.type || "",
      email: business?.email || "",
      phone: business?.phone || "",
      address: business?.address || "",
      city: business?.city || "",
      province: business?.province || "",
      nation: business?.nation || "",
    });
    setOpenBusinessModal(true);
  };

  const handleSave = async () => {

    try {        
      setSaving(true);

      await updateBusiness(
        businessId,
        form
      );

      await fetchBusiness(
        businessId
      );

      setOpenBusinessModal(false);

      showSuccess(
        "Business save successfully."
      );

    } catch (err) {
      showError(
          err.response?.data?.message ??
          "Failed to save business."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setOpenBusinessModal(false);

    setForm({
      id: "",
      name: "",
      ownerName: "",
      type: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      province: "",
      nation: "",
    });

  };

  useEffect(() => {
    if (!businessId) return;
      fetchBusiness(businessId);
  }, 
  [
    userId,
    businessId,
    fetchBusiness
  ]);

  return (
    <div>
      <Card>
        <CardHeader
          title="Business Information"
          description="General information about business"
          action={
            <Button onClick={handleOpenEdit}>
              <Pencil size={14} />
            </Button>
          }
        />

        <div className="p-5 grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-gray-500 mb-1">Business Name</div>
            <div className="font-bold">{business?.name}</div>
          </div>

          <div>
            <div className=" text-xs text-gray-500 mb-1">Address</div>
            <div className="font-bold">{business?.address}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 -1">Owner</div>
            <div className="font-bold">{business?.ownerName}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 -1">City</div>
            <div className="font-bold">{business?.city}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500 mb-1">Type</div>
            <div className="font-bold">{business?.type}</div>
          </div>

          <div>
            <div className=" text-xs text-gray-500 mb-1">Province</div>
            <div className="font-bold">{business?.province}</div>
          </div>

          <div>
            <div className=" text-xs text-gray-500 mb-1">Phone</div>
            <div className="font-bold">{business?.phone}</div>
          </div>

          <div>
            <div className=" text-xs text-gray-500 mb-1">Nation</div>
            <div className="font-bold">{business?.nation}</div>
          </div>
        </div>

      </Card>

      {/* BUSINESS MODAL */}
      <Modal
        open={openBusinessModal}
        onClose={handleCancel}
        loading={saving}
        title="Edit Business Information"
      >

        <div className="grid gap-4">
          <div>
            <label className="text-sm font-medium">ID</label>
            <input value={form.id}
              onChange={(e) =>
                setForm({
                  ...form,
                  id:
                    e.target.value,
                })
              } 
              readOnly
              className="mt-1 w-full border rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Business Name</label>
            <input value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value,
                })
              } 
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Owner</label>
            <input value={form.ownerName}
              onChange={(e) =>
                setForm({
                  ...form,
                  ownerName:
                    e.target.value,
                })
              } 
              className="mt-1 w-full border rounded-md px-3 py-2"
            />
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
              } 
              className="mt-1 w-full border rounded-md px-3 py-2 " 
            >
                <option>PT</option>
                <option>Perorangan</option>
                <option>Koperasi</option>
                <option>Limited</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone:
                    e.target.value,
                })
              } 
              className=" mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <input value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address:
                    e.target.value,
                })
              } 
              className=" mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">City</label>
            <input value={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city:
                    e.target.value,
                })
              } 
              className=" mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Province</label>
            <input value={form.province}
              onChange={(e) =>
                setForm({
                  ...form,
                  province:
                    e.target.value,
                })
              } 
              className=" mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Nation</label>
            <input value={form.nation}
              onChange={(e) =>
                setForm({
                  ...form,
                  nation:
                    e.target.value,
                })
              } 
              className=" mt-1 w-full border rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={saving}>
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