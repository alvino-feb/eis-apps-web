import { useNavigate }
from "react-router-dom";

import {
  LogOut,
  Store
} from "lucide-react";

import {
  useAuthStore
} from "../../store/authStore";

export default function SelectMemberPage() {

  const navigate =
    useNavigate();

  const setBusinessMember =
    useAuthStore(
      (state) =>
        state.setBusinessMember
    );

  const businessMembers =
    useAuthStore(
      (state) =>
        state.businessMembers
    );
    
  const logout =
    useAuthStore(
      (state) => state.logout
  );

  const handleSelect =
    (member) => {

      setBusinessMember(
        member
      );

      navigate("/");

  };
  
  const handleLogout = () => {

    logout();

    navigate(
      "/login",
      { replace: true }
    );

  };

  return (

    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-2xl font-semibold">
              Enterprise Integrated System
            </h1>

            <p className="text-sm text-slate-500">
              Select Business Member
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-red-50 hover:text-red-600 transition "
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

        {/* Content */}
        <div className="bg-white border rounded-xl shadow-sm p-5">

          <div className="mb-5">
            <div className="text-sm text-slate-500">
              Available Business Members
            </div>

            <div className="text-xs text-slate-400">
              Choose a business unit to continue
            </div>
          </div>

          {businessMembers.length === 0 ? (

            <div className="text-center py-12 text-slate-500">
              No business member found
            </div>

          ) : (

            <div className="grid gap-3">

              {businessMembers.map((member) => (

                <button
                  key={member.businessMemberId}
                  onClick={() => handleSelect(member)}
                  className="
                    border
                    rounded-xl
                    p-4
                    hover:border-blue-500
                    hover:bg-blue-50/40
                    transition
                    text-left
                  "
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-lg
                          bg-blue-100
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Store size={18} />
                      </div>

                      <div>
                        <div className="font-medium">
                          {member.name}
                        </div>

                        <div className="text-xs text-slate-500">
                          {member.businessMemberId}
                        </div>
                      </div>

                    </div>

                    <span
                      className="
                        px-2
                        py-1
                        text-xs
                        rounded-full
                        bg-slate-100
                        text-slate-600
                      "
                    >
                      {member.roleName}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          )}

        </div>

      </div>
    </div>

  );

}