import { Box, Modal, Switch } from "@mui/material";
import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useEditModel from "./useEditModel";
import Spinner from "../../../../ui/Spinner";

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
  color: #333;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
`;

function EditModel({ open, setOpen, data }) {
  const handleClose = () => setOpen(false);

  const [arName, setArName] = useState(""); // Arabic name state
  const [egName, setEgName] = useState(""); // English name state
  const [isActive, setIsActive] = useState(""); // IsActive state
  const [editError, setEditError] = useState(null); // Error state

  const { editModels, isLoading } = useEditModel(data.id);

  useEffect(() => {
    if (open && data) {
      const { arabicName, englishName, isActive: active } = data;

      const check = active === "True" ? true : false;

      setArName(arabicName); // Reset Arabic name field
      setEgName(englishName); // Reset English name field
      setIsActive(check); // Reset is_active field
    }
  }, [open, data]);

  if (isLoading) return <Spinner />;

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsActive(event.target.checked);
  };

  const handleClick = () => {
    setEditError(null); // Clear previous error before new submission
    editModels(
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
            value={egName}
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
            value={arName}
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
          <Button type="submit" onClick={handleClick}>
            Edit
          </Button>
        </FormRowVertical>
        {editError && (
          <p style={{ color: "red", marginTop: "10px" }}>Error: {editError}</p>
        )}
      </Box>
    </Modal>
  );
}

export default EditModel;
