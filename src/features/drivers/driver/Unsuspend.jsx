import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateStatus from "./useUpdateStatus";

function UnSuspended() {
  const navigate = useNavigate();

  const { editStatus } = useUpdateStatus();

  function handleClick() {
    // Pass the required parameters to editStatus
    editStatus({ status: "Approved" }); // Adjust reason and status as needed

    navigate(`/adminPanel/drivers?status=Approved`, {
      replace: true,
    });
  }

  return (
    <div>
      <Button
        $variant="contained"
        sx={{
          width: 159,
          height: 56,
          borderRadius: 5,
          fontSize: 16,
          background: "#f8eadc",
          color: "#fe9e46",
          shadow: "0 4 60 0 #0038FF26",
          "&:hover": {
            background: "#EFF6FF",
            boxShadow: "0 4px 60px 0 #0038FF26",
          },
        }}
        onClick={handleClick}
      >
        UnSuspended
      </Button>
    </div>
  );
}

export default UnSuspended;
