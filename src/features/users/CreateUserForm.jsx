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
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYearModel, setSelectedYearModel] = useState();

  const { isLoading, manufactures } = useManufactures();

  const { models } = useModel(selectedBrand);

  const password = watch("password");

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1999 },
    (_, index) => 2000 + index
  );

  const yearOptions = years.map((year) => ({
    id: year,
    name: year.toString(),
  }));

  const handleBrandSelect = (id) => {
    setSelectedBrand(id);
    setSelectedModel(null); // Reset model on brand change
  };

  const handleModelYearSelect = (id) => {
    setSelectedYearModel(id);
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
    if (selectedBrand) {
      // This runs every time profileImage changes
    }
  }, [selectedBrand]);

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
    formData.append("registration_year", selectedYearModel);
    formData.append("profile_image", imagePath);

    try {
      addUser(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } catch (error) {
      toast(error.message);
    }
  };

  return !isAdded ? (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "grid" : "regular"}
    >
      <FormRowVertical error={errors?.firstName?.message}>
        <StyledLabel htmlFor="firstName">
          {t("UserFirstName")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
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
            maxLength: {
              value: 20,
              message: t("FirstNameValidation.maxLength"),
            },
            validate: {
              singleWord: (value) =>
                /^[^\s]+$/.test(value) || t("FirstNameValidation.singleWord"),
              noSpecialCharacters: (value) =>
                /^[a-zA-Z0-9\s]*$/.test(value) ||
                t("FirstNameValidation.noSpecialCharacters"),
              noSQLInjection: (value) =>
                !/[;'"|#-]/.test(value) ||
                t("FirstNameValidation.noSQLInjection"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.lastName?.message}>
        <StyledLabel htmlFor="lastName">
          {t("UserLastName")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
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
            maxLength: {
              value: 20,
              message: t("LastNameValidation.maxLength"),
            },
            validate: {
              singleWord: (value) =>
                /^[^\s]+$/.test(value) || t("LastNameValidation.singleWord"),
              noSpecialCharacters: (value) =>
                /^[a-zA-Z0-9\s]*$/.test(value) ||
                t("FirstNameValidation.noSpecialCharacters"),
              noSQLInjection: (value) =>
                !/[;'"|#-]/.test(value) ||
                t("FirstNameValidation.noSQLInjection"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.phoneNumber?.message}>
        <StyledLabel htmlFor="phoneNumber">
          {t("UserPhoneNumber")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
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
        <StyledLabel htmlFor="email">
          {t("UserEmail")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
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
        <StyledLabel htmlFor="password">
          {t("UserPassword")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
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
          {t("UserConfirmPassword")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
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

      <FormRowVertical error={errors?.hiddenCarBrand?.message}>
        <StyledLabel htmlFor="carBrand">
          {t("UserCarBrands")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <DropDownMenu
          id="carBrand"
          title={t("UserCarBrands")}
          options={manufactureOptions}
          onSelect={handleBrandSelect}
          disabled={isLoading}
          selectedOption={manufactureOptions?.find(
            (option) => option.id === selectedBrand
          )}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.carModel?.message}>
        <StyledLabel htmlFor="carModels">
          {" "}
          {t("UserCarModels")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <DropDownMenu
          id="carModels"
          title={t("UserCarModels")}
          options={modelOptions}
          onSelect={handleModelSelect}
          disabled={isLoading || !selectedBrand || modelOptions.length <= 0}
          selectedOption={modelOptions?.find(
            (option) => option.id === selectedModel
          )}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.registrationYear?.message}>
        <StyledLabel htmlFor="registrationYear">
          {t("UserModelYear")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <DropDownMenu
          title={t("UserModelYear")}
          options={yearOptions}
          onSelect={handleModelYearSelect}
          selectedOption={yearOptions?.find(
            (option) => option.id === selectedYearModel
          )}
        />
      </FormRowVertical>

      <FormRow>
        <Button
          disabled={isAdded || isLoading}
          $size="xlarge"
          $variation={"primary"}
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
