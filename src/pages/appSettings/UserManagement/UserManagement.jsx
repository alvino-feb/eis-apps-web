import { useState } from "react";
import UserTab from "./UserTab";
import RoleTab from "./RoleTab";
import AssignmentTab from "./AssignmentTab";
import PermissionTab from "./PermissionTab";

export default function UserManagement() {
  const [tab, setTab] = useState("users");

  const tabs = [
    { key: "users", label: "Users" },
    { key: "roles", label: "Roles" },
    { key: "assignments", label: "Assignments" },
    { key: "permissions", label: "Permissions" },
  ];

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">
          User Management
        </h1>

        <p className="text-sm text-gray-500">
          Manage users, roles and permissions
        </p>
      </div>

      <div className="bg-white rounded-lg shadow border">
        <div className="border-b px-4">
          <div className="flex gap-6">
            {tabs.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`py-3 text-sm border-b-2 transition ${
                  tab === item.key
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-gray-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {tab === "users" && <UserTab />}
          {tab === "roles" && <RoleTab />}
          {tab === "assignments" && <AssignmentTab />}
          {tab === "permissions" && <PermissionTab />}
        </div>
      </div>
    </div>
  );
}