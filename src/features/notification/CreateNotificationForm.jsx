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
import { useUploader } from "../../hooks/useUploader";

// import toast from "react-hot-toast";
// import Spinner from "../../ui/Spinner";

function CreateNotificationForm({ onCloseModal }) {
  const [dateValue, setDateValue] = useState(dayjs());
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      message: "",
      Platform: [],
      Reserver: [],
    },
  });

  const { addNotification, isAdded } = useAddNotification();
  const [notificationImage, setNotificationImage] = useState(null);
  const { upload, isUploaded } = useUploader();

  const handleFileChange = (setFileState) => async (file) => {
    const uploadData = new FormData();
    setFileState(file);
    setValue(file.name, file);

    uploadData.append("file", file);
    uploadData.append("dir", "notifications");

    try {
      const response = await upload(uploadData);
      setNotificationImage(response);
    } catch (error) {
      //console.error("Upload failed:", error.message);
    }
  };

  useEffect(() => {
    if (notificationImage) {
      // This runs every time profileImage changes
    }
  }, [notificationImage]);

  useEffect(() => {
    if (isAdded) {
      // Update the notes state to reflect the addition (already handled above with setNotes)
    }
  }, [isAdded]); //

  const onSubmit = async (data) => {
    const formData = new FormData();
    const imagePath = notificationImage ? notificationImage.path : "";

    const formattedDate = dayjs(dateValue).format("YYYY-MM-DD HH:mm");

    formData.append("subject", data.subject);
    formData.append("message", data.message);
    // Append each platform item individually
    data.Platform.forEach((platformItem) => {
      formData.append("platform[]", platformItem); // Note the use of "platform[]" to denote an array
    });

    // Append each Reserver item individually
    data.Reserver.forEach((reserverItem) => {
      formData.append("app_type[]", reserverItem); // Same for "app_type[]"
    });
    formData.append("date", formattedDate);

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    formData.append("photo", imagePath);

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
          $sx={{
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
          name="Reserver"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectDropDownMenu
              title="Reserver"
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
          onFileChange={handleFileChange(setNotificationImage)}
        />
      </FormRowVertical>

      <FormRow>
        <Button disabled={isAdded || isUploaded} $size="xlarge">
          Submit
        </Button>
      </FormRow>
    </Form>
  ) : (
    <Spinner />
  );
}

export default CreateNotificationForm;
