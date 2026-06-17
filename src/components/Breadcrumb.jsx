// src/components/Breadcrumb.jsx
import { useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const loc = useLocation();
  const paths = loc.pathname.split("/").filter(Boolean);

  return (
    <div className="p-2 text-sm bg-gray-100">
      {paths.join(" > ")}
    </div>
  );
}