export default function DataTable({
  columns,
  data,
}) {

  return (
    <table
      className="
        w-full
      "
    >

      <thead>

        <tr>

          {columns.map(
            (column) => (

              <th
                key={column.key}
                className="
                  px-4
                  py-3
                  text-left
                  bg-gray-50
                  border-b
                "
              >
                {column.title}
              </th>

            )
          )}

        </tr>

      </thead>

      <tbody>

        {data.map(
          (row, index) => (

            <tr
              key={index}
              className="
                hover:bg-gray-50
              "
            >

              {columns.map(
                (column) => (

                  <td
                    key={column.key}
                    className="
                      px-4
                      py-3
                      border-b
                    "
                  >

                    {column.render
                      ? column.render(row)
                      : row[column.key]}

                  </td>

                )
              )}

            </tr>

          )
        )}

      </tbody>

    </table>
  );
}