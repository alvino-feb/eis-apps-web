export const hasChanges = (
    original,
    current,
    fields
) => {
    return fields.some(
        field => original[field] !== current[field]
    );
};

export const pick = (
    obj,
    fields
) => {
    return fields.reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;

    }, {});
};

export const isEqual = (
    obj1,
    obj2,
    fields
) => {
    return !hasChanges(
        obj1,
        obj2,
        fields
    );
};