import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Store
} from "lucide-react";
import {
    CardHeader,
    Toolbar,
    SearchInput,
    DataTableV2,
    Modal,
    Button,
    StatusBadge,
    FilterPanel,
    TextInput,
    Checkbox,
    Select,
} from "../../../components/ui";

import { useAppStore } from "../../../store/appStore";
import { useAuthStore } from "../../../store/authStore.js";
import useToastStore from "../../../store/toastStore";
import{ POSConfigStore } from "./pos-config.store.js";
import POSModal from "./components/POSModal.jsx";

export default function POSConfig() {
  const navigate = useNavigate();
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
  * SELECTED POS OUTLET
  * =========================================================
  */
  const [selectedPosOutlet, setSelectedPosOutlet] = useState(null);

  /*
  * =========================================================
  * MODAL STATE
  * =========================================================
  */
  const [openModal, setOpenModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

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
  * POS Config Store
  * =========================================================
  */
  const fetchPosOutlet = POSConfigStore((state) => state.fetchPosOutlet); 
  const posOutlet = POSConfigStore((state) => state.posOutlet);

  /*
  * =========================================================
  * Data
  * =========================================================
  */
  const rowsOutlet = posOutlet?.data ?? [];

  /*
  * =========================================================
  * FETCH
  * =========================================================
  */
  useEffect(() => {        
      if (!businessId || !businessMemberId) {
          return;
      }

      const query = {
          businessId,
          businessMemberId,
          page,
          limit,
          isActive: true,
          sortBy,
          sortOrder,
      };
      
      fetchPosOutlet(query)
  }, [
      businessId,
      businessMemberId,
      page, 
      limit,
      sortBy,
      sortOrder,
      fetchPosOutlet
  ]);

  const handleSelectOutlet = (row) => {
    navigate(`/sl/pos/outlet/${row.id}`);
    // setEditingData(null);
    // setOriginalData(null);
    // setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingData(null);
    setOriginalData(null);
  };
  
  return (
    <>
        <div className="min-h-screen bg-slate-50 flex items-start justify-center px-6 pt-8">
            <div className="w-full max-w-3xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            POS Configuration
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white border rounded-xl shadow-sm p-5">

                    <div className="mb-5">
                        <div className="text-sm text-slate-500">
                            Available Outlet
                        </div>

                        <div className="text-xs text-slate-400">
                            Choose a outlet to continue
                        </div>
                    </div>

                    {rowsOutlet.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            No outlet found
                        </div>
                    ) : (
                        <div className="grid gap-3">
                            {rowsOutlet.map((row) => (
                                <button
                                    key={row.id}
                                    onClick={() => handleSelectOutlet(row)}
                                    className="border rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50/40 transition text-left"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <Store size={18} />
                                            </div>

                                            <div>
                                                <div className="font-medium">
                                                    {row.code}
                                                </div>

                                                <div className="text-m text-slate-500">
                                                    {row.name}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-auto flex items-center gap-4">
                                            <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600 inline-flex items-center">
                                                <StatusBadge
                                                    active={row.set}
                                                    activeText="Set"
                                                    inactiveText="Not Set"
                                                />
                                            </span>

                                            <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600 inline-flex items-center">
                                                <StatusBadge
                                                    active={row.isActive}
                                                />
                                            </span>
                                        </div>

                                        
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        <POSModal
            open={openModal}
            onClose={handleCloseModal}
            editingData={editingData}
            businessId={businessId}
            businessMemberId={businessMemberId}
        />
    </>
  );
}