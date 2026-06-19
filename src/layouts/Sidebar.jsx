import { useEffect } from "react";

import SidebarItem from "./SidebarItem";

import MenuSkeleton from "../components/skeletons/MenuSkeleton";

import { useAuthStore }
from "../store/authStore";

import { useAppSettingStore }
from "../store/appSettingStore";

export default function Sidebar() {

  const userId =
  useAuthStore(
    (state) => state.userId
  );

  const businessId =
  useAuthStore(
    (state) => state.businessId
  );

  const businessMemberId =
  useAuthStore(
    (state) =>
      state
        .selectedBusinessMember
        ?.businessMemberId
  );  

  const {
    menu,
    fetchMenu,
    collapsed,
    loading,
    error,
  } = useAppSettingStore();

  useEffect(() => {
    
    if (!userId) return;

    fetchMenu(userId,businessId,businessMemberId);
      }, 
    [
      userId,
      businessId,
      businessMemberId,
      fetchMenu,
    ]);

    return (
    <aside
      className={`
        ${
          collapsed
            ? "w-16"
            : "w-64"
        }
        bg-gray-100
        border-r
        h-screen
        overflow-y-auto
        transition-all
        duration-300
      `}
    >

      {/* Header */}

      <div className="h-14 flex items-center px-4 border-b">

        {!collapsed ? (

          <div>

            <div className="font-bold text-lg">
              EIS
            </div>

            <div className="text-xs text-gray-500">
              Enterprise Integrated System
            </div>

          </div>

        ) : (

          <div className="font-bold">
            E
          </div>

        )}

      </div>

      <div className="py-3">

        {/* Loading */}

        {loading && (
          <MenuSkeleton
            collapsed={collapsed}
          />
        )}

        {/* Error */}

        {!loading &&
          error && (

          <div className="px-4 py-2 text-sm text-red-500">

            {error}

          </div>

        )}

        {/* Menu */}

        {!loading &&
          !error &&
          Array.isArray(menu) &&
          menu.length > 0 &&

          menu.map(
            (item, idx) => (

              <SidebarItem
                key={`${item.name}-${idx}`}
                item={item}
                collapsed={collapsed}
              />

            )
          )}

        {/* Empty */}

        {!loading &&
          !error &&
          menu?.length === 0 && (

          <div className="px-4 py-2 text-sm text-gray-500">

            No menu available

          </div>

        )}

      </div>

    </aside>

  );

}