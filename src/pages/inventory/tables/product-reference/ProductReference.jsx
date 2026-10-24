import { useState } from "react";

import {
    PageHeader,
    Card,
} from "../../../../components/ui";

import { PRODUCT_REFERENCE_TABS } from "./product-reference.config";

import ProductCategoryTab from "./tabs/ProductCategoryTab";
import BrandTab from "./tabs/BrandTab";
import UnitOfMeasureTab from "./tabs/UnitTab";

export default function ProductReference() {

    const [
        activeTab,
        setActiveTab
    ] = useState("category");

    const [
        search,
        setSearch
    ] = useState("");

    // const [
    //     openModal,
    //     setOpenModal
    // ] = useState(false);

    const renderContent = () => {
        const props = {
            search,
            onSearchChange: setSearch,
            // onAdd: () =>
            //     setOpenModal(true),
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
            case "category":
                return (
                    <ProductCategoryTab
                        {...props}
                    />
                );

            case "brand":
                return (
                    <BrandTab
                        {...props}
                    />
                );

            case "unit":
                return (
                    <UnitOfMeasureTab
                        {...props}
                    />
                );

            case "type":
                return (
                    <ProductTypeTab
                        {...props}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-4 p-3">
            <PageHeader
                title="Product Reference"
                // description="Manage product reference data"
            />
            <Card>

                {/* ===================================
                    TABS
                =================================== */}

                <div className="border-b px-4">
                    <div className="flex gap-6 ">
                        {
                            PRODUCT_REFERENCE_TABS.map(
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