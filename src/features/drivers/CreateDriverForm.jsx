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
      // This will run when the driver is successfully added
      //console.log("Driver successfully added.");
      // You can trigger additional UI updates here if needed
    }
  }, [isAdded]); // Dependency array includes `isAdded`

  const password = watch("password");

  return !isAdded ? (
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
          {...register("firstName", {
            required: "First Name is required",
            minLength: {
              value: 3,
              message: "First Name must be at least 3 characters",
            },
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
          {...register("lastName", {
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
          {...register("phoneNumber", {
            required: "Phone Number is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Phone Number must be numeric",
            },
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.email?.message}>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Input
          placeholder="Email"
          type="email"
          id="email"
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
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{6,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
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
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
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
        <StyledLabel htmlFor="car-type">Car Type</StyledLabel>
        <DropDownMenu
          title="Car-Type"
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
            Registration with Organization
          </span>
        </label>
      </FormRowVertical>

      {checkOrganization === true ? (
        <FormRowVertical>
          <StyledLabel htmlFor="organizations">Organizations</StyledLabel>
          <DropDownMenu
            title="Organizations"
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
        <StyledLabel htmlFor="nationalId">National Id</StyledLabel>
        <FileInput
          placeholder="National Id"
          id="nationalId"
          onFileChange={handleFileChange(setNationalId)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.profileImage?.message}>
        <StyledLabel htmlFor="profileImage">Profile Image</StyledLabel>
        <FileInput
          placeholder="Driver Photo"
          id="profileImage"
          onFileChange={handleFileChange(setProfileImage)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.driverLicense?.message}>
        <StyledLabel htmlFor="driverLicense">Driver License</StyledLabel>
        <FileInput
          placeholder="Driver License"
          id="driverLicense"
          onFileChange={handleFileChange(setDriverLicense)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.vehicleLicense?.message}>
        <StyledLabel htmlFor="vehicleLicense">Vehicle License</StyledLabel>
        <FileInput
          placeholder="Vehicle License"
          id="vehicleLicense"
          onFileChange={handleFileChange(setVehicleLicense)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.vehicleImage?.message}>
        <StyledLabel htmlFor="vehicleImage">Vehicle Image</StyledLabel>
        <FileInput
          placeholder="Vehicle Image"
          id="vehicleImage"
          onFileChange={handleFileChange(setVehicleImage)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.criminalRecord?.message}>
        <StyledLabel htmlFor="criminalRecord">Criminal Record</StyledLabel>
        <FileInput
          placeholder="Criminal Record"
          id="criminalRecord"
          onFileChange={handleFileChange(setCriminalRecord)}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.towTruckRegistration?.message}>
        <StyledLabel htmlFor="towTruckRegistration">
          Tow Truck Registration
        </StyledLabel>
        <FileInput
          placeholder="Tow Truck Registration"
          id="towTruckRegistration"
          onFileChange={handleFileChange(setTowTruckRegistration)}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.carSpec?.message}>
        <StyledLabel htmlFor="carSpec">Car Spec</StyledLabel>
        <Textarea
          type="text"
          id="carSpec"
          placeholder="Car Spec"
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
        <Button $size="xlarge" type="submit" disabled={isWorking}>
          Submit
        </Button>
      </FormRow>
    </Form>
  ) : (
    <Spinner />
  );
}

export default CreateDriverForm;
