import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { updateDriverStatus } from "../../../services/apiDriver";
import { useTranslation } from "react-i18next";

function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const { t } = useTranslation();

  const { mutate: editStatus, isLoading } = useMutation({
    mutationFn: ({ reason, status }) =>
      updateDriverStatus(userId, reason, status),
    onSuccess: () => {
      toast.success(t("useUpdateStatus.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["drivers", userId] });
    },
    onError: (err) => toast.error(t("useUpdateStatus.Error")),
  });

  return { editStatus, isLoading };
}

export default useUpdateStatus;
