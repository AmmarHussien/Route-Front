import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createManufacture } from "../../../../services/Customization/apiManufactures";
import toast from "react-hot-toast";

function useCreateManufactures() {
  const queryClient = useQueryClient();

  const {
    mutate: addManufacture,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName }) =>
      createManufacture(englishName, arabicName),
    onSuccess: () => {
      toast.success("Manufactures successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Manufactures"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { addManufacture, isLoading, isError, error };
}

export default useCreateManufactures;
