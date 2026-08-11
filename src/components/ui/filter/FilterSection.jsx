import FilterField from "./FilterField";

export default function FilterSection({
    filters,
    values,
    onChange,
}) {
    return (
        <div className="space-y-4">

            {filters.map((field) => (
                <FilterField
                    key={field.key}
                    field={field}
                    value={values[field.key]}
                    onChange={(value) =>
                        onChange(field.key, value)
                    }
                />
            ))}

        </div>
    );
}