import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateStatus from "./useUpdateStatus";

function AcceptUser() {
  const navigate = useNavigate();

  const { editStatus } = useUpdateStatus();

  function handleClick() {
    // Pass the required parameters to editStatus
    editStatus({ status: "Approved" }); // Adjust reason and status as needed

    navigate(`/users?status=Approved`, {
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
          background: "#005379",
          shadow: "0 4 60 0 #0038FF26",
        }}
      >
        Accept
      </Button>
    </div>
  );
}

export default AcceptUser;
