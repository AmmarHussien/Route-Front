import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";
import AddIcon from "@mui/icons-material/Add";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-user-form">
          <Button
            $variant="contained"
            startIcon={<AddIcon />}
            sx={{
              height: 56,
              borderRadius: 5,
              color: "white",
              fontSize: 16,
              padding: 2,
              background: "#005379",
              boxShadow: "0 4px 60px 0 rgba(0, 56, 255, 0.15)", // Updated shadow property
            }}
          >
            Add User
          </Button>
        </Modal.Open>
        <Modal.Window name="add-user-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
