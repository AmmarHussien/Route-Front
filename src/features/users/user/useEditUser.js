import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editUser } from "../../../services/apiUsers";
import { useParams } from "react-router-dom";

function useEditUser() {
  const queryClient = useQueryClient();
  const { Id } = useParams();

  const { mutate: editUsers, isLoading: isEditing } = useMutation({
    mutationFn: ({ newUserData }) => editUser(Id, newUserData), // Ensure parameters match
    onSuccess: () => {
      toast.success("User successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["userInfo", Id] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editUsers, isEditing };
}

export default useEditUser;
