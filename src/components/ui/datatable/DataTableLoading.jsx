export default function DataTableLoading({
    columns,
    rows = 8,
}) {

    return(
        <tbody>
            {
                [...Array(rows)].map((_,i)=>(
                    <tr key={i}>
                        {
                            [...Array(columns)].map((_,j)=>(
                                <td
                                    key={j}
                                    className="px-4 py-3"
                                >
                                    <div className="h-4 rounded bg-gray-200 animate-pulse"/>
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
        </tbody>
    );
}