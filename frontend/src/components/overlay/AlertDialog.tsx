import Dialog from "@mui/material/Dialog";
import { Overlay } from "@/types/interfaces/overlay";
import Button from "components/elements/Button";

interface AlertDialogProps {
  /**
   * Is the overlay informations displayed in the dialog
   * @type {Overlay}
   */
  overlayInfo: Overlay;

  /**
   * Is the overlay open
   * @type {boolean}
   */
  onOpen: boolean;

  /**
   * Is the function to close the overlay
   * @type {void}
   */
  onClose: () => void;

  /**
   * Is the function associated to the button pressed
   * @type {void}
   */
  onAction: () => void;
}

function AlertDialog({
  overlayInfo,
  onOpen,
  onClose,
  onAction,
}: AlertDialogProps) {
  // const [open, setOpen] = React.useState(onOpen);

  const handleClose = () => {
    onClose();
  };

  const handleAction = () => {
    onAction(); // Call the specific action callback
    handleClose();
  };

  return (
    <Dialog
      open={onOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="grid grid-cols-1 gap-y-4 justify-items-center p-6">
        <p id="alert-dialog-title" className="text-2xl font-semibold">
          {overlayInfo.title}
        </p>
        <div className="mb-4">
          <p id="alert-dialog-description">{overlayInfo.message}</p>
        </div>
        <Button
          name={overlayInfo.buttonName}
          type={overlayInfo.buttonType}
          color={overlayInfo.buttonColor}
          onClick={handleAction}
          className="mobile:w-full w-3/4"
        />
      </div>
    </Dialog>
  );
}

export default AlertDialog;
