import { colors } from "../../theme/colors";

export default function Button({
  children,
  variant = "primary",
  loading,
  ...props
}) {
  const styleMap = {
    primary: `${colors.primary} ${colors.primaryHover}`,
    secondary: colors.secondary,
    danger: colors.danger,
  };

  return (
    <button
      {...props}
      disabled={loading}
      className={`px-4 py-2 rounded transition ${styleMap[variant]} ${
        loading && "opacity-50"
      }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}