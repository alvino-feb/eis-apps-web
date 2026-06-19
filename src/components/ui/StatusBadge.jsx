
import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function StatusBadge({
  active,
}) {

  return active ? (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-50 text-green-700">
      <CheckCircle2 size={14} />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-50 text-red-700">
      <XCircle size={14} />
      Inactive
    </span>
  );

}