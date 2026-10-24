import { useState } from "react";

import {
    PageHeader,
    Card,
} from "../../../../components/ui";

import { SALES_REFERENCE_TABS } from "./sales-reference.config";

import OutletTab from "./tabs/OutletTab";

export default function WarehouseReference() {

    const [ activeTab, setActiveTab ] = useState("outlet");

    const [ search, setSearch ] = useState("");

    // const [ openModal, setOpenModal ] = useState(false);

    const renderContent = () => {
        const props = {
            search,
            onSearchChange: setSearch,
            // onAdd: () => setOpenModal(true),
            // onEdit: (row) => {
            //     console.log(
            //         "EDIT",
            //         row
            //     );
            //     setOpenModal(true);
            // },

            // onDelete: (row) => {
            //     console.log(
            //         "DELETE",
            //         row
            //     );
            // },

        };

        switch (activeTab) {
            case "outlet":
                return (
                    <OutletTab
                        {...props}
                    />
                );

            // case "transaction_type":
            //     return (
            //         <OutletTab
            //             {...props}
            //         />
            //     );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-4 p-3">
            <PageHeader
                title="Sales Reference"
                // description="Manage product reference data"
            />
            <Card>

                {/* ===================================
                    TABS
                =================================== */}
                <div className="border-b px-4">
                    <div className="flex gap-6 ">
                        {
                            SALES_REFERENCE_TABS.map(
                                (tab) => {
                                    const active =
                                        activeTab ===
                                        tab.key;
                                    return (
                                        <button
                                            key={
                                                tab.key
                                            }
                                            type="button"
                                            onClick={() => {
                                                setActiveTab(
                                                    tab.key
                                                );
                                                setSearch(
                                                    ""
                                                );
                                            }}

                                            className={`relative px-1 py-3 text-sm font-medium
                                                ${
                                                    active
                                                        ? "text-blue-600"
                                                        : "text-gray-500 hover:text-gray-700"
                                                }
                                            `}
                                        >

                                            {
                                                tab.label
                                            }

                                            {
                                                active && (
                                                    <span
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                                                    />
                                                )
                                            }

                                        </button>

                                    );
                                }
                            )
                        }

                    </div>

                </div>


                {/* ===================================
                    CONTENT
                =================================== */}

                {
                    renderContent()
                }

            </Card>

        </div>
    );
}