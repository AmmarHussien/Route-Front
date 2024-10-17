import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewDriver } from "../../services/apiDriver";
import { useTranslation } from "react-i18next";

export function useAddDrive() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { mutate: addDriver, isLoading: isAdded } = useMutation({
    mutationFn: (formData) => addNewDriver(formData),
    onSuccess: () => {
      toast.success(t("useAddDriveValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (err) => toast.error(t("useAddDriveValidations.Error")),
  });

  return { isAdded, addDriver };
}
