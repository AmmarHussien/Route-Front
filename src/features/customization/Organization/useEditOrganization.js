import { updateOrganization } from "../../../services/Customization/apiOrganization";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useEditOrganization(id) {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: ({ englishName, arabicName, isActive }) =>
      updateOrganization(id, englishName, arabicName, isActive),
    onSuccess: () => {
      toast.success(t("useEditOrganizationValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Organizations", id],
      });
    },
    onError: (err) => toast.error(t("useEditOrganizationValidations.Error")),
  });

  return mutation;
}

export default useEditOrganization;
