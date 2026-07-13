import useToastStore from "../store/toastStore";

export default function Toast() {
  const {
    open,
    message,
    type,
    duration
  } = useToastStore();

  if (!open)
    return null;

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600",
  };

  const icons = {
    success: "✔",
    error: "✖",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className="fixed bottom-5 left-5 z-[9999] animate-fade-in">
      <div className={`min-w-80 rounded-lg shadow-lg px-5 py-4 text-white flex items-center gap-3 ${colors[type]}`}>
        <span className="text-xl">{icons[type]}</span>
        <span>{message}</span>
        <div className="absolute bottom-0 left-0 h-1 bg-white/40 rounded-b-lg animate-toast-progress"
            style={{
                animationDuration: `${duration}ms`,
            }}
        />
      </div>
    </div>
  );

}