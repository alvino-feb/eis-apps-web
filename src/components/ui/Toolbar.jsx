export default function Toolbar({
  left,
  right,
}) {
  return (
    <div
      className="
        p-4
        border-b
        flex
        items-center
        justify-between
        gap-3
      "
    >
      <div>
        {left}
      </div>

      <div
        className="
          flex
          gap-2
        "
      >
        {right}
      </div>
    </div>
  );
}