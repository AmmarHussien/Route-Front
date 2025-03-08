import { useMutation, useQueryClient } from "react-query";
import { createNewNotification } from "../../services/apiNotifications";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useAddNotification() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: addNotification, isLoading: isAdded } = useMutation({
    mutationFn: (FormData) => createNewNotification(FormData),
    onSuccess: () => {
      toast.success(t("useAddNotificationValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });
  return { addNotification, isAdded };
}

export default useAddNotification;
