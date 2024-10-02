import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import AddIcon from "@mui/icons-material/Add";
import CreateDriverForm from "./CreateDriverForm";

function AddDriver() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-driver-form">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              height: 56,
              borderRadius: 5,
              fontSize: 16,
              color: "white",
              background: "#005379",
              shadow: "0 4 60 0 #0038FF26",
            }}
          >
            Add Driver
          </Button>
        </Modal.Open>
        <Modal.Window name="add-driver-form">
          <CreateDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddDriver;
