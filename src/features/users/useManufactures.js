import { useQuery } from "@tanstack/react-query";
import { getAllManufactures } from "../../services/apiManufactures";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

function useManufactures() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const {
    isLoading,
    data: manufactures,
    error,
  } = useQuery({
    queryKey: ["Manufactures", isRTL],
    queryFn: () => getAllManufactures(isRTL),
    retry: false,
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });
  return { isLoading, manufactures, error };
}

export default useManufactures;
