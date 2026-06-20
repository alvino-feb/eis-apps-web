import { useState, useRef, useEffect } from "react";
import {
  FiUser,
  FiChevronDown,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";

import {
  ArrowLeftRight
} from "lucide-react";

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
    <header className="h-12 border-b bg-white flex items-center justify-between px-6">
      {/* Left */}

      <button
        onClick={toggleSidebar}
        className="p-2 rounded hover:bg-gray-100"
      >
        <FiMenu size={20} />
      </button>

      {/* Right */}

      <div
        ref={dropdownRef}
        className="relative"
      >
        <button
          onClick={() => setOpen(!open)}
          className="
            flex
            items-center
            gap-3
            px-2
            py-1.5
            rounded-lg
            hover:bg-slate-100
            transition
          "
        >

          <div
            className="
              w-8
              h-8
              rounded-full
              bg-slate-200
              flex
              items-center
              justify-center
            "
          >
            <FiUser size={14} />
          </div>

          <div className="text-left">

            <div
              className="
                text-sm
                font-medium
                leading-none
              "
            >
              {username}
            </div>

            {/* <div
              className="
                text-xs
                text-slate-500
                mt-0.5
              "
            >
              {memberName}
            </div> */}

          </div>

          <FiChevronDown
            size={14}
            className="
              text-slate-400
            "
          />

        </button>
        
        {open && (
          <div
            className="
              absolute
              right-0
              top-full
              mt-2
              w-56
              bg-white
              border
              rounded-xl
              shadow-lg
              overflow-hidden
              z-50
            "
          >

            <div
              className="
                px-4
                py-3
                border-b
              "
            >
              <div className="font-medium">
                {username}
              </div>

              <div
                className="
                  text-xs
                  text-slate-500
                "
              >
                {memberName}
              </div>
            </div>

            <button
              onClick={() =>
                navigate("/select-store")
              }
              className="
                w-full
                flex
                items-center
                gap-2
                px-4
                py-3
                text-sm
                hover:bg-slate-50
              "
            >
              <ArrowLeftRight size={15} />
              Change Store
            </button>

            <div className="border-t" />

            <button
              onClick={handleLogout}
              className="
                w-full
                flex
                items-center
                gap-2
                px-4
                py-3
                text-sm
                text-red-600
                hover:bg-red-50
              "
            >
              <FiLogOut size={15} />
              Logout
            </button>

          </div>
        )}
      </div>
    </header>
  );
}