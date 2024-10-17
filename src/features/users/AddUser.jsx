import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import CreateUserForm from "./CreateUserForm";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";

function AddUser() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  return (
    <div>
      <Modal>
        <Modal.Open opens="add-user-form">
          <Button
            variant="contained"
            endIcon={isRTL ? <AddIcon sx={{ marginRight: 1 }} /> : null}
            startIcon={isRTL ? null : <AddIcon />}
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
            {t("AddUser")}
          </Button>
        </Modal.Open>
        <Modal.Window name="add-user-form">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;
