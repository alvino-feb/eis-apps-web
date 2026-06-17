import { X } from "lucide-react";

export default function Drawer({
  open,
  title,
  children,
  onClose,
  width = "w-[600px]",
}) {

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
      "
    >

      <div
        className={`
          absolute
          top-0
          right-0
          h-full
          bg-white
          shadow-xl
          ${width}
        `}
      >

        <div
          className="
            h-14
            border-b
            px-5
            flex
            items-center
            justify-between
          "
        >

          <div
            className="
              font-semibold
            "
          >
            {title}
          </div>

          <button
            onClick={onClose}
          >
            <X size={18} />
          </button>

        </div>

        <div
          className="
            p-5
            overflow-y-auto
            h-[calc(100%-56px)]
          "
        >
          {children}
        </div>

      </div>

    </div>
  );
}