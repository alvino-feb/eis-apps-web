// src/components/Tabs.jsx
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

export default function Tabs() {
  const { tabs, removeTab } = useStore();
  const navigate = useNavigate();

  return (
    <div className="flex bg-gray-200">
      {tabs.map((t) => (
        <div key={t.path} className="px-3 flex gap-2">
          <span onClick={() => navigate(t.path)}>{t.name}</span>
          <button onClick={() => removeTab(t.path)}>x</button>
        </div>
      ))}
    </div>
  );
}