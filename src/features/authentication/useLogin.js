import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useLogin() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (response) => {
      if (!response) {
        toast.error(t("UseLoginValidations.undefined"));
        return;
      }
      toast.success(t("UseLoginValidations.Successfully"));
      navigate("/adminPanel/dashboard", {
        replace: true,
      });
      queryClient.setQueryData(["user"], response);
    },

    onError: (err) => {
      toast.error(t("UseLoginValidations.Error"));
    },
  });

  return { login, isLoading };
}
