export default function RoleBadge({
  role,
}) {

  const styles = {

    Creator:
      "bg-purple-100 text-purple-700",

    Administrator:
      "bg-blue-100 text-blue-700",

    Staff:
      "bg-gray-100 text-gray-700",

  };

  return (

    <span
      className={`
        px-2
        py-1
        rounded-md
        text-xs
        font-medium
        ${styles[role]}
      `}
    >
      {role}
    </span>

  );

}