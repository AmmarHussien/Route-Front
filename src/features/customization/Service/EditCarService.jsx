import { Box, Modal } from "@mui/material";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import useEditCarService from "./useEditCarService";
import Spinner from "../../../ui/Spinner";

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
  color: #333;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
`;

function EditCarService({ open, setOpen, data }) {
  const handleClose = () => setOpen(false);

  // Initialize state with undefined or empty strings
  const [arName, setArName] = useState("");
  const [egName, setEgName] = useState("");
  const [driverCommission, setDriverCommission] = useState("");
  const [openingPrice, setOpeningPrice] = useState("");
  const [separationKm, setSeparationKm] = useState("");
  const [beforeSeparationPrice, setBeforeSeparationPrice] = useState("");
  const [afterSeparationPrice, setAfterSeparationPrice] = useState("");
  const [inOutSeparationKm, setInOutSeparationKm] = useState("");

  const [editError, setEditError] = useState(null); // Error state

  useEffect(() => {
    if (open && data) {
      const {
        englishName = "",
        arabicName = "",
        driverCommission = 0, // Default to 0 if undefined
        openingPrice = 0, // Default to 0 if undefined
        separationKm = 0, // Default to 0 if undefined
        beforeSeparationPrice = 0, // Default to 0 if undefined
        afterSeparationPrice = 0, // Default to 0 if undefined
        inOutSeparationKm = 0, // Default to 0 if undefined
      } = data;

      // Set the values correctly
      setArName(arabicName);
      setEgName(englishName);
      setDriverCommission(driverCommission); // Ensure these are strings for input
      setOpeningPrice(openingPrice);
      setSeparationKm(separationKm);
      setBeforeSeparationPrice(beforeSeparationPrice);
      setAfterSeparationPrice(afterSeparationPrice);
      setInOutSeparationKm(inOutSeparationKm);
    }
  }, [open, data]); // Reset when modal opens or data changes

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

  const { editCarService, isLoading } = useEditCarService(data.id);

  const validateArabicName = (name) => {
    // Check if the string is not empty and contains Arabic characters
    const arabicRegex = /^[\u0600-\u06FF\s]+$/; // Arabic character range
    return name.trim() !== "" && arabicRegex.test(name);
  };

  const handleClick = () => {
    // Clear previous error before new submission
    setEditError(null);

    // Optional: Validate inputs before making the service call
    if (
      !arName ||
      !egName ||
      driverCommission < 0 ||
      openingPrice < 0 ||
      separationKm < 0 ||
      beforeSeparationPrice < 0 ||
      afterSeparationPrice < 0 ||
      inOutSeparationKm < 0
    ) {
      setEditError("Please fill in all required fields correctly.");
      return;
    }

    if (validateArabicName(arName)) {
      editCarService(
        {
          arabicName: arName,
          englishName: egName,
          driverCommission,
          openingPrice,
          separationKm,
          beforeSeparationPrice,
          afterSeparationPrice,
          inOutSeparationKm,
        },
        {
          onSuccess: () => {
            setOpen(false); // Close the modal only if successful
            // Optional: Show success notification
          },
          onError: (error) => {
            setEditError(error.message); // Set the error message and keep the modal open
            // Optional: Show error notification
          },
        }
      );
    } else {
      setEditError("Invalid Arabic name. It must contain Arabic characters.");
      return;
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormRowVertical>
            <StyledLabel htmlFor="EnglishName">English Name</StyledLabel>
            <Input
              type="text"
              id="EnglishName"
              placeholder="English Name"
              value={egName || ""} // Controlled input with fallback
              onChange={handleEnglishNameChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="ArabicName">Arabic Name</StyledLabel>
            <Input
              type="text"
              id="ArabicName"
              placeholder="Arabic Name"
              value={arName || ""} // Controlled input with fallback
              onChange={handleArabicNameChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="driverCommission">
              Driver Commission
            </StyledLabel>
            <Input
              type="number"
              id="driverCommission"
              placeholder="Driver Commission"
              value={driverCommission || ""} // Controlled input with fallback
              onChange={handleDriverCommissionChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="openingPrice">Opening Price</StyledLabel>
            <Input
              type="number"
              id="openingPrice"
              placeholder="Opening Price"
              value={openingPrice || ""} // Controlled input with fallback
              onChange={handleOpeningPriceChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="separationKm">Separation Km</StyledLabel>
            <Input
              type="number"
              id="separationKm"
              placeholder="Separation Km"
              value={separationKm || ""} // Controlled input with fallback
              onChange={handleSeparationKmChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="beforeSeparationPrice">
              Before Separation Price
            </StyledLabel>
            <Input
              type="number"
              id="beforeSeparationPrice"
              placeholder="Before Separation Price"
              value={beforeSeparationPrice || ""} // Controlled input with fallback
              onChange={handleBeforeSeparationPriceChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="afterSeparationPrice">
              After Separation Price
            </StyledLabel>
            <Input
              type="number"
              id="afterSeparationPrice"
              placeholder="After Separation Price"
              value={afterSeparationPrice || ""} // Controlled input with fallback
              onChange={handleAfterSeparationPriceChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="InOutSeparationKm">
              In Out Separation Km
            </StyledLabel>
            <Input
              type="number"
              id="InOutSeparationKm"
              placeholder="In Out Separation Km"
              value={inOutSeparationKm || ""} // Controlled input with fallback
              onChange={handleInOutSeparationKmChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            {editError && (
              <p style={{ color: "red", marginTop: "10px" }}>
                Error: {editError}
              </p>
            )}{" "}
            {/* Display error message */}
          </FormRowVertical>
          <FormRowVertical>
            <Button type="submit" onClick={handleClick} disabled={isLoading}>
              {isLoading ? "Updating..." : "Edit"}
            </Button>
          </FormRowVertical>
        </Box>
      </Modal>
    </>
  );
}

export default EditCarService;
