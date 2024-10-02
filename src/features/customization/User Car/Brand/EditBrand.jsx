import { Box, Modal, Switch } from "@mui/material";
import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import useViewManufactures from "./useViewManufactures";
import styled from "styled-components";
import useEditManufactures from "./useEditManufactures";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "34%",
  left: "70%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function EditBrand({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { manufactures } = useViewManufactures();

  const [arName, setArName] = useState(""); // Arabic name state
  const [egName, setEgName] = useState(""); // English name state
  const [isActive, setIsActive] = useState(""); // IsActive state
  const [editError, setEditError] = useState(null); // Error state

  const { editManufacture, isLoading } = useEditManufactures();

  useEffect(() => {
    if (open && manufactures) {
      const {
        name: { ar: arabicName, en: englishName },
        is_active,
      } = manufactures;
      console.log(is_active);

      setArName(arabicName); // Reset Arabic name field
      setEgName(englishName); // Reset English name field
      setIsActive(is_active); // Reset is_active field
    }
  }, [open, manufactures]); // Reset when modal opens or manufactures data changes

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsActive(event.target.checked);
  };

  const validateArabicName = (name) => {
    // Check if the string is not empty and contains Arabic characters
    const arabicRegex = /^[\u0600-\u06FF\s]+$/; // Arabic character range
    return name.trim() !== "" && arabicRegex.test(name);
  };

  const handleClick = () => {
    setEditError(null); // Clear previous error before new submission

    if (!arName || !egName) {
      setEditError("Please fill in all required fields correctly.");
      return;
    }

    if (validateArabicName(arName)) {
      editManufacture(
        {
          englishName: egName,
          arabicName: arName,
          isActive: isActive,
        },
        {
          onSuccess: () => {
            setOpen(false); // Close the modal only if successful
          },
          onError: (error) => {
            setEditError(error.message); // Set the error message and keep the modal open
          },
        }
      );
    } else {
      setEditError("Invalid Arabic name. It must contain Arabic characters.");
      return;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <FormRowVertical>
          <StyledLabel htmlFor="EnglishName">English Name</StyledLabel>
          <Input
            type="text"
            id="EnglishName"
            placeholder="English Name"
            value={egName} // Controlled input to reflect state
            onChange={handleEnglishNameChange}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="ArabicName">Arabic Name</StyledLabel>
          <Input
            type="text"
            id="ArabicName"
            placeholder="Arabic Name"
            value={arName} // Controlled input to reflect state
            onChange={handleArabicNameChange}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <StyledLabel htmlFor="isActive">Is Active</StyledLabel>
        <Switch
          checked={Boolean(isActive)}
          onChange={handleSwitchChange}
          color="primary"
        />
        <FormRowVertical>
          <Button type="submit" onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Updating..." : "Edit"}
          </Button>
        </FormRowVertical>
        {editError && (
          <p style={{ color: "red", marginTop: "10px" }}>Error: {editError}</p>
        )}{" "}
        {/* Display error message */}
      </Box>
    </Modal>
  );
}

export default EditBrand;
