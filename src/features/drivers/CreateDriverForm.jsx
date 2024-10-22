import { useState, useEffect } from "react";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useForm } from "react-hook-form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useAddDrive } from "./useAddDriver";
import FormRow from "../../ui/FormRow";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Using FontAwesome icons
import DropDownMenu from "../../ui/DropDownMenu";
import useOrganizations from "./useOrganizations";
import Textarea from "../../ui/Textarea";
import useCarType from "./useCarType";
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

function CreateDriverForm({ onCloseModal }) {
  const { register, handleSubmit, setValue, reset, formState, watch } =
    useForm();
  const { errors } = formState;

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const [profileImage, setProfileImage] = useState(null);
  const [driverLicense, setDriverLicense] = useState(null);
  const [vehicleLicense, setVehicleLicense] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [criminalRecord, setCriminalRecord] = useState(null);
  const [nationalId, setNationalId] = useState(null);
  const [towTruckRegistration, setTowTruckRegistration] = useState(null);

  const { isAdded, addDriver } = useAddDrive();

  const isWorking = isAdded;

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility
  const [checkOrganization, setCheckOrganization] = useState(false); // select  organization
  const [selectedOrganization, setSelectedOrganization] = useState();
  const [selectCarType, setSelectCarType] = useState(); // select car to toggle

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle password visibility
  };

  const handleFileChange = (setFileState) => (file) => {
    setFileState(file);
    setValue(file.name, file);
  };

  const { organizations = [] } = useOrganizations();

  const { carType = [] } = useCarType();

  const carTypeOptions = carType?.map(({ id, name }) => ({ id, name })) || [];

  const handleCarTypeSelect = (id) => {
    setSelectCarType(id);
  };

  const organizationsOptions =
    organizations?.map(({ id, name }) => ({
      id,
      name,
    })) || [];

  const handleOrganizationSelect = (id) => {
    setSelectedOrganization(id);
  };

  useEffect(() => {
    if (checkOrganization === false) {
      setSelectedOrganization(null);
    }
  }, [setSelectedOrganization, checkOrganization]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("country_code", "+20");
    formData.append("password_confirmation", data.confirmPassword);
    formData.append("profile_image", profileImage);
    formData.append("driver_license", driverLicense);
    formData.append("vehicle_license", vehicleLicense);
    formData.append("vehicle_image", vehicleImage);
    formData.append("criminal_record", criminalRecord);
    formData.append("national_id", nationalId);
    formData.append("tow_truck_registration", towTruckRegistration);

    if (checkOrganization) {
      formData.append("organization_id", selectedOrganization);
    }

    formData.append("car_type_id", selectCarType);
    formData.append("car_spec", data.car_spec);

    addDriver(formData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  };

  const onError = (errors) => {
    // console.log(errors);
  };

  useEffect(() => {
    if (isAdded) {
    }
  }, [isAdded]); // Dependency array includes `isAdded`

  const password = watch("password");

  return !isAdded ? (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "gridx3" : "regular"}
    >
      <FormRowVertical error={errors?.firstName?.message}>
        <StyledLabel htmlFor="firstName">
          {" "}
          {t("DriverFirstName")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>{" "}
        </StyledLabel>
        <Input
          type="text"
          id="firstName"
          placeholder={t("DriverFirstName")}
          {...register("firstName", {
            required: {
              value: true,
              message: t("FirstNameValidation.required"),
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
        <StyledLabel htmlFor="lastName">
          {t("DriverLastName")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <Input
          placeholder={t("DriverLastName")}
          type="text"
          id="lastName"
          {...register("lastName", {
            required: {
              value: true,
              message: t("LastNameValidation.required"),
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
        <StyledLabel htmlFor="phoneNumber">
          {t("DriverPhoneNumber")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <Input
          placeholder={t("DriverPhoneNumber")}
          type="text"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: {
              value: true,
              message: t("PhoneNumberValidation.required"),
            },
            pattern: {
              value: /^[0-9]+$/,
              message: t("PhoneNumberValidation.pattern"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.email?.message}>
        <StyledLabel htmlFor="email">
          {t("DriverEmail")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <Input
          placeholder={t("DriverEmail")}
          type="email"
          id="email"
          autoComplete="username"
          {...register("email", {
            required: {
              value: true,
              message: t("EmailValidation.required"),
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
          {t("DriverPassword")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <div style={{ position: "relative" }}>
          <Input
            placeholder={t("DriverPassword")}
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            {...register("password", {
              required: {
                value: true,
                message: t("PasswordValidation.required"),
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
        <StyledLabel htmlFor="confirmPassword">
          {t("DriverConfirmPassword")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <div style={{ position: "relative" }}>
          <Input
            placeholder={t("DriverConfirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: t("PasswordValidation.required"),
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
        <StyledLabel htmlFor="car-type">
          {t("DriverCarType")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <DropDownMenu
          title={t("DriverCarType")}
          options={carTypeOptions}
          onSelect={handleCarTypeSelect}
          selectedOption={carTypeOptions.find(
            (option) => option.id === selectCarType
          )}
        />
      </FormRowVertical>

      <FormRowVertical>
        {/* // ✅ Good: controlled checkbox with onChange */}
        <label style={{ display: "flex", alignItems: "center" }}>
          <Input
            type="checkbox"
            checked={checkOrganization}
            onChange={(e) => setCheckOrganization(e.target.checked)}
            style={{
              backgroundColor: "rgb(247, 248, 250)",
              width: "20px",
              height: "20px",
              paddingLeft: "20px",
              marginLeft: "10px",
            }}
          />
          <span style={{ marginLeft: "8px", fontSize: "14px" }}>
            {t("DriverRegistrationOrganization")}
          </span>
        </label>
      </FormRowVertical>

      {checkOrganization === true ? (
        <FormRowVertical>
          <StyledLabel htmlFor="organizations">
            {t("DriverOrganization")}
            <span style={{ color: "red" }} title={t("hint")}>
              *
            </span>
          </StyledLabel>
          <DropDownMenu
            title={t("DriverOrganization")}
            options={organizationsOptions}
            disabled={!checkOrganization}
            onSelect={handleOrganizationSelect}
            selectedOption={organizationsOptions.find(
              (option) => option.id === selectedOrganization
            )}
          />
        </FormRowVertical>
      ) : null}

      <FormRowVertical error={errors?.nationalId?.message}>
        <StyledLabel htmlFor="nationalId">
          {t("DriverNationalId")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <FileInput
          placeholder={t("DriverNationalId")}
          id="nationalId"
          onFileChange={handleFileChange(setNationalId)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.profileImage?.message}>
        <StyledLabel htmlFor="profileImage">
          {t("DriverProfileImage")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <FileInput
          placeholder={t("DriverProfileImage")}
          id="profileImage"
          onFileChange={handleFileChange(setProfileImage)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.driverLicense?.message}>
        <StyledLabel htmlFor="driverLicense">
          {t("DriverLicense")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <FileInput
          placeholder={t("DriverLicense")}
          id="driverLicense"
          onFileChange={handleFileChange(setDriverLicense)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.vehicleLicense?.message}>
        <StyledLabel htmlFor="vehicleLicense">
          {t("DriverVehicleLicense")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <FileInput
          placeholder={t("DriverVehicleLicense")}
          id="vehicleLicense"
          onFileChange={handleFileChange(setVehicleLicense)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.vehicleImage?.message}>
        <StyledLabel htmlFor="vehicleImage">
          {t("DriverVehicleImage")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <FileInput
          placeholder={t("DriverVehicleImage")}
          id="vehicleImage"
          onFileChange={handleFileChange(setVehicleImage)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.criminalRecord?.message}>
        <StyledLabel htmlFor="criminalRecord">
          {" "}
          {t("DriverCriminalRecord")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <FileInput
          placeholder={t("DriverCriminalRecord")}
          id="criminalRecord"
          onFileChange={handleFileChange(setCriminalRecord)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.towTruckRegistration?.message}>
        <StyledLabel htmlFor="towTruckRegistration">
          {t("DriverTowTruckRegistration")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <FileInput
          placeholder={t("DriverTowTruckRegistration")}
          id="towTruckRegistration"
          onFileChange={handleFileChange(setTowTruckRegistration)}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.carSpec?.message}>
        <StyledLabel htmlFor="carSpec">{t("DriverCarSpec")}</StyledLabel>
        <Textarea
          type="text"
          id="carSpec"
          placeholder={t("DriverCarSpec")}
          {...register("carSpec", {
            minLength: {
              value: 10,
              message: t("CarSpecValidation.minLength"),
            },
            maxLength: {
              value: 180,
              message: t("CarSpecValidation.maxLength"),
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      {checkOrganization === false ? <FormRowVertical></FormRowVertical> : null}

      <FormRow>
        <Button $size="xlarge" type="submit" disabled={isWorking}>
          {t("Submit")}
        </Button>
      </FormRow>
    </Form>
  ) : (
    <Spinner />
  );
}

export default CreateDriverForm;
