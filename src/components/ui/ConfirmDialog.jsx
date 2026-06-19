import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({

  open,

  title,

  description,

  onConfirm,

  onCancel,

}) {

  return (

    <Modal
      open={open}
      onClose={onCancel}
      title={title}
    >

      <div className="space-y-4">

        <p
          className="
            text-sm
            text-gray-600
          "
        >
          {description}
        </p>

        <div
          className="
            flex
            justify-end
            gap-2
          "
        >

          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete
          </Button>

        </div>

      </div>

    </Modal>

  );

}