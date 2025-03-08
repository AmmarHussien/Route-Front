import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import useCreateModel from "./useCreateModel";
import { useTranslation } from "react-i18next";
import Spinner from "../../../../ui/Spinner";
import Form from "../../../../ui/Form";
import { useForm } from "react-hook-form";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function AddCarModel({ onCloseModal }) {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const [arName, setArName] = useState();
  const [egName, setEgName] = useState();

  const { createModel, isLoading } = useCreateModel();

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };
  const onError = (errors) => {};

  const onSubmit = (data) => {
    createModel(
      {
        englishName: data.englishName,
        arabicName: data.arabicName,
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
      <Form onSubmit={handleSubmit(onSubmit, onError)} type={"regular"}>
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
                  /^[^\s]+$/.test(value) ||
                  t("arabicNameValidation.singleWord"),
                // noSpecialCharacters: (value) =>
                //   /^[a-zA-Z0-9\s]*$/.test(value) ||
                //   t("arabicName.noSpecialCharacters"),
                noSQLInjection: (value) =>
                  !/[;'"|#-]/.test(value) ||
                  t("arabicNameValidation.noSQLInjection"),
                arabicValidation: (value) =>
                  /^[\u0600-\u06FF\s]+$/.test(value) ||
                  t("arabicName.arabicOnly"),
              },
            })}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button type="submit">{t("AddModel")}</Button>
        </FormRowVertical>
      </Form>
    </>
  );
}

export default AddCarModel;
