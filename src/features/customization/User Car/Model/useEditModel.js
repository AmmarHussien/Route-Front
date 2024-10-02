import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { updateModel } from "../../../../services/Customization/apiModels";

function useEditModel(modelId) {
  const queryClient = useQueryClient();
  const { Id } = useParams();

  const {
    mutate: editModels,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName, isActive }) =>
      updateModel(Id, modelId, englishName, arabicName, isActive),
    onSuccess: () => {
      toast.success("Model successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Models", modelId],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editModels, isLoading, isError, error };
}

export default useEditModel;
