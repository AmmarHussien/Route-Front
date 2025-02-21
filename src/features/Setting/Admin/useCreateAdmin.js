import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CreateAdmin } from "../../../services/Setting/apiAdmin";

function useCreateAdmin() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const {
    isLoading,
    mutate: addAdmin,
    error,
  } = useMutation({
    mutationFn: (FormData) => CreateAdmin(FormData),

    onSuccess: () => {
      toast.success(t("useCreateAdminValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Setting-Admin"],
      });
    },
    onError: (err) => toast.error(t("useCreateAdminValidations.Error")),
  });

  return { addAdmin, isLoading, isError: !!error, error };
}

export default useCreateAdmin;
