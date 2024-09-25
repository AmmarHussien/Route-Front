import { useMutation, useQueryClient } from "react-query";
import { createNewNotification } from "../../services/apiNotifications";
import toast from "react-hot-toast";

function useAddNotification() {
  const queryClient = useQueryClient();

  const { mutate: addNotification, isLoading: isAdded } = useMutation({
    mutationFn: (FormData) => createNewNotification(FormData),
    onSuccess: () => {
      toast.success("New Notification Successfully Added");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { addNotification, isAdded };
}

export default useAddNotification;
