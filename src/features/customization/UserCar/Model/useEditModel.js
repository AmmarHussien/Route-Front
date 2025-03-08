import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateModel } from "../../../../services/Customization/apiModels";
import { useTranslation } from "react-i18next";

function useEditModel(modelId) {
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { t } = useTranslation();

  const {
    mutate: editModels,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName, isActive }) =>
      updateModel(Id, modelId, englishName, arabicName, isActive),
    onSuccess: () => {
      toast.success(t("useEditModelValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Models", modelId],
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { editModels, isLoading, isError, error };
}

export default useEditModel;
