import { Button } from "@mui/material";

import Modal from "../../../ui/Modal";
import EditDriverForm from "./EditDriverForm";
import { EditSharp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

function EditDriver() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  return (
    <div>
      <Modal>
        <Modal.Open opens="edit-driver-form">
          <Button
            variant="contained"
            endIcon={isRTL ? <EditSharp sx={{ marginRight: 4 }} /> : null}
            startIcon={isRTL ? null : <EditSharp />}
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
            {t("EditDriver")}
          </Button>
        </Modal.Open>
        <Modal.Window name="edit-driver-form">
          <EditDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditDriver;
