import "../../styles/components/toast.css";
import { useEffect } from "react";

interface Props {
    message: string;
}


export function Toast({ message }: Props) {
    return (
        <div className="toast">
            {message}
        </div>
    );
}

