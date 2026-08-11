import { useState } from "react";
import Button from "../Button";
import { Filter } from "lucide-react";
import FilterDrawer from "./FilterDrawer";

export default function FilterPanel({
    title = "Filters",
    filters = [],
    values = {},
    onChange,
    onApply,
    onReset,
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                <Filter size={16} />
                {/* <span className="ml-2">
                    Filter
                </span> */}
            </Button>

            <FilterDrawer
                open={open}
                title={title}
                filters={filters}
                values={values}
                onChange={onChange}
                onApply={() => {
                    onApply?.();
                    setOpen(false);
                }}
                // onReset={onReset}
                onReset={() => {
                    onReset?.();
                    setOpen(false);
                }}
                onClose={() => setOpen(false)}
            />
        </>
    );
}