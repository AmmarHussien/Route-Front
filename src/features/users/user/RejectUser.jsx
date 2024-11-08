import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

function RejectUser() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/users?status=Pending`, {
      replace: true,
    });
    // Add your click handling logic here
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
        Reject
      </Button>
    </div>
  );
}

export default RejectUser;
