import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteModel } from "../../../../services/Customization/apiModels";

function useDeleteModel(modelId) {
  const queryClient = useQueryClient();
  const { Id } = useParams();

  return useMutation(() => deleteModel(Id, modelId), {
    onSuccess: () => {
      // Invalidate the query to refresh the manufactures list after deletion

      queryClient.invalidateQueries(["Customization-Models", Id]);
    },
    onError: (error) => {
      toast.error("Error deleting manufacture:", error.message);
    },
  });
}

export default useDeleteModel;
