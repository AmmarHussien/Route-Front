import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { TokenServices } from "../../utils/TokenService";
import { PermissionServices } from "../../utils/PermissionService";

export function useLogout() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      TokenServices.removeToken("authToken");
      PermissionServices.removePermission("permission");

      toast.success(t("UseLogoutValidations.Successfully"));
      queryClient.removeQueries();
      navigate("/login", {
        replace: true,
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { logout, isLoading };
}
