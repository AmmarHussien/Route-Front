import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewUser } from "../../services/apiUsers";

export function useAddUser() {
  const queryClient = useQueryClient();

  const { mutate: addUser, isLoading: isAdded } = useMutation({
    mutationFn: (formData) => addNewUser(formData),
    onSuccess: () => {
      toast.success("New User successfully created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdded, addUser };
}
