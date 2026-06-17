import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search..."
}) {
  return (
    <div className="relative">

      <Search
        size={16}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          h-9
          w-72
          pl-9
          pr-3
          border
          rounded-md
          text-sm
        "
      />

    </div>
  );
}