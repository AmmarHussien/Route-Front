import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import AddIcon from "@mui/icons-material/Add";
import CreateNotificationForm from "./CreateNotificationForm";

function NewNotification() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-notification-form">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              height: 56,
              borderRadius: 5,
              fontSize: 16,
              background: "#005379",
              boxShadow: "0 4px 60px 0 rgba(0, 56, 255, 0.15)", // Updated shadow property
            }}
          >
            New Notification
          </Button>
        </Modal.Open>
        <Modal.Window name="add-notification-form" disableOutsideClick={true}>
          <CreateNotificationForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default NewNotification;
