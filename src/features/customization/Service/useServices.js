import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../../../services/Customization/apiService";
import { useTranslation } from "react-i18next";

function useServices() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const {
    isLoading,
    data: services,
    error,
  } = useQuery({
    queryKey: ["Customization-Services", isRTL],
    queryFn: () => getAllServices(isRTL),
    retry: false,
  });
  return { isLoading, services, error };
}

export default useServices;
