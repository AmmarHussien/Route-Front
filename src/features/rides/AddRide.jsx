import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import AddIcon from "@mui/icons-material/Add";

function AddRide() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="user-form">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              height: 56,
              borderRadius: 5,
              fontSize: 16,
              background: "#005379",
              shadow: "0 4 60 0 #0038FF26",
            }}
          >
            Schedule New Ride
          </Button>
        </Modal.Open>
        <Modal.Window name="user-form">{/* <CreateRideForm /> */}</Modal.Window>
      </Modal>
    </div>
  );
}

export default AddRide;
