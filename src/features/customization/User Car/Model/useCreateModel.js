import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createModels } from "../../../../services/Customization/apiModels";
import { useTranslation } from "react-i18next";

function useCreateModel() {
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { t } = useTranslation();

  const {
    mutate: createModel,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName }) =>
      createModels(Id, englishName, arabicName),
    onSuccess: () => {
      toast.success(t("useCreateModelValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Models", Id],
      });
    },
    onError: (err) => toast.error(t("useCreateModelValidations.Error")),
  });

  return { createModel, isLoading, isError, error };
}

export default useCreateModel;
