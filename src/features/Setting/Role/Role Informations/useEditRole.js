import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateRole } from "../../../../services/Setting/apiRole";

function useEditRole() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { t } = useTranslation();

  const {
    mutate: editRole,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ name, permissions }) => updateRole(id, name, permissions),
    onSuccess: () => {
      toast.success(t("useEditRoleValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Setting-Role", id],
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { editRole, isLoading, isError, error };
}

export default useEditRole;
