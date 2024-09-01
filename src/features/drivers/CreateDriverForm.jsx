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

    addDriver(formData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isAdded) {
      // This will run when the driver is successfully added
      console.log("Driver successfully added.");
      // You can trigger additional UI updates here if needed
    }
  }, [isAdded]); // Dependency array includes `isAdded`

  const password = watch("password");

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
          {...register("firstName", {
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
        <FileInput
          placeholder="National Id"
          id="nationalId"
          onFileChange={handleFileChange(setNationalId)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Driver Photo"
          id="profileImage"
          onFileChange={handleFileChange(setProfileImage)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Driver License Photo"
          id="driverLicense"
          onFileChange={handleFileChange(setDriverLicense)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Vehicle License"
          id="vehicleLicense"
          onFileChange={handleFileChange(setVehicleLicense)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Vehicle Image"
          id="vehicleImage"
          onFileChange={handleFileChange(setVehicleImage)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Criminal Record"
          id="criminalRecord"
          onFileChange={handleFileChange(setCriminalRecord)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <FileInput
          placeholder="Tow Truck Registration"
          id="towTruckRegistration"
          onFileChange={handleFileChange(setTowTruckRegistration)}
        />
      </FormRowVertical>

      <FormRow>
        <Button size="xlarge" type="submit" disabled={isWorking}>
          Submit
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateDriverForm;
