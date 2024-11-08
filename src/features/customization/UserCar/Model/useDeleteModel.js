import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteModel } from "../../../../services/Customization/apiModels";
import { useTranslation } from "react-i18next";

function useDeleteModel(modelId) {
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { t } = useTranslation();

  return useMutation(() => deleteModel(Id, modelId), {
    onSuccess: () => {
      // Invalidate the query to refresh the manufactures list after deletion
      toast.success(t("useDeleteModelValidations.Successfully"));

      queryClient.invalidateQueries(["Customization-Models", Id]);
    },
    onError: (error) => {
      toast.error(t("useDeleteModelValidations.Error"));
    },
  });
}

export default useDeleteModel;
