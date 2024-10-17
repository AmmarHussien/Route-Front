import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateStatus from "./useUpdateStatus";
// import { FaUserClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function SuspendedDriver() {
  const { t } = useTranslation();
  //const { i18n } = useTranslation();
  // const isRTL = i18n.language === "ar-EG";
  const navigate = useNavigate();

  const { editStatus } = useUpdateStatus();

  function handleClick() {
    // Pass the required parameters to editStatus
    editStatus({ status: "Suspended" }); // Adjust reason and status as needed

    navigate(`/adminPanel/drivers?status=Suspended`, {
      replace: true,
    });
  }
  return (
    <div>
      <Button
        variant="contained"
        // endIcon={isRTL ? <FaUserClock sx={{ marginRight: 10 }} /> : null}
        // startIcon={isRTL ? null : <FaUserClock />}
        sx={{
          width: 149,
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
        {t("Suspended")}
      </Button>
    </div>
  );
}

export default SuspendedDriver;
