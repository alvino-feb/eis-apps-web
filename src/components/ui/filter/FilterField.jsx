import Select from "../form/Select";
import TextInput from "../form/TextInput";
import Checkbox from "../form/Checkbox";

export default function FilterField({
    field,
    value,
    onChange,
}) {
    switch (field.type) {

        case "text":
            return (
                <TextInput
                    placeholder={field.placeholder}
                    value={value ?? ""}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                />
            );

        case "select":
            return (
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                        {field.label}
                    </label>
                    <Select
                        options={field.options ?? []}
                        value={value}
                        placeholder={field.placeholder ?? field.label}

                        valueField={field.valueField}
                        labelField={field.labelField}
                        secondaryField={field.secondaryField}

                        onChange={onChange}
                    />
                </div>
            );

        case "checkbox":
            return (
                <Checkbox
                    label={field.label}
                    checked={!!value}
                    onChange={(e) =>
                        onChange(e.target.checked)
                    }
                />
            );

        default:
            return null;
    }
}