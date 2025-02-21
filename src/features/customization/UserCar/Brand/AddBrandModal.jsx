import FormRowVertical from "../../../../ui/FormRowVertical";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useCreateManufactures from "./useCreateManufactures";
import FileInput from "../../../../ui/FileInput";

import { useUploader } from "../../../../hooks/useUploader";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Spinner from "../../../../ui/Spinner";
import Form from "../../../../ui/Form";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function AddBrandModal({ onCloseModal }) {
  const { t } = useTranslation();

  const { register, handleSubmit, reset, formState, setValue } = useForm();
  const { errors } = formState;

  const [arName, setArName] = useState();
  const [egName, setEgName] = useState();
  const [logo, setLogo] = useState(null);
  const { addManufacture, isLoading } = useCreateManufactures();
  const { upload } = useUploader();

  const handleFileChange = (setFileState) => async (file) => {
    const uploadData = new FormData();
    setFileState(file);
    setValue(file.name, file);

    uploadData.append("file", file);
    uploadData.append("dir", "manufactures");

    try {
      const response = await upload(uploadData);
      setLogo(response);
    } catch (error) {
      //console.error("Upload failed:", error.message);
    }
  };

  const handleEnglishNameChange = (event) => {
    setEgName(event.target.value);
  };

  const handleArabicNameChange = (event) => {
    setArName(event.target.value);
  };

  useEffect(() => {
    if (logo) {
      // This runs every time profileImage changes
    }
  }, [logo]);

  const onError = (errors) => {};

  const onSubmit = (data) => {
    addManufacture(
      {
        englishName: data.englishName,
        arabicName: data.arabicName,
        logo: logo.path,
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
      <FormRowVertical>
        <StyledLabel htmlFor="logo">{t("Logo")}</StyledLabel>

        <FileInput
          placeholder={t("Logo")}
          id="logo"
          onFileChange={handleFileChange(setLogo)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button type="submit">{t("AddBrand")}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default AddBrandModal;
