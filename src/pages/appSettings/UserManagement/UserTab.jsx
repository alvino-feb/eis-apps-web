export default function UserTab() {
  return (
    <>
      <div className="flex justify-between mb-4">
        <input
          placeholder="Search user..."
          className="border rounded-lg px-3 py-2 w-64"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add User
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3">
                Username
              </th>

              <th className="text-left p-3">
                Full Name
              </th>

              <th className="text-left p-3">
                Phone
              </th>

              <th className="text-left p-3">
                Status
              </th>

              <th className="text-left p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">
                admin
              </td>

              <td className="p-3">
                Administrator
              </td>

              <td className="p-3">
                08123456789
              </td>

              <td className="p-3">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  Active
                </span>
              </td>

              <td className="p-3 flex gap-2">
                <button className="text-blue-600">
                  Edit
                </button>

                <button className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}