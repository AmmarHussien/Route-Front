import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewUser } from "../../services/apiUsers";
import { useTranslation } from "react-i18next";

export function useAddUser() {
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const { mutate: addUser, isLoading: isAdded } = useMutation({
    mutationFn: (formData) => addNewUser(formData, isRTL),
    onSuccess: () => {
      toast.success(t("useAddUserValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(errorMessage);
    },
  });

  return { isAdded, addUser };
}
