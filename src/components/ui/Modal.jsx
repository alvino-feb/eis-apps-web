import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  width = "max-w-2xl",
  loading = false
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  p-4 bg-black/40">
      <div className={`bg-white rounded-lg shadow-xl w-full ${width} max-h-[85vh] flex flex-col`}>
        <div className="flex justify-between items-center px-5 py-4 border-b shrink-0">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>

        <div className="p-5 overflow-y-auto flex-1">
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
              <div className="bg-white px-6 py-4 rounded-lg shadow flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Loading...</span>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}