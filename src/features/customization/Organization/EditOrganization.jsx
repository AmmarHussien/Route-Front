import { Switch } from "@mui/material";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import Spinner from "../../../ui/Spinner";
import useEditOrganization from "./useEditOrganization";
import useViewOrganization from "./useViewOrganization";
import { useTranslation } from "react-i18next";
import Form from "../../../ui/Form";
import { useForm } from "react-hook-form";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
`;

function EditOrganization({ onCloseModal, id }) {
  const { t } = useTranslation();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { viewOrganizations, isLoading: viewLoading } = useViewOrganization(id);
  const { name, is_active } = viewOrganizations;

  const [setArName] = useState(""); // Arabic name state
  const [setEgName] = useState(""); // English name state
  const [isActive, setIsActive] = useState(is_active); // IsActive state
  const { mutate: editOrganization, isLoading } = useEditOrganization(id);

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
    console.log(data, isActive);
    editOrganization(
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

  return viewLoading || isLoading ? (
    <Spinner />
  ) : (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={"regular"}>
      <FormRowVertical error={errors?.englishName?.message}>
        <StyledLabel htmlFor="EnglishName">{t("englishName")}</StyledLabel>
        <Input
          type="text"
          id="EnglishName"
          placeholder={t("englishName")}
          // value={egName}
          defaultValue={name.en}
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
          // value={arName}
          defaultValue={name.ar}
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
      <StyledLabel htmlFor="isActive">{t("isActive")}</StyledLabel>
      <Switch
        checked={Boolean(isActive)}
        onChange={handleSwitchChange}
        color="primary"
      />

      <FormRowVertical>
        <Button type="submit">{t("Submit")}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default EditOrganization;
