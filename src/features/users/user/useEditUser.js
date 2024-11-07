import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editUser } from "../../../services/apiUsers";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function useEditUser() {
  const queryClient = useQueryClient();
  const { Id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const { mutate: editUsers, isLoading: isEditing } = useMutation({
    mutationFn: ({ newUserData }) => editUser(Id, newUserData, isRTL), // Ensure parameters match
    onSuccess: () => {
      toast.success(t("useEditUserValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["userInfo", Id] });
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(errorMessage);
    },
  });

  return { editUsers, isEditing };
}

export default useEditUser;
