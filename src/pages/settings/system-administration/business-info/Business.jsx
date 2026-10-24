import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  LogOut,
  Store,
  Pencil,
  Plus,
  Trash2
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
import { useAuthStore } from "../../../../store/authStore";
import { sysAdminStore } from "../system-administration.store"
import useToastStore from "../../../../store/toastStore";
import { hasChanges } from "../../../../common/helpers/object.js";
import { BUSINESS_TYPE_OPTIONS } from "../../../../common/constants/enum.js";

export default function Business() {
  
  const businessId = useAuthStore((state) => state.businessId);
  const userId = useAuthStore((state) => state.userId);
  const fetchBusiness = sysAdminStore((state) => state.fetchBusiness);
  const business = sysAdminStore((state) => state.business);
  const updateBusiness = sysAdminStore((state) => state.updateBusiness);
  const [openBusinessModal, setOpenBusinessModal] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [editingData, setEditingData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  } = useToastStore();

  const handleOpenModal =
  () => {
    setEditingData(business);
    setOriginalData(business);
    setOpenBusinessModal(true);
  };

  const handleCloseModal = () => {
      formik.resetForm();
      setOpenBusinessModal(false);
      setEditingData(null);
      setOriginalData(null);
  };

  useEffect(() => {
    if (!businessId) return;
      fetchBusiness(businessId);
    }, 
    [
    businessId,
    fetchBusiness
    ]
  );

  const validationSchema = Yup.object({
      name: Yup.string()
          .required("Name is required")
          .max(100,"Name maximum 100 characters"),

      type: Yup.string()
          .required("type is required"),

      phone: Yup.string()
          .required("Phone number is required"),
      
      address: Yup.string()
          .required("Address Date is required"),
  });
      
  /*
  * =========================================================
  * PRICELIST FORMIK
  * =========================================================
  */
  const formik = useFormik({
      initialValues:
          editingData ? {
              name: editingData.name ?? "",
              type: editingData.type ?? "",
              ownerName: editingData.ownerName ?? "",
              phone: editingData.phone ?? "",
              address: editingData.address ?? "",
              nation: editingData.nation ?? "",
              province: editingData.province ?? "",
              city: editingData.city ?? "",
              isActive: editingData.isActive ?? true,
          } : {
              name: "",
              type: "",
              ownerName:"",
              phone:"",
              address: "",
              nation: "",
              province: "",
              city: "",
              isActive: true,
          },

      enableReinitialize: true,

      validationSchema,

      onSubmit: async (values) => {
          try {
              /*
                * =========================================
                * UPDATE
                * =========================================
                */
              if (editingData) {
                  const changed =
                      hasChanges(
                          originalData,
                          values,
                          [
                              "name",
                              "type",
                              "ownerName",
                              "phone",
                              "address",
                              "nation",
                              "province",
                              "city",
                              "isActive"
                          ]
                      );

                  if (!changed) {
                      showWarning("No changes detected.");
                      handleCloseModal();
                      return;
                  }

                  await updateBusiness(
                      businessId,
                      values
                  );

                  fetchBusiness(businessId);
              }

              /*
                * =========================================
                * CREATE
                * =========================================
                */
              else {
                  // await createPricelist(
                  //     businessId,
                  //     businessMemberId,
                  //     values
                  // );
              }

              handleCloseModal();

              showSuccess("Data saved successfully.");

          } catch (err) {
              showError(
                  err.response?.data?.message ??
                  "Failed to save pricelist."
              );
          }
      },
  });
  
  return (
    <div>
      <Card>
        <CardHeader
          title="Business Information"
          description="General information about business"
          action={
            <Button onClick={handleOpenModal}>
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
        onClose={handleCloseModal}
        loading={saving}
        title="Edit Business Information"
      >
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div className="grid gap-4">

            {/* Name*/}
            <div>
              <label className="mb-1 block text-sm font-medium">
                  Name
              </label>

              <TextInput
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.name &&
                      formik.errors.name
                  }
              />
              {formik.touched.name &&
                  formik.errors.name && (
                      <p className="mt-1 text-xs text-red-500">
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
                  options={BUSINESS_TYPE_OPTIONS}
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

            {/* Owner Name */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                  Owner Name
              </label>

              <TextInput
                  name="ownerName"
                  value={formik.values.ownerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.ownerName &&
                      formik.errors.ownerName
                  }
              />
              {formik.touched.ownerName &&
                  formik.errors.ownerName && (
                      <p className="mt-1 text-xs text-red-500">
                          {formik.errors.ownerName}
                      </p>
                  )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                  Phone
              </label>

              <TextInput
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.phone &&
                      formik.errors.phone
                  }
              />
              {formik.touched.phone &&
                  formik.errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                          {formik.errors.phone}
                      </p>
                  )}
            </div>

            {/* Address */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                  Address
              </label>

              <TextInput
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.address &&
                      formik.errors.address
                  }
              />
              {formik.touched.address &&
                  formik.errors.address && (
                      <p className="mt-1 text-xs text-red-500">
                          {formik.errors.address}
                      </p>
                  )}
            </div>

            {/* Nation */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                  Nation
              </label>

              <TextInput
                  name="nation"
                  value={formik.values.nation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.nation &&
                      formik.errors.nation
                  }
              />
              {formik.touched.nation &&
                  formik.errors.nation && (
                      <p className="mt-1 text-xs text-red-500">
                          {formik.errors.nation}
                      </p>
                  )}
            </div>

            {/* Province */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                  Province
              </label>

              <TextInput
                  name="province"
                  value={formik.values.province}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.province &&
                      formik.errors.province
                  }
              />
              {formik.touched.province &&
                  formik.errors.province && (
                      <p className="mt-1 text-xs text-red-500">
                          {formik.errors.province}
                      </p>
                  )}
            </div>
            
            {/* City */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                  City
              </label>

              <TextInput
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                      formik.touched.city &&
                      formik.errors.city
                  }
              />
              {formik.touched.city &&
                  formik.errors.city && (
                      <p className="mt-1 text-xs text-red-500">
                          {formik.errors.city}
                      </p>
                  )}
            </div>

            <Checkbox
                label="Active"
                name="isActive"
                checked={formik.values.isActive}
                onChange={(e) =>
                    formik.setFieldValue(
                        "isActive",
                        e.target.checked
                    )
                }
            />

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button variant="secondary" type="button" onClick={handleCloseModal}>
                Cancel
              </Button>

              <Button type="submit" disabled={saving}>
               {saving
                  ? "Saving..."
                  : editingData
                      ? "Update"
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