import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import AddIcon from "@mui/icons-material/Add";
import CreateDriverForm from "./CreateDriverForm";

function AddDriver() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              width: 139,
              height: 56,
              borderRadius: 5,
              fontSize: 16,
              background: "#005379",
              shadow: "0 4 60 0 #0038FF26",
            }}
          >
            Add New
          </Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddDriver;
