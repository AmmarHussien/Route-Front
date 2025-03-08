import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateAdmin } from "../../../../services/Setting/apiAdmin";

function useEditAdmin() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { t } = useTranslation();

  const {
    mutate: editAdmin,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ first_name, last_name, email, status, roles }) =>
      updateAdmin(id, first_name, last_name, email, status, roles),
    onSuccess: () => {
      toast.success(t("useEditAdminValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Setting-Admin", id],
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { editAdmin, isLoading, isError, error };
}

export default useEditAdmin;
