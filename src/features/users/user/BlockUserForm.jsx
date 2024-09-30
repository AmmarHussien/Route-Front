import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../../ui/FormRow";
import { Button } from "@mui/material";
import useUpdateStatus from "./useUpdateStatus";
import { useNavigate } from "react-router-dom";

export default function BlockUserForm() {
  const navigate = useNavigate();

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
          navigate(`/adminPanel/users?status=Blocked`, {
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
          placeholder="Reason"
          type="text"
          {...register("reason", {
            required: "This field is required",
            minLength: {
              value: 1,
              message: "Reason should be at least 1 character",
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
          background: "#005379",
          shadow: "0 4 60 0 #0038FF26",
          display: "flex",
        }}
      >
        Submit
      </Button>
    </Form>
  );
}
