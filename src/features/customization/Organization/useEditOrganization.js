import { updateOrganization } from "../../../services/Customization/apiOrganization";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useEditOrganization(id) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ englishName, arabicName, isActive }) =>
      updateOrganization(id, englishName, arabicName, isActive),
    onSuccess: () => {
      toast.success("Organization successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Organizations", id],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return mutation;
}

export default useEditOrganization;
