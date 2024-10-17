import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddCarServiceModal from "./AddCarServiceModal";
import { useTranslation } from "react-i18next";

function AddCarService() {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <>
      <div>
        <Button
          variant="contained"
          endIcon={isRTL ? <AddIcon sx={{ marginRight: 1 }} /> : null}
          startIcon={isRTL ? null : <AddIcon />}
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
          {t("AddCarService")}
        </Button>
        <AddCarServiceModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default AddCarService;
