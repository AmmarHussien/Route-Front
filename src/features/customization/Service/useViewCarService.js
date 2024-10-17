import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCar } from "../../../services/Customization/apiCarService";
import { useTranslation } from "react-i18next";

function useViewCarService(carId) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { serviceId } = useParams();
  const {
    isLoading,
    data: carService,
    error,
  } = useQuery({
    queryKey: ["Customization-Car-Services", carId, isRTL],
    queryFn: () => getCar(serviceId, carId, isRTL),
    retry: false,
  });
  return { isLoading, carService, error };
}

export default useViewCarService;
