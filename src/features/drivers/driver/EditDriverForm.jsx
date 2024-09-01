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
  } = driverData;
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

      reset({
        first_name: firstNames,
        last_name: lastNames,
        email,
        car_spec,
      });
    }
  }, [driverData, reset]);

  const onSubmit = (data) => {
    console.log(data);
    try {
      const formData = new FormData();

      // Check if each field is changed; if not, use the default value from driverData
      // Append form data fields
      formData.append("first_name", data.first_name || "");
      formData.append("last_name", data.last_name || "");
      formData.append("email", data.email || "");
      formData.append("car_spec", data.car_spec || "");

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
      type={onCloseModal ? "grid" : "regular"}
    >
      <FormRowVertical error={errors?.firstName?.message}>
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
        <FileInput
          placeholder="National Id"
          id="nationalId"
          onFileChange={handleFileChange(setNationalId)}
          defaultValue={national_id}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Driver Photo"
          id="profileImage"
          onFileChange={handleFileChange(setProfileImage)}
          defaultValue={profile_image}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Driver License Photo"
          id="driverLicense"
          onFileChange={handleFileChange(setDriverLicense)}
          defaultValue={driver_license}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Vehicle License"
          id="vehicleLicense"
          onFileChange={handleFileChange(setVehicleLicense)}
          defaultValue={vehicle_license}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Vehicle Image"
          id="vehicleImage"
          onFileChange={handleFileChange(setVehicleImage)}
          defaultValue={vehicle_image}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Criminal Record"
          id="criminalRecord"
          onFileChange={handleFileChange(setCriminalRecord)}
          defaultValue={criminal_record}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Tow Truck Registration"
          id="towTruckRegistration"
          onFileChange={handleFileChange(setTowTruckRegistration)}
          defaultValue={tow_truck_registration}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.carSpec?.message}>
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

      <FormRow>
        <Button size="xlarge" type="submit">
          Submit
        </Button>
      </FormRow>
    </Form>
  );
}
export default EditDriverForm;
