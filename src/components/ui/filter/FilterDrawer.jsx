import Modal from "../Modal";
import FilterSection from "./FilterSection";
import FilterFooter from "./FilterFooter";

export default function FilterDrawer({
    open,
    title = "Filters",
    filters = [],
    values = {},
    onChange,
    onApply,
    onReset,
    onClose,
}) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={title}
            size="sm"
        >
            <div className="flex flex-col h-full">

                <div className="flex-1 overflow-y-auto space-y-4">

                    <FilterSection
                        filters={filters}
                        values={values}
                        onChange={onChange}
                    />

                </div>

                <FilterFooter
                    onApply={onApply}
                    onReset={onReset}
                />

            </div>
        </Modal>
    );
}