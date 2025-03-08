import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Context/useAuth";

export function useLogin() {
  const { t } = useTranslation();
  const { login: setAuth } = useAuth(); // Use AuthContext login
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (response) => {
      if (!response?.access_token) {
        toast.error(t("UseLoginValidations.undefined"));
        return;
      }
      setAuth(response.access_token); // Update AuthContext and localStorage
      navigate("/dashboard", { replace: true });
      toast.success(t("UseLoginValidations.Successfully"));

      queryClient.setQueryData(["user"], response);
    },

    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { login, isLoading };
}
