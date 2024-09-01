import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (response) => {
      if (!response) {
        console.error("Login response is undefined");
        return;
      }
      toast.success("Login Successfully");
      navigate("/adminpanel/dashboard", {
        replace: true,
      });
      queryClient.setQueryData(["user"], response);
    },

    onError: (err) => {
      toast.error("Provided email or password are incorrect");
      console.error("Login failed:", err);
    },
  });

  return { login, isLoading };
}
