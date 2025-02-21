import { Controller, useForm } from "react-hook-form";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Form from "../../../ui/Form";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import Spinner from "../../../ui/Spinner";
import Button from "../../../ui/Button";
import MultiSelectDropDownMenu from "../../../ui/MultiSelectDropDownMenu";
import FormRow from "../../../ui/FormRow";
import useGetRole from "../Role/useGetRole";

// import toast from "react-hot-toast";
// import Spinner from "../../ui/Spinner";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function EditAdminForm({ onCloseModal, data }) {
  const { name, email, roles } = data;
  const { t } = useTranslation();

  const getRoles =
    roles?.map(({ id, name }) => ({
      id,
      name,
    })) || [];

  const {
    register,
    handleSubmit,
    control,
    //setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name,
      email: email,
      role: [getRoles],
    },
  });
  //const { isLoading: viewLoading, viewAdmins } = useViewAdmin(id);
  const { isLoading: roleLoading, getRole } = useGetRole();

  //console.log(viewAdmins);

  const RolesOptions =
    getRole?.map(({ id, name }) => ({
      id,
      name,
    })) || [];

  const onSubmit = async (data) => {
    // const formData = new FormData();
    // formData.append("first_name", data.firstName);
    // formData.append("last_name", data.lastName);
    // formData.append("email", data.email);
    // formData.append("status", "Approved");
    // data.Role.forEach((roles) => {
    //   formData.append("roles[]", roles); // Note the use of "roles[]" to denote an array
    // });
    // // ✅ Log the FormData
    // console.log("Logging FormData:");
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    // try {
    //   addAdmin(formData, {
    //     onSuccess: () => {
    //       onCloseModal?.();
    //     },
    //   });
    // } catch (error) {
    //   toast.error("Admin Creation failed.", error);
    //   console.log(error);
    // }
  };

  const onError = (errors) => {};
  return roleLoading ? (
    <Spinner />
  ) : (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "grid" : "regular"}
    >
      <FormRowVertical error={errors?.firstName?.message}>
        <StyledLabel htmlFor="firstName"> {t("FirstName")} </StyledLabel>

        <Input
          type="text"
          id="firstName"
          placeholder={t("FirstName")}
          defaultValue="a7eh"
          {...register("firstName", {
            required: {
              value: true,
              message: t("FirstNameValidation.required"),
            },
            minLength: {
              value: 3,
              message: t("FirstNameValidation.minLength"),
            },
            validate: {
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
        <StyledLabel htmlFor="lastName"> {t("lastName")} </StyledLabel>

        <Input
          type="text"
          id="lastName"
          placeholder={t("LastName")}
          {...register("lastName", {
            required: {
              value: true,
              message: t("LastNameValidation.required"),
            },
            minLength: {
              value: 3,
              message: t("LastNameValidation.minLength"),
            },
            validate: {
              noSpecialCharacters: (value) =>
                /^[a-zA-Z0-9\s]*$/.test(value) ||
                t("LastNameValidation.noSpecialCharacters"),
              noSQLInjection: (value) =>
                !/[;'"|#-]/.test(value) ||
                t("LastNameValidation.noSQLInjection"),
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

      <FormRowVertical>
        <StyledLabel htmlFor="Role"> {t("Role")} </StyledLabel>

        <Controller
          name="Role"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectDropDownMenu
              title={t("Role")}
              options={RolesOptions}
              onSelect={onChange} // Update the form state
              selectedOptions={value} // Provide current value to the component
            />
          )}
        />
      </FormRowVertical>

      <FormRow>
        <Button $size="xlarge">{t("Submit")}</Button>
      </FormRow>
    </Form>
  );
}

export default EditAdminForm;
