export default function RoleTab() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Role
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left p-3">
              Code
            </th>

            <th className="text-left p-3">
              Name
            </th>

            <th className="text-left p-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-3">
              ADMIN
            </td>

            <td className="p-3">
              Administrator
            </td>

            <td className="p-3 flex gap-3">
              <button>Edit</button>
              <button>Permission</button>
              <button className="text-red-500">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}