import { Box, Modal, Switch } from "@mui/material";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Spinner from "../../../ui/Spinner";
import useEditOrganization from "./useEditOrganization";
import useViewOrganization from "./useViewOrganization";
import { useTranslation } from "react-i18next";

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

function EditOrganization({ open, setOpen, data }) {
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  const [arName, setArName] = useState(""); // Arabic name state
  const [egName, setEgName] = useState(""); // English name state
  const [isActive, setIsActive] = useState(""); // IsActive state
  const [editError, setEditError] = useState(null); // Error state
  const { viewOrganizations, isLoading: viewLoading } =
    useViewOrganization(data);
  const { mutate: editOrganization, isLoading } = useEditOrganization(data);

  useEffect(() => {
    if (open && data) {
      const {
        name: { ar, en },
        is_active,
      } = viewOrganizations;

      setArName(ar); // Reset Arabic name field
      setEgName(en); // Reset English name field
      setIsActive(is_active); // Reset is_active field
    }
  }, [open, data, viewOrganizations]);

  if (isLoading || viewLoading) return <Spinner />;

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

    if (!egName || !arName) {
      setEditError(t("OrganizationValidation.allRequired"));
      return;
    }

    if (validateArabicName(arName)) {
      // Proceed with the form submission
      editOrganization(
        {
          englishName: egName,
          arabicName: arName,
          isActive: isActive,
        },
        {
          onSuccess: () => {
            handleClose(); // Close the modal only if successful
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

        <StyledLabel htmlFor="isActive">{t("isActive")}</StyledLabel>
        <Switch
          checked={Boolean(isActive)}
          onChange={handleSwitchChange}
          color="primary"
        />

        <FormRowVertical>
          <Button type="submit" onClick={handleClick}>
            {t("Submit")}
          </Button>
        </FormRowVertical>
        {editError && (
          <p style={{ color: "red", marginTop: "10px" }}>{editError}</p>
        )}
      </Box>
    </Modal>
  );
}

export default EditOrganization;
