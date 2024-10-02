import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCar } from "../../../services/Customization/apiCarService";

function useViewCarService(carId) {
  const { serviceId } = useParams();
  const {
    isLoading,
    data: carService,
    error,
  } = useQuery({
    queryKey: ["Customization-Car-Services", carId],
    queryFn: () => getCar(serviceId, carId),
    retry: false,
  });
  return { isLoading, carService, error };
}

export default useViewCarService;
