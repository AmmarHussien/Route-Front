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
  const { isLoading, manufactures = [] } = useManufactures();
  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const { models } = useModel(selectedBrand);

  const password = watch("password");

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

  useEffect(() => {
    if (isAdded) {
      // Update the notes state to reflect the addition (already handled above with setNotes)
    }
  }, [isAdded]); //

  const onError = (errors) => {
    toast("Form errors:", errors);
  };

  const manufactureOptions = manufactures.map(({ id, manufacture }) => ({
    id,
    name: manufacture,
  }));

  const modelOptions =
    models?.map(({ id, model }) => ({
      id,
      model,
    })) || [];

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
          sx={{ backgroundColor: "rgb(247, 248, 250)" }}
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
          sx={{ backgroundColor: "rgb(247, 248, 250)" }}
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
              value: /^[0-9]{10}$/,
              message: "Phone Number must be 10 numeric",
            },
          })}
          sx={{ backgroundColor: "rgb(247, 248, 250)" }}
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
          sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>
      <FormRowVertical error={errors?.password?.message}>
        <div style={{ position: "relative" }}>
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"} // Toggle input type based on state
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
            sx={{ backgroundColor: "rgb(247, 248, 250)" }}
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
        {" "}
        <div style={{ position: "relative" }}>
          <Input
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="ConfirmPassword"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            sx={{ backgroundColor: "rgb(247, 248, 250)" }}
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
          placeholder="User Photo (optional)"
          id="UserPhoto"
          onFileChange={handleFileChange(setProfileImage)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <DropDownMenu
          title="Car brands"
          options={manufactureOptions}
          onSelect={handleBrandSelect}
          disabled={isLoading}
          selectedOption={manufactureOptions.find(
            (option) => option.id === selectedBrand
          )}
        />
      </FormRowVertical>

      <FormRowVertical>
        <DropDownMenu
          title="Car Models"
          options={modelOptions}
          onSelect={handleModelSelect}
          disabled={isLoading || !selectedBrand}
          selectedOption={modelOptions.find(
            (option) => option.id === selectedModel
          )}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.registrationYear?.message}>
        <Input
          placeholder="Model Year"
          type="text"
          id="registrationYear"
          {...register("registrationYear", {
            required: "Model year is required",
            pattern: {
              value: /^[0-9]+$/,
              message: " Model year must be numeric",
            },
            valueAsNumber: true, // Converts input value to a number
            validate: (value) =>
              Number.isInteger(value) || "Registration year must be an integer",
          })}
          sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>

      <FormRow>
        <Button disabled={isAdded || isLoading} size="xlarge">
          Submit
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;
