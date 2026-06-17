import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  width = "max-w-2xl",
}) {

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className={`
          bg-white
          rounded-lg
          shadow-xl
          w-full
          ${width}
        `}
      >

        <div
          className="
            flex
            justify-between
            items-center
            px-5
            py-4
            border-b
          "
        >

          <h3
            className="
              font-semibold
            "
          >
            {title}
          </h3>

          <button
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>

        <div className="p-5">
          {children}
        </div>

      </div>

    </div>
  );
}