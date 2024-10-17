import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editUser } from "../../../services/apiUsers";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function useEditUser() {
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { t } = useTranslation();

  const { mutate: editUsers, isLoading: isEditing } = useMutation({
    mutationFn: ({ newUserData }) => editUser(Id, newUserData), // Ensure parameters match
    onSuccess: () => {
      toast.success(t("useEditUserValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["userInfo", Id] });
    },
    onError: (err) => toast.error(t("useEditUserValidations.Error")),
  });

  return { editUsers, isEditing };
}

export default useEditUser;
