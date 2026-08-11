import { useState } from "react";

export default function useTree(
    defaultExpandAll = false
) {

    const [expanded, setExpanded] = useState({});
    const toggle = (id) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const isExpanded = (id) => {
        if(defaultExpandAll)
            return true;
        return !!expanded[id];
    };

    return {
        expanded,
        toggle,
        isExpanded,
    };

}