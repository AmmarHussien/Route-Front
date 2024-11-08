import { useQuery } from "@tanstack/react-query";
import { getAllManufactures } from "../../../../services/Customization/apiManufactures";
import { useTranslation } from "react-i18next";

function useGetManufactures() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const {
    isLoading,
    data: manufactures,
    error,
  } = useQuery({
    queryKey: ["Customization-Manufactures", isRTL],
    queryFn: () => getAllManufactures(isRTL),
    retry: false,
  });
  return { isLoading, manufactures, error };
}

export default useGetManufactures;
