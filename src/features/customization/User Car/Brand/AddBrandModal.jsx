import { Box, Modal } from "@mui/material";
import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useCreateManufactures from "./useCreateManufactures";
import FileInput from "../../../../ui/FileInput";
import { useUploader } from "../../../../hooks/useUploader";
import { useForm } from "react-hook-form";

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

  const { setValue } = useForm();

  const [arName, setArName] = useState();
  const [egName, setEgName] = useState();
  const [editError, setEditError] = useState(null);
  const [logo, setLogo] = useState(null);
  const { addManufacture, isLoading, isError, error } = useCreateManufactures();
  const { upload } = useUploader();

  const validateArabicName = (name) => {
    // Check if the string is not empty and contains Arabic characters
    const arabicRegex = /^[\u0600-\u06FF\s]+$/; // Arabic character range
    return name.trim() !== "" && arabicRegex.test(name);
  };

  const handleFileChange = (setFileState) => async (file) => {
    const uploadData = new FormData();
    setFileState(file);
    setValue(file.name, file);

    uploadData.append("file", file);
    uploadData.append("dir", "manufactures");

    try {
      const response = await upload(uploadData);
      setLogo(response);
    } catch (error) {
      //console.error("Upload failed:", error.message);
    }
  };

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  useEffect(() => {
    if (logo) {
      // This runs every time profileImage changes
    }
  }, [logo]);

  const handleClick = () => {
    setEditError(null); // Clear previous error before new submission

    const imagePath = logo ? logo.path : "";

    // Simple validation
    if (!egName || !arName || !logo) {
      setEditError("Both fields are required.");
      return;
    }
    if (validateArabicName(arName)) {
      // Proceed with the form submission
      addManufacture(
        {
          englishName: egName,
          arabicName: arName,
          logo: imagePath,
        },
        {
          onSuccess: () => {
            handleClose();
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

  if (isLoading) return <p>Updating...</p>;
  if (isError) return <p>Error: {error.message}</p>;

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
        <FormRowVertical>
          <StyledLabel htmlFor="logo">Logo</StyledLabel>
          <FileInput
            placeholder="Logo"
            id="logo"
            onFileChange={handleFileChange(setLogo)}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button type="submit" onClick={handleClick}>
            Add New Brand
          </Button>
        </FormRowVertical>
        {editError && (
          <p style={{ color: "red", marginTop: "10px" }}>Error: {editError}</p>
        )}
      </Box>
    </Modal>
  );
}

export default AddBrandModal;