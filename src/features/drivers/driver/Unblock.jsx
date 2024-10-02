import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateStatus from "./useUpdateStatus";

function Unblock() {
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
        onClick={handleClick}
        variant="contained"
        sx={{
          width: 139,
          height: 56,
          borderRadius: 5,
          fontSize: 16,
          background: "#FEE2E2",
          color: "#FC5555",
          shadow: "0 4 60 0 #0038FF26",
          "&:hover": {
            background: "#EFF6FF",
            boxShadow: "0 4px 60px 0 #0038FF26",
          },
        }}
      >
        Unblock
      </Button>
    </div>
  );
}

export default Unblock;
