import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../../ui/FormRow";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUpdateStatus from "./useUpdateStatus";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
`;

export default function BlockDriverForm() {
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
        <StyledLabel htmlFor="reason">Reason</StyledLabel>
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
        $variant="contained"
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
        Submit
      </Button>
    </Form>
  );
}
