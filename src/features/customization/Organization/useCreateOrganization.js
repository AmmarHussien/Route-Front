import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrganization } from "../../../services/Customization/apiOrganization";
import { useTranslation } from "react-i18next";

function useCreateOrganization() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const {
    isLoading,
    mutate: createOrganizations,
    error,
  } = useMutation({
    mutationFn: ({ englishName, arabicName }) =>
      createOrganization(englishName, arabicName),
    onSuccess: () => {
      toast.success(t("useCreateOrganizationValidations.Successfully"));
      queryClient.invalidateQueries({
        queryKey: ["Customization-Organizations"],
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { createOrganizations, isLoading, isError: !!error, error };
}

export default useCreateOrganization;
