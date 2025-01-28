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
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// import toast from "react-hot-toast";
// import Spinner from "../../ui/Spinner";

const StyledLabel = styled.label`
  font-size: 16px;
  color: #333; /* Dark gray text */
  font-weight: bold;
  margin-right: 10px; /* Add space between label and input */
  display: inline-block;
`;

function CreateNotificationForm({ onCloseModal }) {
  const { t } = useTranslation();
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
    const imagePath = notificationImage ? notificationImage.path : null;

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

    formData?.append("photo", imagePath);

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
      type={onCloseModal ? "grid" : "regular"}
    >
      <FormRowVertical error={errors?.subject?.message}>
        <StyledLabel htmlFor="Subject"> {t("Subject")} </StyledLabel>

        <Input
          type="text"
          id="Subject"
          placeholder={t("subject")}
          {...register("subject", {
            required: {
              value: true,
              message: t("SubjectValidation.required"),
            },
            minLength: {
              value: 3,
              message: t("SubjectValidation.minLength"),
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

      <FormRowVertical error={errors?.message?.message}>
        <StyledLabel htmlFor="Message"> {t("Message")} </StyledLabel>

        <Textarea
          type="text"
          id="Message"
          placeholder={t("Message")}
          rows={5}
          {...register("message", {
            required: {
              value: true,
              message: t("MessageValidation.required"),
            },
            minLength: {
              value: 3,
              message: t("MessageValidation.minLength"),
            },
            maxLength: {
              value: 180,
              message: t("MessageValidation.maxLength"),
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
          $sx={{
            backgroundColor: "rgb(247, 248, 250)",
          }}
        />
      </FormRowVertical>

      <FormRowVertical error={errors?.DateTime?.message}>
        <StyledLabel htmlFor="Date"> {t("Date")} </StyledLabel>

        <DateExplicitDateTimePicker
          value={dateValue}
          onValueChange={setDateValue}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="Platform"> {t("Platform")} </StyledLabel>

        <Controller
          name="Platform"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectDropDownMenu
              title={t("Platform")}
              options={[t("Android"), t("Sms"), t("Ios")]}
              onSelect={onChange} // Update the form state
              selectedOptions={value} // Provide current value to the component
            />
          )}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="Reserver"> {t("Reserver")} </StyledLabel>

        <Controller
          name="Reserver"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MultiSelectDropDownMenu
              title={t("Reserver")}
              options={[t("appTypeItem.Driver"), t("appTypeItem.User")]}
              onSelect={onChange} // Update the form state
              selectedOptions={value} // Provide current value to the component
            />
          )}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledLabel htmlFor="Photo"> {t("Photo")} </StyledLabel>

        <FileInput
          placeholder={t("Photo")}
          id="Photo"
          onFileChange={handleFileChange(setNotificationImage)}
        />
      </FormRowVertical>

      <FormRow>
        <Button disabled={isAdded || isUploaded} $size="xlarge">
          {t("Submit")}
        </Button>
      </FormRow>
    </Form>
  ) : (
    <Spinner />
  );
}

export default CreateNotificationForm;
