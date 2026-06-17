export default function AssignmentTab() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Assign User
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-3 text-left">
              User
            </th>

            <th className="p-3 text-left">
              Business Member
            </th>

            <th className="p-3 text-left">
              Role
            </th>

            <th className="p-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-3">
              Vino
            </td>

            <td className="p-3">
              Store Jakarta
            </td>

            <td className="p-3">
              Admin
            </td>

            <td className="p-3">
              Edit
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}