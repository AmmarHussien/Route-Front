import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import AddIcon from "@mui/icons-material/Add";
import CreateNotificationForm from "./CreateNotificationForm";
import { useTranslation } from "react-i18next";

function NewNotification() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-notification-form">
          <Button
            variant="contained"
            endIcon={isRTL ? <AddIcon sx={{ marginRight: 1 }} /> : null}
            startIcon={isRTL ? null : <AddIcon />}
            sx={{
              height: 56,
              borderRadius: 5,
              fontSize: 16,
              color: "white",
              background: "#005379",
              boxShadow: "0 4px 60px 0 rgba(0, 56, 255, 0.15)", // Updated shadow property
            }}
          >
            {t("NewNotification")}
          </Button>
        </Modal.Open>
        <Modal.Window name="add-notification-form" disableOutsideClick={true}>
          <CreateNotificationForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default NewNotification;
