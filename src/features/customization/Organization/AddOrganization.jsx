import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddOrganizationModal from "./AddOrganizationModal";
import { useTranslation } from "react-i18next";
import Modal from "../../../ui/Modal";

function AddOrganization() {
  const [setOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const handleOpen = () => setOpen(true);
  return (
    <>
      <div>
        <Modal>
          <Modal.Open opens="add-Organization">
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
              {t("AddOrganization")}
            </Button>
          </Modal.Open>
          <Modal.Window name="add-Organization">
            <AddOrganizationModal />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default AddOrganization;
