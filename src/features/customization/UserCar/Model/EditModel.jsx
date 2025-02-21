import { Switch } from "@mui/material";
import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import useEditModel from "./useEditModel";
import Spinner from "../../../../ui/Spinner";
import useViewModel from "./useViewModel";
import { useForm } from "react-hook-form";
import Form from "../../../../ui/Form";
import { useTranslation } from "react-i18next";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
`;

function EditModel({ onCloseModal, data }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const { models } = useViewModel(data);
  const { editModels, isLoading } = useEditModel(data);
  const {
    name: { ar: arabicName, en: englishName },
    is_active,
  } = models;
  const { t } = useTranslation();

  const [setArName] = useState(""); // Arabic name state
  const [setEgName] = useState(""); // English name state
  const [isActive, setIsActive] = useState(is_active); // IsActive state

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
    editModels(
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

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
        <FormRowVertical error={errors?.englishName?.message}>
          <StyledLabel htmlFor="EnglishName">English Name</StyledLabel>
          <Input
            type="text"
            id="EnglishName"
            placeholder="English Name"
            // value={egName}
            defaultValue={englishName}
            onChange={handleEnglishNameChange}
            {...register("englishName", {
              required: {
                value: true, // This specifies that the field is required
                message: t("englishName.required"), // Correctly translating the message
              },
              minLength: {
                value: 3,
                message: t("englishName.minLength"),
              },
              maxLength: {
                value: 20,
                message: t("englishName.maxLength"),
              },
              validate: {
                // singleWord: (value) =>
                //   /^[^\s]+$/.test(value) || t("englishName.singleWord"),
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z0-9\s]*$/.test(value) ||
                  t("englishName.noSpecialCharacters"),
                noSQLInjection: (value) =>
                  !/[;'"|#-]/.test(value) || t("englishName.noSQLInjection"),
              },
            })}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical error={errors?.arabicName?.message}>
          <StyledLabel htmlFor="ArabicName">Arabic Name</StyledLabel>
          <Input
            type="text"
            id="ArabicName"
            placeholder="Arabic Name"
            // value={arName}
            defaultValue={arabicName}
            onChange={handleArabicNameChange}
            {...register("arabicName", {
              required: {
                value: true, // This specifies that the field is required
                message: t("arabicName.required"), // Correctly translating the message
              },
              minLength: {
                value: 3,
                message: t("arabicName.minLength"),
              },
              maxLength: {
                value: 20,
                message: t("arabicName.maxLength"),
              },
              validate: {
                // singleWord: (value) =>
                //   /^[^\s]+$/.test(value) || t("arabicName.singleWord"),
                // noSpecialCharacters: (value) =>
                //   /^[a-zA-Z0-9\s]*$/.test(value) ||
                //   t("arabicName.noSpecialCharacters"),
                noSQLInjection: (value) =>
                  !/[;'"|#-]/.test(value) || t("arabicName.noSQLInjection"),
                arabicValidation: (value) =>
                  /^[\u0600-\u06FF\s]+$/.test(value) ||
                  t("arabicName.arabicOnly"),
              },
            })}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>

        <StyledLabel htmlFor="isActive">Is Active</StyledLabel>
        <Switch
          checked={Boolean(isActive)}
          onChange={handleSwitchChange}
          color="primary"
        />

        <FormRowVertical>
          <Button type="submit">Edit</Button>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default EditModel;
