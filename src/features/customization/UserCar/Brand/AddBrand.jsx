import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddBrandModal from "./AddBrandModal";
import { useTranslation } from "react-i18next";
import Modal from "../../../../ui/Modal";

function AddBrand() {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  return (
    <>
      <div>
        <Modal>
          <Modal.Open opens="add-Brand">
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
              {t("AddBrand")}
            </Button>
          </Modal.Open>
          <Modal.Window name="add-Brand">
            <AddBrandModal />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default AddBrand;
