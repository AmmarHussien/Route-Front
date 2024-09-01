import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isloading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem("authToken");
      toast.success("logout successfully");
      queryClient.removeQueries();
      navigate("/login", {
        replace: true,
      });
    },
  });

  return { logout, isloading };
}
