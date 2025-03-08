import { Switch } from "@mui/material";
import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import useViewManufactures from "./useViewManufactures";
import styled from "styled-components";
import useEditManufactures from "./useEditManufactures";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Form from "../../../../ui/Form";
import { useForm } from "react-hook-form";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function EditBrand({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { manufactures } = useViewManufactures();
  const {
    name: { ar: arabicName, en: englishName },
    is_active,
  } = manufactures;

  const { t } = useTranslation();
  const [setArName] = useState(""); // Arabic name state
  const [setEgName] = useState(""); // English name state
  const [isActive, setIsActive] = useState(is_active); // IsActive state

  const { editManufacture, isLoading } = useEditManufactures();

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsActive(event.target.checked);
  };

  const onError = (errors) => {};

  const onSubmit = (data) => {
    editManufacture(
      {
        englishName: data.englishName,
        arabicName: data.arabicName,
        isActive: isActive,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
        <FormRowVertical error={errors?.englishName?.message}>
          <StyledLabel htmlFor="EnglishName">{t("englishName")}</StyledLabel>
          <Input
            type="text"
            id="EnglishName"
            placeholder="English Name"
            // value={egName} // Controlled input to reflect state
            onChange={handleEnglishNameChange}
            defaultValue={englishName}
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
            placeholder="Arabic Name"
            // value={arName} // Controlled input to reflect state
            defaultValue={arabicName}
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
                // singleWord: (value) =>
                //   /^[^\s]+$/.test(value) || t("arabicName.singleWord"),
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

        <FormRowVertical>
          <StyledLabel htmlFor="isActive">{t("isActive")}</StyledLabel>
          <Switch
            checked={Boolean(isActive)}
            onChange={handleSwitchChange}
            color="primary"
          />
        </FormRowVertical>

        <FormRowVertical>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : t("Submit")}
          </Button>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default EditBrand;
