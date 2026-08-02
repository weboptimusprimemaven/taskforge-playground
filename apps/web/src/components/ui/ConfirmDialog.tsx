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
            <div
                className="dialog"
                data-testid="confirm-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
            >
                <h2 id="confirm-dialog-title">{title}</h2>

                <p>{message}</p>

                <div className="dialog-actions">
                    <Button
                        data-testid="cancel-button"
                        variant="secondary"
                        type="button"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>

                    <Button

                        data-testid="confirm-button"
                        variant="danger"
                        type="button"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
