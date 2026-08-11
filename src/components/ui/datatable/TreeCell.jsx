import TreeToggle from "./TreeToggle";

export default function TreeCell({
    row,
    level,
    expanded,
    hasChildren,
    onToggle,
    children,
}){
    return(
        <div
            className="flex items-center"
            style={{
                paddingLeft:
                    level*20,
            }}
        >
            <TreeToggle
                expanded={expanded}
                hasChildren={hasChildren}
                onToggle={onToggle}
            />
            <span>
                {children}
            </span>
        </div>
    );
}