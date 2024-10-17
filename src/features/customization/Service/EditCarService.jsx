import { Box, Modal } from "@mui/material";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Button from "../../../ui/Button";
import useEditCarService from "./useEditCarService";
import Spinner from "../../../ui/Spinner";
import useViewCarService from "./useViewCarService";
import { useTranslation } from "react-i18next";

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

function EditCarService({ open, setOpen, data, isLoading: loading }) {
  const { carService } = useViewCarService(data);

  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  // Initialize state
  const [arName, setArName] = useState("");
  const [egName, setEgName] = useState("");
  const [driverCommission, setDriverCommission] = useState("");
  const [openingPrice, setOpeningPrice] = useState("");
  const [separationKm, setSeparationKm] = useState("");
  const [beforeSeparationPrice, setBeforeSeparationPrice] = useState("");
  const [afterSeparationPrice, setAfterSeparationPrice] = useState("");
  const [inOutSeparationKm, setInOutSeparationKm] = useState("");
  const { editCarService, isLoading } = useEditCarService(data);

  const [editError, setEditError] = useState(null); // Error state
  useEffect(() => {
    if (open && data) {
      // Extract data from the passed `data` object
      const {
        name: { en = "", ar = "" },
        driver_commission = 0, // Default to 0 if undefined
        opening_price = 0, // Default to 0 if undefined
        separation_km = 0, // Default to 0 if undefined
        before_separation_price = 0, // Default to 0 if undefined
        after_separation_price = 0, // Default to 0 if undefined
        in_out_separation_km = 0, // Default to 0 if undefined
      } = carService;

      // Update state with values from the data prop
      setArName(ar);
      setEgName(en);
      setDriverCommission(driver_commission.toString());
      setOpeningPrice(opening_price.toString());
      setSeparationKm(separation_km.toString());
      setBeforeSeparationPrice(before_separation_price.toString());
      setAfterSeparationPrice(after_separation_price.toString());
      setInOutSeparationKm(in_out_separation_km.toString());
    }
  }, [open, carService, data]);

  if (loading) return <Spinner />;

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

  const validateArabicName = (name) => {
    const arabicRegex = /^[\u0600-\u06FF\s]+$/; // Arabic character range
    return name.trim() !== "" && arabicRegex.test(name);
  };

  const handleClick = () => {
    // Clear previous error before new submission
    setEditError(null);

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
      setEditError(t("CarServiceValidation.allRequired"));
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
          },
          onError: (error) => {
            setEditError(error.message);
          },
        }
      );
    } else {
      setEditError(t("CarServiceValidation.arabicName"));
      return;
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <FormRowVertical>
            <StyledLabel htmlFor="EnglishName">{t("englishName")}</StyledLabel>
            <Input
              type="text"
              id="EnglishName"
              placeholder={t("englishName")}
              value={egName || ""} // Controlled input with fallback
              onChange={handleEnglishNameChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="ArabicName">{t("arabicName")}</StyledLabel>
            <Input
              type="text"
              id={t("arabicName")}
              placeholder="Arabic Name"
              value={arName} // Controlled input with fallback
              onChange={handleArabicNameChange}
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
              value={driverCommission || ""} // Controlled input with fallback
              onChange={handleDriverCommissionChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="openingPrice">
              {t("openingPrice")}
            </StyledLabel>
            <Input
              type="number"
              id="openingPrice"
              placeholder={t("openingPrice")}
              value={openingPrice || ""} // Controlled input with fallback
              onChange={handleOpeningPriceChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="separationKm">
              {t("separationKm")}
            </StyledLabel>
            <Input
              type="number"
              id="separationKm"
              placeholder={t("separationKm")}
              value={separationKm || ""} // Controlled input with fallback
              onChange={handleSeparationKmChange}
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
              value={beforeSeparationPrice || ""} // Controlled input with fallback
              onChange={handleBeforeSeparationPriceChange}
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
              value={afterSeparationPrice || ""} // Controlled input with fallback
              onChange={handleAfterSeparationPriceChange}
            />
          </FormRowVertical>
          <FormRowVertical>
            <StyledLabel htmlFor="InOutSeparationKm">
              {t("inOutSeparationKm")}
            </StyledLabel>
            <Input
              type="number"
              id="InOutSeparationKm"
              placeholder={t("inOutSeparationKm")}
              value={inOutSeparationKm || ""} // Controlled input with fallback
              onChange={handleInOutSeparationKmChange}
            />
          </FormRowVertical>

          {/* Error message display */}
          <FormRowVertical>
            {editError && (
              <div style={{ color: "red", gridColumn: "span 2" }}>
                {editError}
              </div>
            )}
          </FormRowVertical>

          <Button onClick={handleClick}>{t("Submit")}</Button>
        </Box>
      </Modal>
    </>
  );
}

export default EditCarService;
