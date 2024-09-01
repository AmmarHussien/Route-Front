import { Button } from "@mui/material";

import Modal from "../../../ui/Modal";
import EditDriverForm from "./EditDriverForm";
import { EditSharp } from "@mui/icons-material";

function EditDriver() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
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
        <Modal.Window name="user-form">
          <EditDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditDriver;
