import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrganization } from "../../../services/Customization/apiOrganization";
import toast from "react-hot-toast";

function useDeleteOrganization(id) {
  const queryClient = useQueryClient();

  return useMutation(() => deleteOrganization(id), {
    onSuccess: () => {
      // Invalidate the query to refresh the manufactures list after deletion

      queryClient.invalidateQueries("Customization-Organizations");
    },
    onError: (error) => {
      toast.error("Error deleting Organization:", error.message);
    },
  });
}

export default useDeleteOrganization;
