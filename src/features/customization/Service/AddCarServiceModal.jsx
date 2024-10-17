import { Box, Modal } from "@mui/material";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import useCreateCarService from "./useCreateCarService";
import { useTranslation } from "react-i18next";
// import useCreateOrganization from "./useCreateOrganization";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "16px",
  width: 700,
};

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function AddCarServiceModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  const [arName, setArName] = useState();
  const [egName, setEgName] = useState();
  const [editError, setEditError] = useState(null);
  const [driverCommission, setDriverCommission] = useState(0);
  const [openingPrice, setOpeningPrice] = useState(0);
  const [separationKm, setSeparationKm] = useState(0);
  const [beforeSeparationPrice, setBeforeSeparationPrice] = useState(0);
  const [afterSeparationPrice, setAfterSeparationPrice] = useState(0);
  const [inOutSeparationKm, setInOutSeparationKm] = useState(0);

  const { createCarService, isLoading, isError, error } = useCreateCarService();
  // const { createOrganizations, isLoading, isError, error } =
  //   useCreateOrganization();

  if (isLoading) return <p>Updating...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const validateArabicName = (name) => {
    // Check if the string is not empty and contains Arabic characters
    const arabicRegex = /^[\u0600-\u06FF\s]+$/; // Arabic character range
    return name.trim() !== "" && arabicRegex.test(name);
  };

  const handleEnglishNameChange = (event) => setEgName(event.target.value);
  const handleArabicNameChange = (event) => setArName(event.target.value);
  const handleDriverCommissionChange = (event) =>
    setDriverCommission(event.target.value);

  const handleOpeningPriceChange = (event) =>
    setOpeningPrice(event.target.value);
  const handleSeparationKmChange = (event) =>
    setSeparationKm(event.target.value);
  const handleBeforeSeparationPriceChange = (event) =>
    setBeforeSeparationPrice(event.target.value);
  const handleAfterSeparationPriceChange = (event) =>
    setAfterSeparationPrice(event.target.value);
  const handleInOutSeparationKmChange = (event) =>
    setInOutSeparationKm(event.target.value);
  const handleClick = () => {
    setEditError(null); // Clear previous error before new submission

    // Simple validation
    if (
      !arName ||
      !egName ||
      driverCommission <= 0 ||
      openingPrice <= 0 ||
      separationKm <= 0 ||
      beforeSeparationPrice <= 0 ||
      afterSeparationPrice <= 0 ||
      inOutSeparationKm <= 0
    ) {
      setEditError(t("CarServiceValidation.allRequired"));
      return;
    }
    if (validateArabicName(arName)) {
      // Proceed with the form submission
      createCarService(
        {
          englishName: egName,
          arabicName: arName,
          driverCommission,
          openingPrice,
          separationKm,
          beforeSeparationPrice,
          afterSeparationPrice,
          inOutSeparationKm,
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
      setEditError(t("CarServiceValidation.arabicName"));
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
          <StyledLabel htmlFor="driverCommission">
            {t("driverCommission")}
          </StyledLabel>
          <Input
            type="number"
            id="driverCommission"
            placeholder={t("driverCommission")}
            value={driverCommission} // Controlled input with fallback
            onChange={handleDriverCommissionChange}
            min={0}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="openingPrice">{t("openingPrice")}</StyledLabel>
          <Input
            type="number"
            id="openingPrice"
            placeholder={t("openingPrice")}
            value={openingPrice} // Controlled input with fallback
            onChange={handleOpeningPriceChange}
            min={0}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="separationKm">{t("separationKm")}</StyledLabel>
          <Input
            type="number"
            id="separationKm"
            placeholder={t("separationKm")}
            value={separationKm} // Controlled input with fallback
            onChange={handleSeparationKmChange}
            min={0}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="beforeSeparationPrice">
            {t("beforeSeparationPrice")}
          </StyledLabel>
          <Input
            type="number"
            id="beforeSeparationPrice"
            placeholder={t("beforeSeparationPrice")}
            value={beforeSeparationPrice} // Controlled input with fallback
            onChange={handleBeforeSeparationPriceChange}
            min={0}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="afterSeparationPrice">
            {t("afterSeparationPrice")}
          </StyledLabel>
          <Input
            type="number"
            id="afterSeparationPrice"
            placeholder={t("afterSeparationPrice")}
            value={afterSeparationPrice} // Controlled input with fallback
            onChange={handleAfterSeparationPriceChange}
            min={0}
          />
        </FormRowVertical>
        <FormRowVertical>
          <StyledLabel htmlFor="InOutSeparationKm">
            {t("inOutSeparationKm")}
          </StyledLabel>
          <Input
            type="number"
            id="InOutSeparationKm"
            placeholder="In Out Separation Km"
            value={inOutSeparationKm} // Controlled input with fallback
            onChange={handleInOutSeparationKmChange}
            min={0}
          />
        </FormRowVertical>

        <FormRowVertical>
          {editError && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {t("CarServiceValidation.Error")} : {editError}
            </p>
          )}
        </FormRowVertical>

        <FormRowVertical>
          <Button type="submit" onClick={handleClick}>
            {t("Submit")}
          </Button>
        </FormRowVertical>
      </Box>
    </Modal>
  );
}

export default AddCarServiceModal;
