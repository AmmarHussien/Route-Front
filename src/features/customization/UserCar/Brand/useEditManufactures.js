import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { updateManufacture } from "../../../../services/Customization/apiManufactures";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useEditManufactures() {
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { t } = useTranslation();

  const {
    mutate: editManufacture,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName, isActive }) =>
      updateManufacture(Id, englishName, arabicName, isActive),
    onSuccess: () => {
      toast.success(t("useEditManufacturesValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Manufactures", Id],
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { editManufacture, isLoading, isError, error };
}

export default useEditManufactures;
