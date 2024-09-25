import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import { Controller, useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Textarea from "../../ui/Textarea";
import DateExplicitDateTimePicker from "../../ui/DateExplicitDateTimePicker";
import { useState } from "react";
import dayjs from "dayjs";
import MultiSelectDropDownMenu from "../../ui/MultiSelectDropDownMenu";
import useAddNotification from "./useAddNotification";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { useEffect } from "react";

// import toast from "react-hot-toast";
// import Spinner from "../../ui/Spinner";

function CreateNotificationForm({ onCloseModal }) {
  const [dateValue, setDateValue] = useState(dayjs());
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      message: "",
      Platform: [],
      Resever: [],
    },
  });

  const { addNotification, isAdded } = useAddNotification();

  useEffect(() => {
    if (isAdded) {
      // Update the notes state to reflect the addition (already handled above with setNotes)
    }
  }, [isAdded]); //

  // const selectedPlatform = watch("Platform"); // Get the current selected values
  // const selectedResever = watch("Resever"); // Get the current selected values

  const onSubmit = async (data) => {
    const formData = new FormData();

    const formattedDate = dayjs(dateValue).format("YYYY-MM-DD HH:mm");

    formData.append("subject", data.subject);
    formData.append("message", data.message);
    // Append each platform item individually
    data.Platform.forEach((platformItem) => {
      formData.append("platform[]", platformItem); // Note the use of "platform[]" to denote an array
    });

    // Append each Resever item individually
    data.Resever.forEach((reseverItem) => {
      formData.append("app_type[]", reseverItem); // Same for "app_type[]"
    });
    formData.append("date", formattedDate);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      addNotification(formData, {
        onSuccess: () => {
          onCloseModal?.();
        },
      });
    } catch (error) {
      toast.error("Notification addition failed.");
    }
  };

  const onError = (errors) => {};
  return !isAdded ? (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "regular" : "regular"}
    >
      <FormRowVertical $error={errors?.subject?.message}>
        <Input
          type="text"
          id="Subject"
          placeholder="Subject"
          {...register("subject", {
            required: "Subject is required",
          })}
          $sx={{ backgroundColor: "rgb(247, 248, 250)" }}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.message?.message}>
        <Textarea
          type="text"
          id="Message"
          placeholder="Message"
          rows={5}
          {...register("message", {
            required: "Message is required",
            maxLength: {
              value: 180,
              message: "Message must be at Most 180 characters",
            },
          })}
          sx={{
            backgroundColor: "rgb(247, 248, 250)",
          }}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.DateTime?.message}>
        <DateExplicitDateTimePicker
          value={dateValue}
          onValueChange={setDateValue}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Controller
          name="Platform"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectDropDownMenu
              title="Platform"
              options={["Android", "Sms", "Ios"]}
              onSelect={onChange} // Update the form state
              selectedOptions={value} // Provide current value to the component
            />
          )}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Controller
          name="Resever"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectDropDownMenu
              title="Resever"
              options={["Driver", "User"]}
              onSelect={onChange} // Update the form state
              selectedOptions={value} // Provide current value to the component
            />
          )}
        />
      </FormRowVertical>

      <FormRowVertical>
        <FileInput
          placeholder="Photo "
          id="Photo"
          //onFileChange={handleFileChange(setProfileImage)}
        />
      </FormRowVertical>

      <FormRow>
        <Button disabled={isAdded} size="xlarge">
          Submit
        </Button>
      </FormRow>
    </Form>
  ) : (
    <Spinner />
  );
}

export default CreateNotificationForm;
