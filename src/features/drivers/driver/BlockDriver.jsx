import { Button } from "@mui/material";

import Modal from "../../../ui/Modal";
import BlockDriverForm from "./BlockDriverForm";
import { BlockSharp } from "@mui/icons-material";

function BlockDriver() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="block-driver-form">
          <Button
            variant="contained"
            startIcon={<BlockSharp />}
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
            Block
          </Button>
        </Modal.Open>
        <Modal.Window name="block-driver-form">
          <BlockDriverForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default BlockDriver;
