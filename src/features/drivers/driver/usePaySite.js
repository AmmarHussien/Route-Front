import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paySiteCommission } from "../../../services/apiDriver";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function usePaySite() {
  const queryClient = useQueryClient();

  const { i18n, t } = useTranslation();
  const { userId } = useParams();
  const isRTL = i18n.language === "ar-EG";

  const {
    mutate: paySite,
    isLoading,
    data,
    error,
  } = useMutation({
    mutationFn: (id) => paySiteCommission(id, isRTL),
    onSuccess: () => {
      toast.success(t("useEditDriverValidations.Successfully"));
      queryClient.invalidateQueries({ queryKey: ["DriverInfo", userId] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });

  return { paySite, isLoading, data, error };
}

export default usePaySite;
