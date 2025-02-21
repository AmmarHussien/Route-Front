import { useParams } from "react-router-dom";
import Spinner from "../../../../ui/Spinner";
import { useEffect, useState } from "react";
import Row from "../../../../ui/Row";
import Button from "../../../../ui/Button";
import { useMoveBack } from "../../../../hooks/useMoveBack";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Input from "../../../../ui/Input";
import Form from "../../../../ui/Form";
import FormRowVertical from "../../../../ui/FormRowVertical";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useViewAdmin from "../useViewAdmin";
import useGetRole from "../../Role/useGetRole";
import RoleCheckboxList from "./RoleCheckBoxList";
import useEditAdmin from "./useEditAdmin";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
`;

const Box = styled.div`
  background-color: white;
  margin-top: 10px;
  padding: 2%;
`;

function ViewAdmin() {
  const { id } = useParams();
  const moveBack = useMoveBack();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { isLoading, viewAdmin } = useViewAdmin(id);
  const { getRole, isLoading: roleLoading } = useGetRole();

  const { register, formState, handleSubmit, setValue } = useForm({
    defaultValues: {
      FirstName: viewAdmin?.name?.split(" ")[0] || "",
      LastName: viewAdmin?.name?.split(" ")[1] || "",
      email: viewAdmin?.email || "",
      status: viewAdmin?.status || "",
    },
  });
  const { errors } = formState;

  const [isEditable, setIsEditable] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const { editAdmin } = useEditAdmin();

  useEffect(() => {
    if (viewAdmin) {
      const [firstNames, lastNames] = viewAdmin.name.split(" ");
      setValue("FirstName", firstNames);
      setValue("LastName", lastNames);
      setValue("email", viewAdmin.email);
      setValue("status", viewAdmin.status);
    }
  }, [viewAdmin, setValue]);

  if (roleLoading) {
    return <Spinner />;
  }

  const RolesCheckBox =
    getRole?.map(({ id, name }) => ({
      id,
      name,
    })) || [];

  // ✅ Single Button for "Edit & Show All" + "Save"
  const toggleEditAndShowAll = () => {
    if (isEditable) {
      handleSubmit(onSubmit)(); // ✅ Submit when clicking "Save"
    } else {
      setIsEditable(true); // ✅ Show all checkboxes when clicking "Edit"
    }
  };

  // Function to handle role selection changes and store only role IDs
  const handleSelectedRolesChange = (updatedCheckedIds) => {
    setSelectedRoles(updatedCheckedIds); // ✅ Directly store array of role IDs
  };

  const onSubmit = async (data) => {
    console.log(data);
    await editAdmin({
      first_name: data.FirstName,
      last_name: data.LastName,
      email: data.email,
      status: data.status,
      roles: selectedRoles,
    });

    setIsEditable(false); // ✅ Hide unchecked checkboxes after saving
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Row type={"horizontal"}>
        <Button onClick={moveBack}>
          {isRTL ? (
            <ArrowForwardIcon fontSize="large" />
          ) : (
            <ArrowBackIcon fontSize="large" />
          )}
        </Button>

        {/* ✅ Single Button for Edit & Save */}
        <Button onClick={toggleEditAndShowAll}>
          {isEditable ? t("Save") : t("Edit")}
        </Button>
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)} type="gridx3">
        <FormRowVertical>
          <StyledLabel htmlFor="ID">{t("Id")}</StyledLabel>
          <Input
            type="Number"
            id="ID"
            placeholder="Id"
            disabled
            defaultValue={viewAdmin.id}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical error={errors?.FirstName?.message}>
          <StyledLabel htmlFor="FirstName">{t("FirstName")}</StyledLabel>
          <Input
            type="text"
            id="FirstName"
            placeholder="FirstName"
            disabled={!isEditable}
            {...register("FirstName", {
              required: { value: true, message: t("FirstName.required") },
              minLength: { value: 3, message: t("FirstName.minLength") },
              maxLength: { value: 20, message: t("FirstName.maxLength") },
              validate: {
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z0-9\s]*$/.test(value) ||
                  t("FirstName.noSpecialCharacters"),
                noSQLInjection: (value) =>
                  !/[;'"|#-]/.test(value) || t("FirstName.noSQLInjection"),
              },
            })}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical error={errors?.LastName?.message}>
          <StyledLabel htmlFor="LastName">{t("LastName")}</StyledLabel>
          <Input
            type="text"
            id="LastName"
            placeholder="LastName"
            disabled={!isEditable}
            {...register("LastName", {
              required: { value: true, message: t("LastName.required") },
              minLength: { value: 3, message: t("LastName.minLength") },
              maxLength: { value: 20, message: t("LastName.maxLength") },
              validate: {
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z0-9\s]*$/.test(value) ||
                  t("LastName.noSpecialCharacters"),
                noSQLInjection: (value) =>
                  !/[;'"|#-]/.test(value) || t("LastName.noSQLInjection"),
              },
            })}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>

        <FormRowVertical error={errors?.email?.message}>
          <StyledLabel htmlFor="email">{t("email")}</StyledLabel>
          <Input
            type="email"
            id="email"
            placeholder="email"
            disabled
            defaultValue={viewAdmin.email}
            {...register("email")}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>

        <FormRowVertical error={errors?.status?.message}>
          <StyledLabel htmlFor="status">{t("Status")}</StyledLabel>
          <Input
            type="text"
            id="status"
            placeholder="status"
            disabled={!isEditable}
            defaultValue={viewAdmin.status}
            {...register("status")}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <FormRowVertical></FormRowVertical>

        <StyledLabel htmlFor="Roles">{t("Roles")}</StyledLabel>
      </Form>

      <RoleCheckboxList
        roles={RolesCheckBox}
        selectedRoles={viewAdmin.roles}
        onSave={handleSelectedRolesChange}
        isEditable={isEditable} // Pass a boolean based on your edit state
      />
    </Box>
  );
}

export default ViewAdmin;
