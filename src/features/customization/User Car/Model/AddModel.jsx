import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddCarModel from "./AddCarModel";

function AddModel() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
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
          Add Brand
        </Button>
        <AddCarModel open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default AddModel;
