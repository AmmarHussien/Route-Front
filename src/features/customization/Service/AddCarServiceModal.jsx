import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import styled from "styled-components";
import Form from "../../../ui/Form";

import { useState } from "react";
import useCreateCarService from "./useCreateCarService";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Spinner from "../../../ui/Spinner";
// import useCreateOrganization from "./useCreateOrganization";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function AddCarServiceModal({ onCloseModal }) {
  const { t } = useTranslation();

  const [arName, setArName] = useState();
  const [egName, setEgName] = useState();
  const [driverCommission, setDriverCommission] = useState();
  const [openingPrice, setOpeningPrice] = useState();
  const [separationKm, setSeparationKm] = useState();
  const [beforeSeparationPrice, setBeforeSeparationPrice] = useState();
  const [afterSeparationPrice, setAfterSeparationPrice] = useState();
  const [inOutSeparationKm, setInOutSeparationKm] = useState();

  const { addCarService, isAdded } = useCreateCarService();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

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

  const onError = (errors) => {
    console.log(errors);
  };
  const onSubmit = (data) => {
    addCarService(
      {
        englishName: data.englishName,
        arabicName: data.arabicName,
        driverCommission: data.driverCommission,
        openingPrice: data.openingPrice,
        separationKm: data.separationKm,
        beforeSeparationPrice: data.beforeSeparationPrice,
        afterSeparationPrice: data.afterSeparationPrice,
        inOutSeparationKm: data.InOutSeparationKm,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  return isAdded ? (
    <Spinner />
  ) : (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "grid" : "regular"}
    >
      <FormRowVertical error={errors?.englishName?.message}>
        <StyledLabel htmlFor="EnglishName">{t("englishName")}</StyledLabel>
        <Input
          type="text"
          id="EnglishName"
          placeholder={t("englishName")}
          value={egName}
          onChange={handleEnglishNameChange}
          {...register("englishName", {
            required: {
              value: true, // This specifies that the field is required
              message: t("englishNameValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 3,
              message: t("englishNameValidation.minLength"),
            },
            maxLength: {
              value: 20,
              message: t("englishNameValidation.maxLength"),
            },
            validate: {
              // singleWord: (value) =>
              //   /^[^\s]+$/.test(value) || t("englishName.singleWord"),
              noSpecialCharacters: (value) =>
                /^[a-zA-Z0-9\s]*$/.test(value) ||
                t("englishNameValidation.noSpecialCharacters"),
              noSQLInjection: (value) =>
                !/[;'"|#-]/.test(value) ||
                t("englishNameValidation.noSQLInjection"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.arabicName?.message}>
        <StyledLabel htmlFor="ArabicName">{t("arabicName")}</StyledLabel>
        <Input
          type="text"
          id="ArabicName"
          placeholder={t("arabicName")}
          value={arName}
          onChange={handleArabicNameChange}
          {...register("arabicName", {
            required: {
              value: true, // This specifies that the field is required
              message: t("arabicNameValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 3,
              message: t("arabicNameValidation.minLength"),
            },
            maxLength: {
              value: 20,
              message: t("arabicNameValidation.maxLength"),
            },
            validate: {
              singleWord: (value) =>
                /^[^\s]+$/.test(value) || t("arabicNameValidation.singleWord"),
              // noSpecialCharacters: (value) =>
              //   /^[a-zA-Z0-9\s]*$/.test(value) ||
              //   t("arabicName.noSpecialCharacters"),
              noSQLInjection: (value) =>
                !/[;'"|#-]/.test(value) ||
                t("arabicNameValidation.noSQLInjection"),
              arabicValidation: (value) =>
                /^[\u0600-\u06FF\s]+$/.test(value) ||
                t("arabicNameValidation.arabicOnly"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.driverCommission?.message}>
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
          {...register("driverCommission", {
            required: {
              value: true, // This specifies that the field is required
              message: t("driverCommissionValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 1,
              message: t("driverCommissionValidation.minLength"),
            },
            maxLength: {
              value: 10,
              message: t("driverCommissionValidation.maxLength"),
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.openingPrice?.message}>
        <StyledLabel htmlFor="openingPrice">{t("openingPrice")}</StyledLabel>
        <Input
          type="number"
          id="openingPrice"
          placeholder={t("openingPrice")}
          value={openingPrice} // Controlled input with fallback
          onChange={handleOpeningPriceChange}
          min={0}
          {...register("openingPrice", {
            required: {
              value: true, // This specifies that the field is required
              message: t("openingPriceValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 1,
              message: t("openingPriceValidation.minLength"),
            },
            maxLength: {
              value: 10,
              message: t("openingPriceValidation.maxLength"),
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.separationKm?.message}>
        <StyledLabel htmlFor="separationKm">{t("separationKm")}</StyledLabel>
        <Input
          type="number"
          id="separationKm"
          placeholder={t("separationKm")}
          value={separationKm} // Controlled input with fallback
          onChange={handleSeparationKmChange}
          min={0}
          {...register("separationKm", {
            required: {
              value: true, // This specifies that the field is required
              message: t("separationKmValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 1,
              message: t("separationKmValidation.minLength"),
            },
            maxLength: {
              value: 10,
              message: t("separationKmValidation.maxLength"),
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.beforeSeparationPrice?.message}>
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
          {...register("beforeSeparationPrice", {
            required: {
              value: true, // This specifies that the field is required
              message: t("beforeSeparationPriceValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 1,
              message: t("beforeSeparationPriceValidation.minLength"),
            },
            maxLength: {
              value: 10,
              message: t("beforeSeparationPriceValidation.maxLength"),
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.afterSeparationPrice?.message}>
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
          {...register("afterSeparationPrice", {
            required: {
              value: true, // This specifies that the field is required
              message: t("afterSeparationPriceValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 1,
              message: t("afterSeparationPriceValidation.minLength"),
            },
            maxLength: {
              value: 10,
              message: t("afterSeparationPriceValidation.maxLength"),
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.InOutSeparationKm?.message}>
        <StyledLabel htmlFor="InOutSeparationKm">
          {t("inOutSeparationKm")}
        </StyledLabel>
        <Input
          type="number"
          id="InOutSeparationKm"
          placeholder={t("inOutSeparationKm")}
          value={inOutSeparationKm} // Controlled input with fallback
          onChange={handleInOutSeparationKmChange}
          min={0}
          {...register("InOutSeparationKm", {
            required: {
              value: true, // This specifies that the field is required
              message: t("InOutSeparationKmValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 1,
              message: t("InOutSeparationKmValidation.minLength"),
            },
            maxLength: {
              value: 10,
              message: t("InOutSeparationKmValidation.maxLength"),
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical></FormRowVertical>

      <FormRowVertical>
        <Button type="submit">{t("Submit")}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default AddCarServiceModal;
