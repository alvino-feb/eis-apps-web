export default function DataTable({
  columns = [],
  data = [],
}) {

  const hasData =
    Array.isArray(data) &&
    data.length > 0;

  return (

    <table className="w-full">

      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>

        {!hasData && (

          <tr>

            <td
              colSpan={columns.length}
              className="
                py-10
                text-center
                text-gray-500
              "
            >

              Tidak ada data

            </td>

          </tr>

        )}

        {hasData &&
          data.map((row, index) => (

            <tr key={index}>

              {columns.map((col) => (

                <td key={col.key}>

                  {col.render
                    ? col.render(row)
                    : row[col.key]}

                </td>

              ))}

            </tr>

          ))}

      </tbody>

    </table>

  );
}