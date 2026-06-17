import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiFileText } from "react-icons/fi";

export default function SidebarItem({ item, collapsed }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isParent = item.children && item.children.length > 0;

  const handleClick = () => {
    if (isParent) {
      if (collapsed) return;
      setOpen(!open);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-200"
      >
        {isParent ? (
          <FiChevronRight
            size={16}
            className={`transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
          />
        ) : (
          <FiFileText size={14} className="text-gray-500" />
        )}

        {!collapsed && <span>{item.name}</span>}
      </div>

      {isParent && open && !collapsed && (
        <div className="ml-4 border-l">
          {item.children.map((child, idx) => (
            <SidebarItem
              key={`${child.name}-${idx}`}
              item={child}
              collapsed={collapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
}