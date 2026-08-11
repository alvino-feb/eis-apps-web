import DataTableLoading from "./DataTableLoading";
import DataTableEmpty from "./DataTableEmpty";
import DataTableRow from "./DataTableRow";
import useTree from "./hooks/useTree";

export default function DataTableBody({
    columns,
    data,
    loading,
    tree,
    rowKey,
    childrenKey,
    defaultExpandAll,
    emptyMessage,
    onRowClick,
}) {
    const {
        toggle,
        isExpanded,
    } = useTree(defaultExpandAll);
    if(loading){
        return(
            <DataTableLoading
                columns={columns.length}
            />
        );
    }

    if(data.length===0){
        return(
            <DataTableEmpty
                columns={columns.length}
                message={emptyMessage}
            />
        );
    }
    if(!tree){
        return(
            <tbody>
                {
                    data.map(row=>(
                        <DataTableRow
                            key={row[rowKey]}
                            row={row}
                            level={0}
                            columns={columns}
                            tree={false}
                            onRowClick={onRowClick}
                        />
                    ))
                }
            </tbody>
        );
    }

    const renderRows=(rows,level=0)=>{
        return rows.flatMap(row=>{
            const children=row[childrenKey]||[];
            const expanded=isExpanded(row[rowKey]);
            const hasChildren=children.length>0;
            const result=[
                <DataTableRow
                    key={row[rowKey]}
                    row={row}
                    columns={columns}
                    tree
                    level={level}
                    expanded={expanded}
                    hasChildren={hasChildren}
                    onToggle={()=>toggle(row[rowKey])}
                    onRowClick={onRowClick}
                />
            ];
            if(
                hasChildren &&
                expanded
            ){
                result.push(
                    ...renderRows(
                        children,
                        level+1
                    )
                );
            }
            return result;
        });
    };
    return(
        <tbody>
            {
                renderRows(data)
            }
        </tbody>
    );
}