export default function MenuSkeleton({
  collapsed = false,
  rows = 8,
}) {

  return (
    <div className="px-2 py-3 space-y-2">

      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="
            flex
            items-center
            gap-3
            px-3
            py-2
            animate-pulse
          "
        >
          <div className="w-5 h-5 bg-gray-300 rounded" />

          {!collapsed && (
            <div className="h-4 flex-1 bg-gray-300 rounded" />
          )}
        </div>
      ))}

    </div>
  );

}