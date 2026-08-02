import "../../styles/components/toast.css";

interface Props {
    message: string;
}


export function Toast({ message }: Props) {
    return (
        <div className="toast" data-testid="toast">
            {message}
        </div>
    );
}
