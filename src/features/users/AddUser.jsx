import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";
import AddIcon from "@mui/icons-material/Add";

function AddUser() {
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
              boxShadow: "0 4px 60px 0 rgba(0, 56, 255, 0.15)", // Updated shadow property
            }}
          >
            Add New
          </Button>
        </Modal.Open>
        <Modal.Window name="user-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
