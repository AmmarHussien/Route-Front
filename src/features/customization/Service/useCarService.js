import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllCars } from "../../../services/Customization/apiCarService";
import { useTranslation } from "react-i18next";

function useCarService() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { serviceId } = useParams();
  const {
    isLoading,
    data: carService,
    error,
  } = useQuery({
    queryKey: ["Customization-Car-Services", serviceId, isRTL],
    queryFn: () => getAllCars(serviceId),
    retry: false,
  });
  return { isLoading, carService, error };
}

export default useCarService;
