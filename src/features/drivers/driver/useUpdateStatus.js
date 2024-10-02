import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { updateDriverStatus } from "../../../services/apiDriver";

function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { userId } = useParams();

  const { mutate: editStatus, isLoading } = useMutation({
    mutationFn: ({ reason, status }) =>
      updateDriverStatus(userId, reason, status),
    onSuccess: () => {
      toast.success("Status successfully Edited");
      queryClient.invalidateQueries({ queryKey: ["drivers", userId] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editStatus, isLoading };
}

export default useUpdateStatus;
