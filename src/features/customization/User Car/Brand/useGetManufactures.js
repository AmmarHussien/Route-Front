import { useQuery } from "@tanstack/react-query";
import { getAllManufactures } from "../../../../services/Customization/apiManufactures";

function useGetManufactures() {
  const {
    isLoading,
    data: manufactures,
    error,
  } = useQuery({
    queryKey: ["Customization-Manufactures"],
    queryFn: () => getAllManufactures(),
    retry: false,
  });
  return { isLoading, manufactures, error };
}

export default useGetManufactures;
