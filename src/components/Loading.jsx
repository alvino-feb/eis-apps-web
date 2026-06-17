import { useAppStore } from "../store/appStore";

export default function Loading() {
  const {loading } = useAppStore();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="bg-white px-6 py-4 rounded-lg shadow flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    </div>
  );
}