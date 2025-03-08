import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createManufacture } from "../../../../services/Customization/apiManufactures";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useCreateManufactures() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    mutate: addManufacture,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName, logo }) =>
      createManufacture(englishName, arabicName, logo),
    onSuccess: () => {
      toast.success(t("useCreateManufacturesValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Manufactures"],
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { addManufacture, isLoading, isError, error };
}

export default useCreateManufactures;
