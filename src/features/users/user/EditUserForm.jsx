import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import { Button } from "@mui/material";
import FileInput from "../../../ui/FileInput";
import { useForm } from "react-hook-form";
import FormRow from "../../../ui/FormRow";
import DropDownMenu from "../../../ui/DropDownMenu";
import FormRowVertical from "../../../ui/FormRowVertical";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Using FontAwesome icons
import useModel from "../useModel";
import useEditUser from "./useEditUser";
import useUser from "../useUserInfo";
import useManufactures from "../useManufactures";
import { useUploader } from "../../../hooks/useUploader";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function EditUserForm({ onCloseModal }) {
  const { id } = useParams();
  const { userInfo, isLoading: userInfoLoading } = useUser();

  const {
    full_name,
    email,
    phone,
    car: {
      manufacture: { id: manufactureId },
      model: { id: modelId },
      registration_year,
    },
    profile_image,
  } = userInfo;

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { upload } = useUploader();
  const { editUsers, isEditing } = useEditUser();

  const [setFirstName] = useState(""); // Fixed typo here
  const [setLastName] = useState(""); // Fixed typo here
  const [setEmail] = useState(""); // Fixed typo here
  const [setRegistrationYear] = useState(""); // Fixed typo here

  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { manufactures = [] } = useManufactures();
  const [selectedBrand, setSelectedBrand] = useState(manufactureId);
  const [selectedModel, setSelectedModel] = useState(modelId);
  const { models } = useModel(selectedBrand);

  useEffect(() => {
    //console.log("Fetched models:", models); // Log fetched models
  }, [models]);

  useEffect(() => {
    //console.log("Selected model ID updated:", selectedModel);
  }, [selectedModel]);

  const handleBrandSelect = (id) => {
    setSelectedBrand(id);
    //console.log("Selected Brand ID in handler:", id);
    setSelectedModel(null); // Reset model on brand change
  };

  const handleModelSelect = (id) => {
    setSelectedModel(id);
    setValue("model_id", id); // Ensure the form state is updated
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle password visibility
  };

  const handleFileChange = (setFileState) => async (file) => {
    setFileState(file);
    //setValue(file.name, file);

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("dir", "users");

    try {
      const response = await upload(uploadData);
      setProfileImage(response);
    } catch (error) {
      console.error("Upload failed:", error.message);
    }
  };

  useEffect(() => {
    if (profileImage) {
      // This runs every time profileImage changes
      setValue("profile_image", profileImage.path);
    }
    if (selectedModel) {
      // This runs every time profileImage changes
      setValue("model_id", selectedModel);
    }
  }, [profileImage, setValue, selectedModel]);

  const onSubmit = async (data) => {
    try {
      await editUsers(
        { newUserData: data, id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      ); // Ensure correct parameters are passed
    } catch (error) {
      console.error("User update failed:", error.message);
    }
  };

  useEffect(() => {
    if (isEditing || userInfoLoading) {
      // Update the notes state to reflect the addition (already handled above with setNotes)
    }
  }, [isEditing, userInfoLoading]); //

  const onError = (errors) => {
    // console.log("Form errors:", errors);
  };

  const manufactureOptions = manufactures.map(({ id, name }) => ({
    id,
    name,
  }));

  const modelOptions =
    models?.map(({ id, model }) => ({
      id,
      model,
    })) || [];

  const [firstNames, lastNames] = full_name.split(" ");
  const phoneNumber = phone.slice(3);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setValue("first_name", event.target.value); // Update react-hook-form state
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setValue("last_name", event.target.value); // Update react-hook-form state
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setValue("email", event.target.value); // Update react-hook-form state
  };

  const handleRegistrationYearChange = (event) => {
    setRegistrationYear(event.target.value);
    setValue("registration_year", event.target.value); // Update react-hook-form state
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "grid" : "regular"}
    >
      <FormRowVertical error={errors?.first_name?.message}>
        <StyledLabel htmlFor="firstName">{t("UserFirstName")}</StyledLabel>

        <Input
          type="text"
          id="firstName"
          placeholder={t("UserFirstName")}
          defaultValue={firstNames}
          onChange={handleFirstNameChange}
          {...register("first_name", {
            required: {
              value: true, // This specifies that the field is required
              message: t("FirstNameValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 3,
              message: t("FirstNameValidation.minLength"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.last_name?.message}>
        <StyledLabel htmlFor="lastName">{t("UserLastName")}</StyledLabel>

        <Input
          placeholder={t("UserLastName")}
          type="text"
          id="lastName"
          defaultValue={lastNames}
          onChange={handleLastNameChange}
          {...register("last_name", {
            required: {
              value: true, // This specifies that the field is required
              message: t("LastNameValidation.required"), // Correctly translating the message
            },
            minLength: {
              value: 3,
              message: t("LastNameValidation.minLength"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.phoneNumber?.message}>
        <StyledLabel htmlFor="phoneNumber">{t("UserPhoneNumber")}</StyledLabel>

        <Input
          placeholder={t("UserPhoneNumber")}
          type="text"
          id="phoneNumber"
          defaultValue={phoneNumber}
          disabled={true}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.email?.message}>
        <StyledLabel htmlFor="email">{t("UserEmail")}</StyledLabel>

        <Input
          placeholder={t("UserEmail")}
          type="email"
          id="email"
          autoComplete="email"
          defaultValue={email}
          onChange={handleEmailChange}
          {...register("email", {
            required: {
              value: true, // This specifies that the field is required
              message: t("EmailValidation.required"), // Correctly translating the message
            },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: t("EmailValidation.pattern"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.password?.message}>
        <StyledLabel htmlFor="password">{t("UserPassword")}</StyledLabel>

        <div style={{ position: "relative" }}>
          <Input
            placeholder={t("UserPassword")}
            type={showPassword ? "text" : "password"} // Toggle input type based on state
            id="password"
            autoComplete="new-password"
            defaultValue="##########"
            disabled={true}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
          <span
            onClick={handleTogglePassword}
            style={{
              position: "absolute",
              right: isRTL ? "300px" : "35px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      </FormRowVertical>
      <FormRowVertical error={errors?.confirmPassword?.message}>
        <StyledLabel htmlFor="ConfirmPassword">
          {t("UserConfirmPassword")}
        </StyledLabel>

        <div style={{ position: "relative" }}>
          <Input
            placeholder={t("UserConfirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            id="ConfirmPassword"
            autoComplete="new-password"
            defaultValue="##########"
            disabled={true}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
          <span
            onClick={handleToggleConfirmPassword}
            style={{
              position: "absolute",
              right: isRTL ? "300px" : "35px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="UserPhoto">{t("UserPhoto")}</StyledLabel>

        <FileInput
          placeholder={t("UserPhoto")}
          id="UserPhoto"
          onFileChange={handleFileChange(setProfileImage)}
          defaultValue={profile_image}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="carBrand">{t("UserCarBrands")}</StyledLabel>

        <DropDownMenu
          title={t("UserCarBrands")}
          options={manufactureOptions}
          onSelect={handleBrandSelect}
          selectedOption={manufactureOptions.find(
            (option) => option.id === selectedBrand
          )}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="carModels">{t("UserCarModels")}</StyledLabel>

        <DropDownMenu
          title={t("UserCarModels")}
          options={modelOptions}
          onSelect={handleModelSelect}
          disabled={!selectedBrand}
          selectedOption={modelOptions.find(
            (option) => option.id === selectedModel
          )}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.registration_year?.message}>
        <StyledLabel htmlFor="registrationYear">
          {t("UserModelYear")}
        </StyledLabel>

        <Input
          placeholder={t("UserModelYear")}
          type="text"
          id="registrationYear"
          defaultValue={registration_year}
          onChange={handleRegistrationYearChange}
          {...register("registration_year", {
            required: {
              value: true, // This specifies that the field is required
              message: t("ModelYearValidation.required"), // Correctly translating the message
            },
            pattern: {
              value: /^[0-9]+$/,
              message: t("ModelYearValidation.pattern"),
            },
            valueAsNumber: true, // Converts input value to a number
            validate: (value) => {
              const currentYear = new Date().getFullYear(); // Get the current year

              // Check if the value is an integer
              if (!Number.isInteger(value)) {
                return t("ModelYearValidation.pattern"); // Error message for non-integer values
              }

              // Check if the year is not in the future
              if (value > currentYear) {
                return t("ModelYearValidation.checkYear"); // Error message for future years
              }

              return true; // Return true if the validation passes
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>

      <FormRow>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: 139,
            height: 56,
            borderRadius: 5,
            fontSize: 16,
            background: "#005379",
            boxShadow: "0 4px 60px 0 rgba(0, 56, 255, 0.15)", // Updated shadow property
          }}
        >
          {t("Submit")}
        </Button>
      </FormRow>
    </Form>
  );
}

export default EditUserForm;
