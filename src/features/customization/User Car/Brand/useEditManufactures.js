import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { updateManufacture } from "../../../../services/Customization/apiManufactures";
import toast from "react-hot-toast";

function useEditManufactures() {
  const queryClient = useQueryClient();
  const { Id } = useParams();

  const {
    mutate: editManufacture,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName, isActive }) =>
      updateManufacture(Id, englishName, arabicName, isActive),
    onSuccess: () => {
      toast.success("Manufactures successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["Customization-Manufactures", Id],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editManufacture, isLoading, isError, error };
}

export default useEditManufactures;
