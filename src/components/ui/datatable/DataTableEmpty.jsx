import { Inbox } from "lucide-react";

export default function DataTableEmpty({
    columns,
    message,
}){

    return(
        <tbody>
            <tr>
                <td
                    colSpan={columns}
                    className="py-16"
                >
                    <div className="flex flex-col items-center gap-3 text-gray-500">
                        <Inbox
                            size={42}
                        />
                        <p>
                            {message}
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    );
}