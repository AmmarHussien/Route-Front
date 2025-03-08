import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrganization } from "../../../services/Customization/apiOrganization";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function useDeleteOrganization(id) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  return useMutation(() => deleteOrganization(id), {
    onSuccess: () => {
      // Invalidate the query to refresh the manufactures list after deletion
      toast.success(t("useDeleteOrganizationValidations.Successfully"));
      queryClient.invalidateQueries("Customization-Organizations");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });
}

export default useDeleteOrganization;
