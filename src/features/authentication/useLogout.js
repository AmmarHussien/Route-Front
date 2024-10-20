import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useLogout() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem("authToken");
      toast.success(t("UseLogoutValidations.Successfully"));
      queryClient.removeQueries();
      navigate("/adminPanel/login", {
        replace: true,
      });
    },
  });

  return { logout, isLoading };
}
