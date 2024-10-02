import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createModels } from "../../../../services/Customization/apiModels";

function useCreateModel() {
  const queryClient = useQueryClient();
  const { Id } = useParams();

  const {
    mutate: createModel,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName }) =>
      createModels(Id, englishName, arabicName),
    onSuccess: () => {
      toast.success("Model successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Models", Id],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createModel, isLoading, isError, error };
}

export default useCreateModel;
