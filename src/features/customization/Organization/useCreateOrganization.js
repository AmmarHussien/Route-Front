import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrganization } from "../../../services/Customization/apiOrganization";

function useCreateOrganization() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    mutate: createOrganizations,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName }) =>
      createOrganization(englishName, arabicName),
    onSuccess: () => {
      toast.success("Organization successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Organizations"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createOrganizations, isLoading, isError: !!error, error };
}

export default useCreateOrganization;
