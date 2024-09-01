import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewDriver } from "../../services/apiDriver";

export function useAddDrive() {
  const queryClient = useQueryClient();

  const { mutate: addDriver, isLoading: isAdded } = useMutation({
    mutationFn: (formData) => addNewDriver(formData),
    onSuccess: () => {
      toast.success("New Driver successfully created");
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdded, addDriver };
}
