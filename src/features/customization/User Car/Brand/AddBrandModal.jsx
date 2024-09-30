import { Box, Modal } from "@mui/material";
import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import useCreateManufactures from "./useCreateManufactures";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
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

function AddBrandModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  const [arName, setArName] = useState();
  const [egName, setEgName] = useState();

  const { addManufacture, isLoading, isError, error } = useCreateManufactures();

  if (isLoading) return <p>Updating...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  const handleClick = () => {
    addManufacture(
      {
        englishName: egName,
        arabicName: arName,
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
            onChange={handleArabicNameChange}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button type="submit" onClick={handleClick}>
            Add New Brand
          </Button>
        </FormRowVertical>
      </Box>
    </Modal>
  );
}

export default AddBrandModal;
