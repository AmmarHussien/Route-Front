import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function AddRole() {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/setting/role/add-role`);
  }

  return (
    <>
      <Button
        variant="contained"
        endIcon={isRTL ? <AddIcon sx={{ marginRight: 1 }} /> : null}
        startIcon={isRTL ? null : <AddIcon />}
        onClick={handleClick}
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
        {t("AddRole")}
      </Button>
    </>
  );
}

export default AddRole;
