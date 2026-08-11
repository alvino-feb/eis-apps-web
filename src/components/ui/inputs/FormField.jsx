import React from "react";

export default function FormField({
    label,
    required = false,
    error,
    children,
}) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="text-sm font-medium">
                    {label}
                    {required && (
                        <span className="text-red-500 ml-1">
                            *
                        </span>
                    )}
                </label>
            )}

            {children}

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}