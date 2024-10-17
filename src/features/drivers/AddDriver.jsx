import { Button } from "@mui/material";
import Modal from "../../ui/Modal";
import AddIcon from "@mui/icons-material/Add";
import CreateDriverForm from "./CreateDriverForm";
import { useTranslation } from "react-i18next";

function AddDriver() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  return (
    <div>
      <Modal>
        <Modal.Open opens="add-driver-form">
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
              shadow: "0 4 60 0 #0038FF26",
            }}
          >
            {t("AddDriver")}
          </Button>
        </Modal.Open>
        <Modal.Window name="add-driver-form">
          <CreateDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddDriver;
