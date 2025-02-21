import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../ui/Modal";
import CreateAdminForm from "./CreateAdminForm";

function AddAdmin() {
  const [setOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const handleOpen = () => setOpen(true);
  return (
    <>
      <div>
        <Modal>
          <Modal.Open opens="add-Admin">
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
              {t("AddAdmin")}
            </Button>
          </Modal.Open>
          <Modal.Window name="add-Admin">
            <CreateAdminForm />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default AddAdmin;
