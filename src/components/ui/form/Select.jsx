import { ChevronDown } from "lucide-react";

export default function Select({
    options = [],
    value = "",
    onChange,

    valueField = "value",
    labelField = "label",
    secondaryField = "",

    placeholder = "Select...",
    disabled = false,
    error = false,
    className = "",
}) {
    return (
        <div className="relative">

            <select
                value={value ?? ""}
                disabled={disabled}
                onChange={(e) =>
                    onChange?.(e.target.value)
                }
                className={`w-full appearance-none rounded-md border bg-white px-3 py-2 pr-10 text-sm outline-none
                    ${
                        error
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                    }
                    ${
                        disabled
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                    }
                    ${className}
                `}
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map((item) => {

                    const optionValue =
                        item[valueField] ??
                        item.value ??
                        item.id;

                    const label =
                        item[labelField] ??
                        item.label ??
                        item.name;

                    const secondary =
                        secondaryField
                            ? item[secondaryField]
                            : null;

                    return (
                        <option
                            key={optionValue}
                            value={optionValue}
                        >
                            {
                                secondary
                                    ? `${secondary} - ${label}`
                                    : label
                            }
                        </option>
                    );

                })}

            </select>

            {/* <ChevronDown
                size={16}
                className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                "
            /> */}

        </div>
    );
}