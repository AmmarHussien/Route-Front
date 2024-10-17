import { Box, Modal } from "@mui/material";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import useCreateOrganization from "./useCreateOrganization";
import { useTranslation } from "react-i18next";
import Spinner from "../../../ui/Spinner";

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

function AddOrganizationModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  const [arName, setArName] = useState();
  const [egName, setEgName] = useState();
  const [editError, setEditError] = useState(null);
  const { createOrganizations, isLoading, isError, error } =
    useCreateOrganization();

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  const validateArabicName = (name) => {
    // Check if the string is not empty and contains Arabic characters
    const arabicRegex = /^[\u0600-\u06FF\s]+$/; // Arabic character range
    return name.trim() !== "" && arabicRegex.test(name);
  };

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  const handleClick = () => {
    setEditError(null); // Clear previous error before new submission

    // Simple validation
    if (!egName || !arName) {
      setEditError(t("OrganizationValidation.allRequired"));
      return;
    }
    if (validateArabicName(arName)) {
      // Proceed with the form submission
      createOrganizations(
        {
          englishName: egName,
          arabicName: arName,
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
      setEditError(t("OrganizationValidation.arabicName"));
      return;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <FormRowVertical>
          <StyledLabel htmlFor="EnglishName">{t("englishName")}</StyledLabel>
          <Input
            type="text"
            id="EnglishName"
            placeholder={t("englishName")}
            value={egName}
            onChange={handleEnglishNameChange}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="ArabicName">{t("arabicName")}</StyledLabel>
          <Input
            type="text"
            id="ArabicName"
            placeholder={t("arabicName")}
            value={arName}
            onChange={handleArabicNameChange}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button type="submit" onClick={handleClick}>
            {t("AddOrganization")}
          </Button>
        </FormRowVertical>
        {editError && (
          <p style={{ color: "red", marginTop: "10px" }}>{editError}</p>
        )}
      </Box>
    </Modal>
  );
}

export default AddOrganizationModal;
