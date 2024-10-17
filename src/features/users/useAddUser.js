import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addNewUser } from "../../services/apiUsers";
import { useTranslation } from "react-i18next";

export function useAddUser() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: addUser, isLoading: isAdded } = useMutation({
    mutationFn: (formData) => addNewUser(formData),
    onSuccess: () => {
      toast.success(t("useAddUserValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(t("useAddUserValidations.Successfully")),
  });

  return { isAdded, addUser };
}
