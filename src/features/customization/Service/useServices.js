import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../../../services/Customization/apiService";

function useServices() {
  const {
    isLoading,
    data: services,
    error,
  } = useQuery({
    queryKey: ["Customization-Services"],
    queryFn: () => getAllServices(),
    retry: false,
  });
  return { isLoading, services, error };
}

export default useServices;
