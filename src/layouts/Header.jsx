import { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";

import { useAppStore } from "../store/appStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  const { toggleSidebar } =
    useAppStore();

  const logout =
    useAuthStore(
      (state) => state.logout
  );

  const username =
  useAuthStore(
    (state) => state.username
  );

  const memberName =
  useAuthStore(
    (state) => state.selectedBusinessMember?.name
  );
  
  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const handleLogout =
    async () => {

      await logout();

      navigate("/login");

    };

  return (
    <header
      className="
        h-12
        border-b
        bg-white
        flex
        items-center
        justify-between
        px-6
      "
    >
      {/* Left */}

      <button
        onClick={toggleSidebar}
        className="
          p-2
          rounded
          hover:bg-gray-100
        "
      >
        <FiMenu size={20} />
      </button>

      {/* Right */}

      <div
        ref={dropdownRef}
        className="relative"
      >
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded
            hover:bg-gray-100
          "
        >
          <FiUser />

          <span>
            <div className="text-right">
              <div className="text-sm font-medium">
                {username}
              </div>

              <div className="text-xs text-gray-500">
                {memberName}
              </div>
            </div>
          </span>

          <FiChevronDown />
        </button>

        {open && (
          <div
            className="
              absolute
              right-0
              top-full
              mt-2
              w-44
              bg-white
              border
              rounded-lg
              shadow-lg
              overflow-hidden
              z-50
            "
          >
            <button
              onClick={handleLogout}
              className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}