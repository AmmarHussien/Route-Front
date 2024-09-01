import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { updateUserStatus } from "../../../services/apiUsers";

function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { Id } = useParams();

  const { mutate: editStatus, isLoading } = useMutation({
    mutationFn: ({ reason, status }) => updateUserStatus(Id, reason, status),
    onSuccess: () => {
      toast.success("Status successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["users", Id] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editStatus, isLoading };
}

export default useUpdateStatus;
