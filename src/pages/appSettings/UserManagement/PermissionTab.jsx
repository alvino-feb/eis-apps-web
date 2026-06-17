export default function PermissionTab() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">
          Roles
        </h3>

        <div className="space-y-2">
          <button className="block w-full text-left px-3 py-2 bg-blue-50 rounded">
            ADMIN
          </button>

          <button className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded">
            CASHIER
          </button>
        </div>
      </div>

      <div className="col-span-2 border rounded-lg p-4">
        <h3 className="font-semibold mb-4">
          Permissions
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            User Management
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Role Management
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Product
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Sales
          </label>
        </div>
      </div>
    </div>
  );
}