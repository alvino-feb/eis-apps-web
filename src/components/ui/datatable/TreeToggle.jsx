import {
    ChevronRight,
    ChevronDown,
} from "lucide-react";

export default function TreeToggle({
    expanded,
    hasChildren,
    onToggle,
}){

    if(!hasChildren){
        return (
            <span
                className="w-5"
            />
        );
    }

    return(
        <button
            type="button"
            onClick={onToggle}
            className="w-5"
        >
            {
                expanded
                ?
                <ChevronDown size={16}/>
                :
                <ChevronRight size={16}/>
            }
        </button>
    );
}