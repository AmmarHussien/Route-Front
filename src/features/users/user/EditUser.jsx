import { Button } from "@mui/material";
import { EditSharp } from "@mui/icons-material";
import Modal from "../../../ui/Modal";
import EditUserForm from "./EditUserForm";
import { useTranslation } from "react-i18next";

function EditUser() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  return (
    <div>
      <Modal>
        <Modal.Open opens="edit-user-form">
          <Button
            variant="contained"
            endIcon={isRTL ? <EditSharp sx={{ marginRight: 4 }} /> : null}
            startIcon={isRTL ? null : <EditSharp />}
            sx={{
              width: 139,
              height: 56,
              borderRadius: 5,
              color: "white",
              fontSize: 16,
              background: "#005379",
              shadow: "0 4 60 0 #0038FF26",
            }}
          >
            {t("Edit")}
          </Button>
        </Modal.Open>
        <Modal.Window name="edit-user-form">
          <EditUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditUser;
