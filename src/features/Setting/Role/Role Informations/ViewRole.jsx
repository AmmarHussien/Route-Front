import { useParams } from "react-router-dom";
import useViewRole from "../useViewRole";
import Spinner from "../../../../ui/Spinner";
import useGetPermissions from "../../useGetPermissions";
import IndeterminateCheckboxWithEdit from "../../../../ui/IndeterminateCheckboxWithEdit";
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
import useEditRole from "./useEditRole";
import { useForm } from "react-hook-form";

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

function ViewRole() {
  const { id } = useParams();
  const moveBack = useMoveBack();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const { getPermissions } = useGetPermissions();
  const { viewRole, isLoading } = useViewRole(id); // ✅ Add refetch function

  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  const [isEditable, setIsEditable] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);

  const { editRole } = useEditRole();

  // ✅ Sync `checkedIds` when `viewRole.permissions` changes
  useEffect(() => {
    if (viewRole?.permissions) {
      const newCheckedIds = viewRole.permissions.map((p) => p.id);
      setCheckedIds(newCheckedIds);
    }
  }, [viewRole]); // ✅ Re-run effect when `viewRole` updates

  const handleCheckedIdsChange = (newCheckedIds) => {
    setCheckedIds(newCheckedIds);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const permissions = viewRole.permissions;
  const data = getPermissions;

  // ✅ Ensure UI updates after saving by re-fetching latest data
  const onSubmit = async (data) => {
    await editRole({
      name: data.Name,
      permissions: checkedIds,
    });

    setIsEditable(false); // ✅ Hide unchecked checkboxes after saving
  };

  // ✅ Single Button for "Edit & Show All" + "Save"
  const toggleEditAndShowAll = () => {
    if (isEditable) {
      handleSubmit(onSubmit)(); // ✅ Submit when clicking "Save"
    } else {
      setIsEditable(true); // ✅ Show all checkboxes when clicking "Edit"
    }
  };

  return (
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

      <Form onSubmit={handleSubmit(onSubmit)} type="grid">
        <FormRowVertical error={errors?.Name?.message}>
          <StyledLabel htmlFor="Name">{t("Name")}</StyledLabel>
          <Input
            type="text"
            id="Name"
            placeholder="Name"
            defaultValue={viewRole.name}
            disabled={!isEditable}
            {...register("Name", {
              required: { value: true, message: t("englishName.required") },
              minLength: { value: 3, message: t("englishName.minLength") },
              maxLength: { value: 20, message: t("englishName.maxLength") },
              validate: {
                noSpecialCharacters: (value) =>
                  /^[a-zA-Z0-9\s]*$/.test(value) ||
                  t("englishName.noSpecialCharacters"),
                noSQLInjection: (value) =>
                  !/[;'"|#-]/.test(value) || t("englishName.noSQLInjection"),
              },
            })}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>

        <FormRowVertical>
          <StyledLabel htmlFor="ID">{t("Id")}</StyledLabel>
          <Input
            type="Number"
            id="ID"
            placeholder="Id"
            disabled
            defaultValue={viewRole.id}
            $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
          />
        </FormRowVertical>

        <StyledLabel htmlFor="Permissions">{t("Permissions")}</StyledLabel>
      </Form>

      <IndeterminateCheckboxWithEdit
        data={data}
        permissions={permissions}
        onSave={handleCheckedIdsChange}
        isEditable={isEditable}
      />
    </Box>
  );
}

export default ViewRole;
