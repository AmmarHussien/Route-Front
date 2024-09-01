import { Button } from "@mui/material";
import { EditSharp } from "@mui/icons-material";
import Modal from "../../../ui/Modal";
import EditUserForm from "./EditUserForm";

function EditUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="edit-user-form">
          <Button
            variant="contained"
            startIcon={<EditSharp />}
            sx={{
              width: 139,
              height: 56,
              borderRadius: 5,
              fontSize: 16,
              background: "#005379",
              shadow: "0 4 60 0 #0038FF26",
            }}
          >
            Edit
          </Button>
        </Modal.Open>
        <Modal.Window name="edit-user-form">
          <EditUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditUser;
