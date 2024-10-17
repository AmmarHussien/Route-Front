import { Button } from "@mui/material";
import { BlockSharp } from "@mui/icons-material";
import Modal from "../../../ui/Modal";
import BlockUserForm from "./BlockUserForm";
import { useTranslation } from "react-i18next";

function BlockUser() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  return (
    <div>
      <Modal>
        <Modal.Open opens="block-user-form">
          <Button
            variant="contained"
            endIcon={isRTL ? <BlockSharp sx={{ marginRight: 4 }} /> : null}
            startIcon={isRTL ? null : <BlockSharp />}
            sx={{
              width: 139,
              height: 56,
              borderRadius: 5,
              fontSize: 16,
              background: "#FEE2E2",
              color: "#FC5555",
              shadow: "0 4 60 0 #0038FF26",
              "&:hover": {
                background: "#EFF6FF",
                boxShadow: "0 4px 60px 0 #0038FF26",
              },
            }}
          >
            {t("Block")}
          </Button>
        </Modal.Open>
        <Modal.Window name="block-user-form">
          <BlockUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default BlockUser;
