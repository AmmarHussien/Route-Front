import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../../ui/FormRow";

import Button from "../../../ui/Button";
import { useEffect, useState } from "react";
import FormRowVertical from "../../../ui/FormRowVertical";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FileInput from "../../../ui/FileInput";
import useDriver from "./useDriver";
import { useParams } from "react-router-dom";
import Textarea from "../../../ui/Textarea";
import useEditDriver from "./useEditDriver";
import DropDownMenu from "../../../ui/DropDownMenu";
import useOrganizations from "../useOrganizations";
import useCarType from "../useCarType";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function EditDriverForm({ onCloseModal }) {
  const { userId } = useParams();
  const { driverData } = useDriver(userId);
  const { isEditing, editDrivers } = useEditDriver();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const {
    full_name,
    email,
    phone,
    profile_image,
    driver_license,
    national_id,
    tow_truck_registration,
    vehicle_image,
    vehicle_license,
    criminal_record,
    car_spec,
    organization: {
      id: organizationId = null, // Fallback to null if organization or id is undefined
      name: organizationName = "Unknown Organization", // Fallback to a default name
    } = {}, // Fallback to empty object if organization is undefined organization: { id: organizationId, name: organizationName },
    car_type: { id: carTypeId, name: carTypeName },
  } = driverData || {};
  const { register, handleSubmit, setValue, reset, formState } = useForm();
  const { errors } = formState;

  const [profileImage, setProfileImage] = useState(null);
  const [driverLicense, setDriverLicense] = useState(null);
  const [vehicleLicense, setVehicleLicense] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [criminalRecord, setCriminalRecord] = useState(null);
  const [nationalId, setNationalId] = useState(null);
  const [towTruckRegistration, setTowTruckRegistration] = useState(null);

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility

  const [checkOrganization, setCheckOrganization] = useState(); // State to toggle organization visibility
  const [selectedOrganization, setSelectedOrganization] = useState();

  const { organizations = [] } = useOrganizations();
  const [selectCarType, setSelectCarType] = useState(); // select car to toggle

  const { carType = [] } = useCarType();

  const organizationsOptions =
    organizations?.map(({ id, name }) => ({
      id,
      name,
    })) || [];

  const carTypeOptions = carType?.map(({ id, name }) => ({ id, name })) || [];

  const handleCarTypeSelect = (id) => {
    setSelectCarType(id);
  };

  const handleOrganizationSelect = (id) => {
    setSelectedOrganization(id);
  };

  useEffect(() => {
    if (checkOrganization === false) {
      setSelectedOrganization(null);
    }
  }, [setSelectedOrganization, checkOrganization]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle password visibility
  };

  const handleFileChange = (setFileState) => (file) => {
    setFileState({ file });
    setValue(file?.name, file);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isEditing) {
      // This will run when the driver is successfully added
      // You can trigger additional UI updates here if needed
    }
  }, [isEditing]); // Dependency array includes `isAdded`

  const phoneNumber = phone.slice(3);

  const handleChange = (fieldName) => (event) => {
    const value = event.target.value;
    setValue(fieldName, value);
  };
  const [firstNames, lastNames] = full_name.split(" ");

  useEffect(() => {
    if (driverData) {
      const { full_name, email, car_spec } = driverData;
      const [firstNames, lastNames] = full_name.split(" ");

      if (organizationName) {
        // carTypeName has a value
        setSelectedOrganization(organizationId);
      }

      if (carTypeName) {
        // carTypeName has a value
        setSelectCarType(carTypeId);
      }

      reset({
        first_name: firstNames,
        last_name: lastNames,
        email,
        car_spec,
      });
    }
  }, [
    driverData,
    reset,
    setSelectedOrganization,
    organizationId,
    organizationName,
    setSelectCarType,
    carTypeId,
    carTypeName,
  ]);

  const onSubmit = (data) => {
    try {
      const formData = new FormData();

      // Check if each field is changed; if not, use the default value from driverData
      // Append form data fields
      formData.append("first_name", data.first_name || "");
      formData.append("last_name", data.last_name || "");
      formData.append("email", data.email || "");
      formData.append("car_spec", data.car_spec || "");
      formData.append("organization_id", selectedOrganization);
      formData.append("car_type_id", selectCarType);

      // Append files if they exist
      if (profileImage) formData.append("profile_image", profileImage.file);
      if (driverLicense) formData.append("driver_license", driverLicense.file);
      if (vehicleLicense)
        formData.append("vehicle_license", vehicleLicense.file);
      if (vehicleImage) formData.append("vehicle_image", vehicleImage.file);
      if (criminalRecord)
        formData.append("criminal_record", criminalRecord.file);
      if (towTruckRegistration)
        formData.append("tow_truck_registration", towTruckRegistration.file);
      if (nationalId) formData.append("national_id", nationalId.file);
      // Pass formData instead of the plain data object
      editDrivers(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } catch (error) {
      console.error("Driver update failed:", error.message);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "gridx3" : "regular"}
    >
      <FormRowVertical error={errors?.firstName?.message}>
        <StyledLabel htmlFor="firstName">
          {t("DriverFirstName")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <Input
          type="text"
          id="firstName"
          placeholder={t("DriverFirstName")}
          defaultValue={firstNames}
          onChange={handleChange("first_name")}
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
          defaultValue={lastNames}
          onChange={handleChange("last_name")}
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
          {" "}
          {t("DriverPhoneNumber")}{" "}
          <span style={{ color: "red" }} title={t("hint")}>
            *
          </span>
        </StyledLabel>
        <Input
          placeholder={t("DriverPhoneNumber")}
          type="text"
          id="phoneNumber"
          defaultValue={phoneNumber}
          disabled={true}
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
          defaultValue={email}
          onChange={handleChange("email")}
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
            placeholder="Password"
            type={showPassword ? "text" : "password"}
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
        <StyledLabel htmlFor="carType">
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
            checked={
              selectedOrganization === null
                ? checkOrganization
                : !checkOrganization
            }
            onChange={(e) => setCheckOrganization(e.target.checked)}
            disabled={organizationName === null ? false : true}
            style={{
              backgroundColor: "rgb(247, 248, 250)",
              width: "20px",
              height: "20px",
              paddingLeft: "20px",
              marginLeft: "10px",
            }}
          />
          <span style={{ marginLeft: "8px", fontSize: "14px" }}>
            {t("DriverRegistrationOrganization")}{" "}
            <span style={{ color: "red" }} title={t("hint")}>
              *
            </span>
          </span>
        </label>
      </FormRowVertical>

      {organizationName ? (
        <FormRowVertical>
          <StyledLabel htmlFor="organization">
            {t("DriverOrganization")}{" "}
            <span style={{ color: "red" }} title={t("hint")}>
              *
            </span>
          </StyledLabel>
          <Input
            type="text"
            id="organization"
            placeholder={t("DriverOrganization")}
            defaultValue={organizationName}
            disabled={true}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
      ) : selectedOrganization === null && checkOrganization === true ? (
        <FormRowVertical>
          <StyledLabel htmlFor="Organizations">
            {" "}
            {t("DriverOrganization")}{" "}
            <span style={{ color: "red" }} title={t("hint")}>
              *
            </span>
          </StyledLabel>
          <DropDownMenu
            title={t("DriverOrganization")}
            options={organizationsOptions}
            onSelect={handleOrganizationSelect}
            selectedOption={organizationsOptions.find(
              (option) => option.id === selectedOrganization
            )}
          />
        </FormRowVertical>
      ) : null}

      <FormRowVertical>
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
          defaultValue={national_id}
        />
      </FormRowVertical>
      <FormRowVertical>
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
          defaultValue={profile_image}
        />
      </FormRowVertical>
      <FormRowVertical>
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
          defaultValue={driver_license}
        />
      </FormRowVertical>
      <FormRowVertical>
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
          defaultValue={vehicle_license}
        />
      </FormRowVertical>
      <FormRowVertical>
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
          defaultValue={vehicle_image}
        />
      </FormRowVertical>
      <FormRowVertical>
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
          defaultValue={criminal_record}
        />
      </FormRowVertical>
      <FormRowVertical>
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
          defaultValue={tow_truck_registration}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.carSpec?.message}>
        <StyledLabel htmlFor="carSpec">{t("DriverCarSpec")}</StyledLabel>
        <Textarea
          type="text"
          id={t("DriverCarSpec")}
          placeholder="Car Spec"
          defaultValue={car_spec}
          onChange={handleChange("car_spec")}
          {...register("car_spec", {
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
        <Button $size="xlarge" type="submit">
          Submit
        </Button>
      </FormRow>
    </Form>
  );
}
export default EditDriverForm;
