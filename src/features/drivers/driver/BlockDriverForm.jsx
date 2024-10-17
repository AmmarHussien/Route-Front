import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../../ui/FormRow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateStatus from "./useUpdateStatus";
import { useTranslation } from "react-i18next";

export default function BlockDriverForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { editStatus } = useUpdateStatus();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function handleFormSubmit(data) {
    editStatus(
      { status: "Blocked", reason: data.reason },
      {
        onSuccess: () => {
          // Call editStatus or perform any other actions
          navigate(`/adminPanel/drivers?status=Blocked`, {
            replace: true,
          });
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormRow label="Description">
        <Input
          placeholder={t("Reason")}
          type="text"
          {...register("reason", {
            required: {
              value: true,
              message: t("ReasonValidation.required"),
            },
            minLength: {
              value: 3,
              message: t("ReasonValidation.minLength"),
            },
          })}
          $error={!!errors.reason}
          $helperText={errors.reason?.message}
          $sx={{
            Padding: "12 24",
            gap: 4,
            borderRadius: 16,
            fontSize: 16,
            background: "#005379",
            shadow: "0 4 60 0 #0038FF26",
          }}
        />
      </FormRow>

      <Button
        type="submit"
        variant="contained"
        sx={{
          width: 327,
          height: 56,
          Padding: "12 24",
          gap: 4,
          borderRadius: 16,
          fontSize: 16,
          color: "white",
          background: "#005379",
          shadow: "0 4 60 0 #0038FF26",
          display: "flex",
        }}
      >
        {t("Submit")}
      </Button>
    </Form>
  );
}
