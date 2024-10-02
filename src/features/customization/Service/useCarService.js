import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAllCars } from "../../../services/Customization/apiCarService";

function useCarService() {
  const { serviceId } = useParams();
  const {
    isLoading,
    data: carService,
    error,
  } = useQuery({
    queryKey: ["Customization-Car-Services", serviceId],
    queryFn: () => getAllCars(serviceId),
    retry: false,
  });
  return { isLoading, carService, error };
}

export default useCarService;
