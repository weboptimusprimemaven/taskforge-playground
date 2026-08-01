import "../../styles/components/dialog.css";
import { Button } from "./Button";

interface Props {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm(): void;
    onCancel(): void;
}

export function ConfirmDialog({
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}: Props) {
    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>{title}</h2>

                <p>{message}</p>

                <div className="dialog-actions">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        type="button"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}