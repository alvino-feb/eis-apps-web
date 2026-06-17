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

    <div
      className="
        min-h-screen
        bg-gray-100
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-4xl
          bg-white
          rounded-2xl
          shadow-lg
          p-8
        "
      >

        <div className="mb-8">

          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >
            EIS
          </h1>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Pilih Unit Bisnis / Store
          </p>

        </div>
        
        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            border
            hover:bg-red-50
            hover:border-red-300
            hover:text-red-600
            transition
          "
        >

          <LogOut size={18} />

          Logout

        </button>

        {businessMembers.length === 0 && (

          <div
            className="
              text-center
              py-10
              text-gray-500
            "
          >
            Tidak ada member / store yang tersedia
          </div>

        )}

        <div
          className="
            grid
            md:grid-cols-2
            gap-4
          "
        >

          {businessMembers.map(
            (member) => (

              <button
                key={
                  member.businessMemberId
                }
                onClick={() =>
                  handleSelect(
                    member
                  )
                }
                className="
                  border
                  rounded-xl
                  p-5
                  hover:border-blue-500
                  hover:shadow-lg
                  transition-all
                  text-left
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      w-12
                      h-12
                      rounded-lg
                      bg-blue-100
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Store
                      size={22}
                    />

                  </div>

                  <div>

                    <div
                      className="
                        font-semibold
                        text-gray-800
                      "
                    >
                      {member.name}
                    </div>

                    <div
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      {member.roleName}
                    </div>

                  </div>

                </div>

              </button>

            )
          )}

        </div>

      </div>

    </div>

  );

}