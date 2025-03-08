import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewDriver } from "../../services/apiDriver";
import { useTranslation } from "react-i18next";

export function useAddDrive() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const queryClient = useQueryClient();

  const { mutate: addDriver, isLoading: isAdded } = useMutation({
    mutationFn: (formData) => addNewDriver(formData, isRTL),
    onSuccess: () => {
      toast.success(t("useAddDriveValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["drivers", isRTL] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { isAdded, addDriver };
}
