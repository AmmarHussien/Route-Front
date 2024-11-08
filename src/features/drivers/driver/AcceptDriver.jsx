import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateStatus from "./useUpdateStatus";
import { useTranslation } from "react-i18next";

function AcceptDriver() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { editStatus } = useUpdateStatus();

  function handleClick() {
    // Pass the required parameters to editStatus
    editStatus({ status: "Approved" }); // Adjust reason and status as needed

    navigate(`/drivers?status=Approved`, {
      replace: true,
    });
  }
  return (
    <div>
      <Button
        onClick={handleClick}
        $variant="contained"
        sx={{
          width: 139,
          height: 56,
          borderRadius: 5,
          fontSize: 16,
          color: "white",
          background: "#005379",
          shadow: "0 4 60 0 #0038FF26",
        }}
      >
        {t("Accept")}
      </Button>
    </div>
  );
}

export default AcceptDriver;
