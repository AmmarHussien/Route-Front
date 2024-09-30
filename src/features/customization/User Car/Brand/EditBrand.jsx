import { Box, Modal } from "@mui/material";
import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import useViewManufactures from "./useViewManufactures";
import styled from "styled-components";
import useEditManufactures from "./useEditManufactures";
import { useState } from "react";

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

  const {
    name: { ar: arabicName, en: englishName },
    is_active,
  } = manufactures;

  const [arName, setArName] = useState(arabicName);
  const [egName, setEgName] = useState(englishName);
  const [isActive, setIsActive] = useState(is_active);

  const { editManufacture, isLoading, isError, error } = useEditManufactures();

  if (isLoading) return <p>Updating...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  const handleIsActiveChange = (event) => {
    setIsActive(event.target.value);
  };

  const handleClick = () => {
    console.log(egName, arName, isActive);

    editManufacture(
      {
        englishName: egName,
        arabicName: arName,
        isActive: isActive,
      },
      {
        onSuccess: () => {
          handleClose();
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
            defaultValue={englishName}
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
            defaultValue={arabicName}
            onChange={handleArabicNameChange}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="isActive">Is Active</StyledLabel>
          <Input
            type="text"
            id="isActive"
            placeholder="Is Active"
            defaultValue={is_active}
            onChange={handleIsActiveChange}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button type="submit" onClick={handleClick}>
            Edit
          </Button>
        </FormRowVertical>
      </Box>
    </Modal>
  );
}

export default EditBrand;
