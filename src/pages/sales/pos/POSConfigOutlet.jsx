import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "../../../components/ui";
import { hasChanges } from "../../../common/helpers/object.js";

import { useAuthStore } from "../../../store/authStore.js";
import useToastStore from "../../../store/toastStore";
import{ POSConfigStore } from "./pos-config.store.js";
import { warehouseStore } from "../../inventory/warehouse/warehouse.store.js";
import { pricelistStore } from "../tables/pricelist/pricelist.store.js";

export default function POSConfigOutlet() {
    const { outletId } = useParams();
    const navigate = useNavigate();  
    
    const initValues= {
        // id:"",
        outletId: outletId,
        outletCode: "",
        outletName: "",
        posName: "",
        mainWarehouseId: "",
        returnWarehouseId: "",
        priceListId: "",
        receiptHeader: "",
        receiptFooter: "",
        isActive: true,
    };

    /*
    * =========================================================
    * AUTH
    * =========================================================
    */
    const businessId = useAuthStore((state) => state.businessId);
    const selectedBusinessMember = useAuthStore((state) => state.selectedBusinessMember);
    const businessMemberId =selectedBusinessMember?.businessMemberId;

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
    * MODAL STATE
    * =========================================================
    */
    const [openModalPosConfig, setOpenModalPosConfig] = useState(false);
    const [editingDataPosConfig, setEditingDataPosConfig] = useState(null);
    const [originalDataPosConfig, setOriginalDataPosConfig] = useState(null);

    /*
    * =========================================================
    * PRICELIST TABLE STATE
    * =========================================================
    */
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(999);
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const sortBy = "code";
    const sortOrder = "asc";

    /*
    * =========================================================
    * STORE
    * =========================================================
    */
    const fetchPosConfigOutlet = POSConfigStore((state) => state.fetchPosConfigOutlet); 
    const posConfigOutlet = POSConfigStore((state) => state.posConfigOutlet);

    const createPosConfig = POSConfigStore((state) => state.createPosConfig);
    const updatePosConfig = POSConfigStore((state) => state.updatePosConfig);
    const deletePosConfig = POSConfigStore((state) => state.deletePosConfig);

    const saving = POSConfigStore((state) => state.loading.posConfigOutlet);

    const fetchWarehouse = warehouseStore((state) => state.fetchWarehouse);
    const warehouse = warehouseStore((state) => state.warehouse);

    const fetchPricelist = pricelistStore((state) => state.fetchPricelist);
    const pricelist = pricelistStore((state) => state.pricelist);

    /*
    * =========================================================
    * Data
    * =========================================================
    */
    const rowsPosConfigOutlet = posConfigOutlet?.data ?? [];

    const outletCode = rowsPosConfigOutlet?.outletCode ?? "";
    const outletName = rowsPosConfigOutlet?.outletName ?? "";

    const warehouseRows = warehouse?.data ?? [];
    const warehouseOptions =
    warehouseRows.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
    }));

    const pricelistRows = pricelist?.data ?? [];
    const pricelistOptions =
    pricelistRows.map((item) => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
    }));
    /*
    * =========================================================
    * FETCH
    * =========================================================
    */
    useEffect(() => {        
            if (!businessId || !businessMemberId || !outletId
            ) {
                return;
            }

            const query = {
                businessId,
                businessMemberId,
                outletId
            };
            
            fetchPosConfigOutlet(query)
        }, [
            businessId,
            businessMemberId,
            outletId,
            fetchPosConfigOutlet
    ]);
    
    useEffect(() => {      
        if (!businessId || !businessMemberId) return;

            fetchWarehouse({
                businessId,
                businessMemberId,
                page: "1",
                limit: "999",
                sortBy : "code",
                sortOrder : "asc",
            });
        }, 
        [
            businessId,
            businessMemberId,
            fetchWarehouse
        ]
    );

    useEffect(() => {      
        if (!businessId || !businessMemberId) return;

            fetchPricelist({
                businessId,
                businessMemberId,
                page: "1",
                limit: "999",
                sortBy : "code",
                sortOrder : "asc",
            });
        }, 
        [
            businessId,
            businessMemberId,
            fetchPricelist
        ]
    );

    /*
    * =========================================================
    * EVENT HANDLER
    * =========================================================
    */
    const handleCreatePosConfig = async () => {
        const query = {
            businessId,
            businessMemberId,
            outletId,
        };

        await fetchPosConfigOutlet(query);

        const data = rowsPosConfigOutlet?.id
            ? rowsPosConfigOutlet
            : null;
            
        setEditingDataPosConfig(data);
        setOriginalDataPosConfig(data);
        setOpenModalPosConfig(true);
    };

    const handleCloseModalPosConfig = () => {
        setEditingDataPosConfig(null);
        setOriginalDataPosConfig(null);
        setOpenModalPosConfig(false);
    };

    const validationSchema = Yup.object({
        posName: Yup.string()
            .required("Name is required")
            .min(3, "Name minumum 3 charater")
            .max(25, "Code maximum 25 characters"),

        mainWarehouseId: Yup.string()
            .required("Main Warehouse is required"),

        returnWarehouseId: Yup.string()
            .required("Return Warehouse is required"),

        priceListId: Yup.string()
            .required("Pricelist is Requeired"),

        receiptHeader: Yup.string()
            .required("Receipt header is Requeired"),
        
        receiptFooter: Yup.string()
           .required("Receipt footer is Requeired"),
    });

    /*
    * =========================================================
    * FORMIK
    * =========================================================
    */
    const formikPOSConfig = useFormik({
        initialValues:
            editingDataPosConfig
                ? {
                    posName: editingDataPosConfig.posName ?? "",
                    outletId: editingDataPosConfig.outletId ?? outletId,
                    outletCode: editingDataPosConfig.outletCode ?? "",
                    outletName: editingDataPosConfig.outletName ?? "",
                    mainWarehouseId: editingDataPosConfig.mainWarehouseId ?? "",
                    returnWarehouseId: editingDataPosConfig.returnWarehouseId ?? "",
                    priceListId: editingDataPosConfig.priceListId ?? "",
                    receiptHeader: editingDataPosConfig.receiptHeader ?? "",
                    receiptFooter: editingDataPosConfig.receiptFooter ?? "",
                    isActive: editingDataPosConfig.isActive ?? true,
                }
                : initValues,

        enableReinitialize: true,

        validationSchema,

        onSubmit: async (values) => {
            try {           
                              
                if (editingDataPosConfig) {
                    
                    const changed= hasChanges(
                        originalDataPosConfig,
                        values,
                        [
                            "outletId",
                            "outletCode",
                            "outletName",
                            "posName",
                            "mainWarehouseId",
                            "returnWarehouseId",
                            "priceListId",
                            "receiptHeader",
                            "receiptFooter",
                            "isActive",
                        ]
                    );
                    
                    if(!changed){
                        showWarning("No changes detected.");
                        setOpenModalPosConfig(false);
                        return;
                    }

                    await updatePosConfig(
                        businessId,
                        businessMemberId,
                        editingDataPosConfig.id,
                        values
                    );

                } else {                   

                    await createPosConfig(
                        businessId,
                        businessMemberId,
                        values
                    );

                }

                const query = {
                    businessId,
                    businessMemberId,
                    outletId
                };
                
                fetchPosConfigOutlet(query)

                handleCloseModalPosConfig();

            } catch (err) {
               
                showError(
                    err.response?.data?.message ??
                    "Failed to save data."
                );
            } 
        },
    });
    
    return (
        <>
            <div className="space-y-4 p-3">
                <PageHeader 
                    title="POS Outlet Configuration"
                    description={
                        <button
                            type="button"
                            onClick={() => navigate("/sl/pos")}
                            className="text-sm text-slate-500 hover:text-slate-900"
                        >
                            ← Back to Outlet
                        </button>
                    }
                />

                <Card>
                    <CardHeader
                    title="General"
                    // description="Manage category hierarchy"
                    action={
                        <Button 
                            onClick={handleCreatePosConfig}
                        >
                            <Pencil size={14} />
                        </Button>
                    }
                    />

                    <div className="p-5 grid md:grid-cols-2 gap-3">
                        <div>
                            <div className="text-xs text-gray-500 mb-1">Outlet</div>
                            <div className="font-bold">{rowsPosConfigOutlet.outletCode} - {rowsPosConfigOutlet.outletName}</div>
                        </div>

                        <div>
                            <div className=" text-xs text-gray-500 mb-1">POS Name</div>
                            <div className="font-bold">{rowsPosConfigOutlet?.posName || "-"}</div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-500 -1">Main Warehouse</div>
                            <div className="font-bold">
                                {rowsPosConfigOutlet?.mainWarehouseCode || ""}
                                {" - "}
                                {rowsPosConfigOutlet?.mainWarehouseName || ""}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-500 -1">Return Warehouse</div>
                            <div className="font-bold">
                                {rowsPosConfigOutlet?.returnWarehouseCode || ""}
                                {" - "}
                                {rowsPosConfigOutlet?.returnWarehouseName || ""}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-gray-500 mb-1">Pricelist</div>
                            <div className="font-bold">
                                {rowsPosConfigOutlet?.priceListCode || ""}
                                {" - "}
                                {rowsPosConfigOutlet?.priceListName || ""}
                            </div>
                        </div>

                        <div>
                            <div className=" text-xs text-gray-500 mb-1">Status</div>
                            <StatusBadge
                                active={rowsPosConfigOutlet.isActive}
                            />
                        </div>
                    </div>
                </Card>

                {/* USERS */}
                <Card className="h-[500px] flex flex-col">
                    <CardHeader
                        title="Users"
                        action={
                            <Button
                            // onClick={handleAddUser}
                            // disabled={
                            //     !selectedMember ||
                            //     !selectedRole
                            // }
                            >
                                <Plus size={14}/>
                            </Button>
                        }
                    />

                    <div className="lex-1 overflow-auto">
                        <DataTableV2
                        // columns={columnsUser}
                        // data={userByMemberAndRole}
                        // loading={userByMemberAndRoleLoading}
                        // onRowClick={handleSelectUser}
                        />
                    </div>
                </Card>
            </div>

            {/* Modal Editor */}
            <Modal
                open={openModalPosConfig}
                onClose={handleCloseModalPosConfig}
                loading={saving}
                title={
                    editingDataPosConfig
                        ? "Edit POS Config"
                        : "Add POS Config"
                }
            >
                <form
                    onSubmit={formikPOSConfig.handleSubmit}
                    className="space-y-3"
                >
                    {/* Outlet */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Outlet
                        </label>
                        <TextInput
                            name="outletCode"
                            value={`${outletCode} - ${outletName}`}
                            // onChange={formikPOSConfig.handleChange}
                            // onBlur={formikPOSConfig.handleBlur}
                            disabled
                            // error={
                            //     formikPOSConfig.touched.outletCode &&
                            //     formikPOSConfig.errors.outletCode
                            // }
                        />
                    </div>
                   
                    {/* POS Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            POS Name
                        </label>

                        <TextInput
                            name="posName"
                            value={formikPOSConfig.values.posName}
                            onChange={formikPOSConfig.handleChange}
                            onBlur={formikPOSConfig.handleBlur}
                            error={
                                formikPOSConfig.touched.posName &&
                                formikPOSConfig.errors.posName
                            }
                        />
                        {formikPOSConfig.touched.posName &&
                            formikPOSConfig.errors.posName && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikPOSConfig.errors.posName}
                                </p>
                            )}
                    </div>
                    
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Main Warehouse
                        </label>

                        <Select
                            name="mainWarehouseId"
                            options={warehouseOptions}
                            value={formikPOSConfig.values.mainWarehouseId}
                            onChange={(value) =>
                                formikPOSConfig.setFieldValue(
                                    "mainWarehouseId",
                                    value
                                )
                            }
                        />
        
                        {formikPOSConfig.touched.mainWarehouseId &&
                            formikPOSConfig.errors.mainWarehouseId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikPOSConfig.errors.mainWarehouseId}
                                </p>
                            )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Return Warehouse
                        </label>

                        <Select
                            name="returnWarehouseId"
                            options={warehouseOptions}
                            value={formikPOSConfig.values.returnWarehouseId}
                            onChange={(value) =>
                                formikPOSConfig.setFieldValue(
                                    "returnWarehouseId",
                                    value
                                )
                            }
                        />
        
                        {formikPOSConfig.touched.returnWarehouseId &&
                            formikPOSConfig.errors.returnWarehouseId && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikPOSConfig.errors.returnWarehouseId}
                                </p>
                            )}
                    </div>
                    
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Pricelist
                        </label>

                        <Select
                            name="priceListId"
                            options={pricelistOptions}
                            value={formikPOSConfig.values.priceListId}
                            onChange={(value) =>
                                formikPOSConfig.setFieldValue(
                                    "priceListId",
                                    value
                                )
                            }
                        />
        
                        {formikPOSConfig.touched.priceListId &&
                        formikPOSConfig.errors.priceListId && (
                            <p className="mt-1 text-xs text-red-500">
                                {formikPOSConfig.errors.priceListId}
                            </p>
                        )}
                    </div>

                    {/* Receipt Header */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Receipt Header
                        </label>

                        <textarea
                            name="receiptHeader"
                            rows={2}
                            value={formikPOSConfig.values.receiptHeader}
                            onChange={formikPOSConfig.handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                         {formikPOSConfig.touched.receiptHeader &&
                            formikPOSConfig.errors.receiptHeader && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikPOSConfig.errors.receiptHeader}
                                </p>
                            )}
                    </div>
                    
                    {/* Receipt Footer */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Receipt Footer
                        </label>

                        <textarea
                            name="receiptFooter"
                            rows={2}
                            value={formikPOSConfig.values.receiptFooter}
                            onChange={formikPOSConfig.handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                        />
                         {formikPOSConfig.touched.receiptFooter &&
                            formikPOSConfig.errors.receiptFooter && (
                                <p className="mt-1 text-xs text-red-500">
                                    {formikPOSConfig.errors.receiptFooter}
                                </p>
                            )}
                    </div>
                        
                    <div>
                        <Checkbox
                            label="Active"
                            checked={formikPOSConfig.values.isActive}
                            onChange={(e) =>
                                formikPOSConfig.setFieldValue(
                                    "isActive",
                                    e.target.checked
                                )
                            }
                        />
                    </div>
                        
                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t pt-4">

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCloseModalPosConfig}
                            disabled={saving}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={saving}>
                            {saving
                                ? "Saving..."
                                : editingDataPosConfig
                                    ? "Update"
                                    : "Save"
                            }
                        </Button>
                        
                    </div>

                </form>
            </Modal>
        </>
        
    );
    
}