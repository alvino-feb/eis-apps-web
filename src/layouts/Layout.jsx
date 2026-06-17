import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-3 overflow-auto">
          <Outlet />   {/* 🔥 ini tempat render halaman */}
        </div>
      </div>
    </div>
  );
}