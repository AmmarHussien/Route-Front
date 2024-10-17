import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import DropDownMenu from "../../ui/DropDownMenu";
import FormRowVertical from "../../ui/FormRowVertical";
import { useEffect, useState } from "react";
import { useAddUser } from "./useAddUser";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Using FontAwesome icons
import useManufactures from "./useManufactures";
import useModel from "./useModel";
import { useUploader } from "../../hooks/useUploader";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function CreateUserForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const { upload } = useUploader();
  const { isAdded, addUser } = useAddUser();

  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedModel, setSelectedModel] = useState();

  const { isLoading, manufactures } = useManufactures();

  const { models } = useModel(selectedBrand);

  const password = watch("password");

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const handleBrandSelect = (id) => {
    setSelectedBrand(id);
    setSelectedModel(null); // Reset model on brand change
  };

  const handleModelSelect = (id) => {
    setSelectedModel(id);
  };

  useEffect(() => {}, [selectedBrand, models]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle password visibility
  };

  const handleFileChange = (setFileState) => async (file) => {
    const uploadData = new FormData();
    setFileState(file);
    setValue(file.name, file);

    uploadData.append("file", file);
    uploadData.append("dir", "users");

    try {
      const response = await upload(uploadData);
      setProfileImage(response);
    } catch (error) {
      //console.error("Upload failed:", error.message);
    }
  };

  useEffect(() => {
    if (profileImage) {
      // This runs every time profileImage changes
    }
  }, [profileImage]);

  useEffect(() => {
    if (isAdded) {
      // Update the notes state to reflect the addition (already handled above with setNotes)
    }
  }, [isAdded]); //

  const onError = (errors) => {};

  const manufactureOptions = manufactures?.map(({ id, name }) => ({
    id,
    name,
  }));

  const modelOptions =
    models?.map(({ id, model }) => ({
      id,
      model,
    })) || [];

  const onSubmit = async (data) => {
    const formData = new FormData();
    const imagePath = profileImage ? profileImage.path : "";

    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("country_code", "+20");
    formData.append("password_confirmation", data.confirmPassword);
    formData.append("model_id", selectedModel);
    formData.append("registration_year", data.registrationYear);
    formData.append("profile_image", imagePath);

    try {
      addUser(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } catch (error) {
      toast("User addition failed:", error.message);
    }
  };

  return !isAdded ? (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "grid" : "regular"}
    >
      <FormRowVertical error={errors?.firstName?.message}>
        <StyledLabel htmlFor="firstName">{t("UserFirstName")}</StyledLabel>
        <Input
          type="text"
          id="firstName"
          placeholder={t("UserFirstName")}
          {...register("firstName", {
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
      <FormRowVertical error={errors?.lastName?.message}>
        <StyledLabel htmlFor="lastName">{t("UserLastName")}</StyledLabel>
        <Input
          placeholder={t("UserLastName")}
          type="text"
          id="lastName"
          {...register("lastName", {
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
          {...register("phoneNumber", {
            required: {
              value: true, // This specifies that the field is required
              message: t("PhoneNumberValidation.required"), // Correctly translating the message
            },
            pattern: {
              value: /^[0-9]{10}$/,
              message: t("PhoneNumberValidation.pattern"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.email?.message}>
        <StyledLabel htmlFor="email">{t("UserEmail")}</StyledLabel>
        <Input
          placeholder={t("UserEmail")}
          type="email"
          id="email"
          autoComplete="username"
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
            {...register("password", {
              required: {
                value: true, // This specifies that the field is required
                message: t("PasswordValidation.required"), // Correctly translating the message
              },
              minLength: {
                value: 8,
                message: t("PasswordValidation.minLength"),
              },
              maxLength: {
                value: 20,
                message: t("PasswordValidation.maxLength"),
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{6,}$/,
                message: t("PasswordValidation.pattern"),
              },
            })}
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
        </StyledLabel>{" "}
        <div style={{ position: "relative" }}>
          <Input
            placeholder={t("UserConfirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            id="ConfirmPassword"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: {
                value: true, // This specifies that the field is required
                message: t("PasswordValidation.required"), // Correctly translating the message
              },
              validate: (value) =>
                value === password || t("PasswordValidation.notMatch"),
            })}
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
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="carBrand">{t("UserCarBrands")}</StyledLabel>
        <DropDownMenu
          title={t("UserCarBrands")}
          options={manufactureOptions}
          onSelect={handleBrandSelect}
          disabled={isLoading}
          selectedOption={manufactureOptions?.find(
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
          disabled={isLoading || !selectedBrand}
          selectedOption={modelOptions?.find(
            (option) => option.id === selectedModel
          )}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.registrationYear?.message}>
        <StyledLabel htmlFor="registrationYear">
          {t("UserModelYear")}
        </StyledLabel>
        <Input
          placeholder={t("UserModelYear")}
          type="text"
          id="registrationYear"
          {...register("registrationYear", {
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
          disabled={isAdded || isLoading}
          $size="xlarge"
          variation={"primary"}
        >
          {t("Submit")}
        </Button>
      </FormRow>
    </Form>
  ) : (
    <Spinner />
  );
}

export default CreateUserForm;
