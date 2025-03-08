import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { editDriver } from "../../../services/apiDriver";
import { useTranslation } from "react-i18next";

function useEditDriver() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { t } = useTranslation();

  const { mutate: editDrivers, isLoading: isEditing } = useMutation({
    mutationFn: (newDriverData) => editDriver(userId, newDriverData), // Ensure parameters match
    onSuccess: () => {
      toast.success(t("useEditDriverValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["DriverInfo", userId] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { editDrivers, isEditing };
}

export default useEditDriver;
