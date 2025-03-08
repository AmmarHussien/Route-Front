import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createRole } from "../../../services/Setting/apiRole";
import { useNavigate } from "react-router-dom";

function useCreateRole() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    mutate: createRoles,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ name, permissions }) => createRole(name, permissions),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Setting-Roles"], // ✅ Force re-fetching roles
      });
      toast.success(t("useCreateRoleValidations.Successfully"));
      navigate("/setting/role");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { createRoles, isLoading, isError, error };
}

export default useCreateRole;
