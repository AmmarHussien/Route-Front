import { useQuery } from "@tanstack/react-query";
import { getAllManufactures } from "../../services/apiManufactures";

function useManufactures() {
  const {
    isLoading,
    data: manufactures,
    error,
  } = useQuery({
    queryKey: ["Manufactures"],
    queryFn: () => getAllManufactures(),
    retry: false,
  });
  return { isLoading, manufactures, error };
}

export default useManufactures;
