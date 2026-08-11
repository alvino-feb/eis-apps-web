import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

export default function ActionMenu({
    items = [],
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                ref.current &&
                !ref.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener(
            "mousedown",
            handleClickOutside
        );
        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    return (

        <div
            ref={ref}
            className="relative inline-block"
        >
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="rounded p-1 hover:bg-gray-100"
            >
                <MoreVertical size={18} />
            </button>

            {
                open && (
                    <div
                        className="
                            absolute
                            right-0
                            top-full
                            mt-1
                            w-44
                            rounded-md
                            border
                            bg-white
                            shadow-xl
                            z-[9999]
                        "
                    >
                        {
                            items.map((item, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        setOpen(false);
                                        item.onClick?.();
                                    }}
                                    className={`
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2
                                        text-sm
                                        hover:bg-gray-50
                                        ${
                                            item.danger
                                                ? "text-red-600"
                                                : "text-gray-700"
                                        }
                                    `}
                                >
                                    {item.icon}
                                    <span>
                                        {item.label}
                                    </span>
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}