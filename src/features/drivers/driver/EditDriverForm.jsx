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
        <StyledLabel htmlFor="firstName">First Name</StyledLabel>
        <Input
          type="text"
          id="firstName"
          placeholder="First Name"
          defaultValue={firstNames}
          onChange={handleChange("first_name")}
          {...register("first_name", {
            required: "First Name is required",
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.lastName?.message}>
        <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
        <Input
          placeholder="Last Name"
          type="text"
          id="lastName"
          defaultValue={lastNames}
          onChange={handleChange("last_name")}
          {...register("last_name", {
            required: "Last Name is required",
            minLength: {
              value: 3,
              message: "Last Name must be at least 3 characters",
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.phoneNumber?.message}>
        <StyledLabel htmlFor="phoneNumber">Phone Number</StyledLabel>
        <Input
          placeholder="Phone Number"
          type="text"
          id="phoneNumber"
          defaultValue={phoneNumber}
          disabled={true}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.email?.message}>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Input
          placeholder="Email"
          type="email"
          id="email"
          defaultValue={email}
          onChange={handleChange("email")}
          autoComplete="username"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Please enter a valid email address",
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.password?.message}>
        <StyledLabel htmlFor="password">Password</StyledLabel>
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
              right: "35px",
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
        <StyledLabel htmlFor="confirmPassword">Confirm Password</StyledLabel>
        <div style={{ position: "relative" }}>
          <Input
            placeholder="Confirm Password"
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
              right: "35px",
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
        <StyledLabel htmlFor="carType">Car Type</StyledLabel>
        <DropDownMenu
          title="Car Type"
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
            Registration with Organization
          </span>
        </label>
      </FormRowVertical>

      {organizationName ? (
        <FormRowVertical>
          <StyledLabel htmlFor="organization">Organization</StyledLabel>
          <Input
            type="text"
            id="organization"
            placeholder="Organization"
            defaultValue={organizationName}
            disabled={true}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
      ) : selectedOrganization === null && checkOrganization === true ? (
        <FormRowVertical>
          <StyledLabel htmlFor="Organizations">Organizations</StyledLabel>
          <DropDownMenu
            title="Organizations"
            options={organizationsOptions}
            onSelect={handleOrganizationSelect}
            selectedOption={organizationsOptions.find(
              (option) => option.id === selectedOrganization
            )}
          />
        </FormRowVertical>
      ) : null}

      <FormRowVertical>
        <StyledLabel htmlFor="nationalId">National Id</StyledLabel>
        <FileInput
          placeholder="National Id"
          id="nationalId"
          onFileChange={handleFileChange(setNationalId)}
          defaultValue={national_id}
        />
      </FormRowVertical>
      <FormRowVertical>
        <StyledLabel htmlFor="profileImage">Driver Photo</StyledLabel>
        <FileInput
          placeholder="Driver Photo"
          id="profileImage"
          onFileChange={handleFileChange(setProfileImage)}
          defaultValue={profile_image}
        />
      </FormRowVertical>
      <FormRowVertical>
        <StyledLabel htmlFor="driverLicense">Driver License</StyledLabel>
        <FileInput
          placeholder="Driver License"
          id="driverLicense"
          onFileChange={handleFileChange(setDriverLicense)}
          defaultValue={driver_license}
        />
      </FormRowVertical>
      <FormRowVertical>
        <StyledLabel htmlFor="vehicleLicense">Vehicle License</StyledLabel>
        <FileInput
          placeholder="Vehicle License"
          id="vehicleLicense"
          onFileChange={handleFileChange(setVehicleLicense)}
          defaultValue={vehicle_license}
        />
      </FormRowVertical>
      <FormRowVertical>
        <StyledLabel htmlFor="vehicleImage">Vehicle Image</StyledLabel>
        <FileInput
          placeholder="Vehicle Image"
          id="vehicleImage"
          onFileChange={handleFileChange(setVehicleImage)}
          defaultValue={vehicle_image}
        />
      </FormRowVertical>
      <FormRowVertical>
        <StyledLabel htmlFor="criminalRecord">Criminal Record</StyledLabel>
        <FileInput
          placeholder="Criminal Record"
          id="criminalRecord"
          onFileChange={handleFileChange(setCriminalRecord)}
          defaultValue={criminal_record}
        />
      </FormRowVertical>
      <FormRowVertical>
        <StyledLabel htmlFor="towTruckRegistration">
          Tow Truck Registration
        </StyledLabel>
        <FileInput
          placeholder="Tow Truck Registration"
          id="towTruckRegistration"
          onFileChange={handleFileChange(setTowTruckRegistration)}
          defaultValue={tow_truck_registration}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.carSpec?.message}>
        <StyledLabel htmlFor="carSpec">Car Spec</StyledLabel>
        <Textarea
          type="text"
          id="carSpec"
          placeholder="Car Spec"
          defaultValue={car_spec}
          onChange={handleChange("car_spec")}
          {...register("car_spec", {
            maxLength: {
              value: 180,
              message: "Car Spec must be at Most 180 characters",
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
