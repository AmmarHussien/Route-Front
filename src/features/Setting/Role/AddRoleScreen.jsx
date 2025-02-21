import styled from "styled-components";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Form from "../../../ui/Form";
import FormRowVertical from "../../../ui/FormRowVertical";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import IndeterminateCheckboxWithEdit from "../../../ui/IndeterminateCheckboxWithEdit";
import useGetPermissions from "../useGetPermissions";
import useCreateRole from "./useCreateRole";
import Spinner from "../../../ui/Spinner";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

const Box = styled.div`
  background-color: white;
  margin-top: 10px;
  padding: 2%;
`;

function AddRoleScreen({ onCloseModal }) {
  const { t } = useTranslation();
  const { getPermissions } = useGetPermissions();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { createRoles, isLoading } = useCreateRole();
  const [checkedIds, setCheckedIds] = useState([]);

  const handleCheckedIdsChange = (newCheckedIds) => {
    setCheckedIds(newCheckedIds);
  };

  const [name, setName] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const onError = (errors) => {};

  const onSubmit = (data) => {
    createRoles({
      name: data.name,
      permissions: checkedIds,
    });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Form onSubmit={handleSubmit(onSubmit, onError)} type={"regular"}>
        <FormRowVertical error={errors?.name?.message}>
          <StyledLabel htmlFor="name">{t("Name")}</StyledLabel>
          <Input
            type="text"
            id="name"
            placeholder={t("name")}
            value={name}
            onChange={handleNameChange}
            {...register("name", {
              required: {
                value: true, // This specifies that the field is required
                message: t("name.required"), // Correctly translating the message
              },
              minLength: {
                value: 3,
                message: t("name.minLength"),
              },
              maxLength: {
                value: 20,
                message: t("name.maxLength"),
              },
              validate: {
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z0-9\s]*$/.test(value) ||
                  t("name.noSpecialCharacters"),
                noSQLInjection: (value) =>
                  !/[;'"|#-]/.test(value) || t("name.noSQLInjection"),
              },
            })}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>
        <StyledLabel htmlFor="Permissions">{t("Permissions")}</StyledLabel>
        <IndeterminateCheckboxWithEdit
          data={getPermissions}
          //permissions={permissions}
          onSave={handleCheckedIdsChange}
          isEditable={true}
        />

        <Button type="submit">{t("AddRole")}</Button>
      </Form>
    </Box>
  );
}

export default AddRoleScreen;
