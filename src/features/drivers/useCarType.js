import { useQuery } from "@tanstack/react-query";
import { getAllCarType } from "../../services/apiCarTypr";

function useCarType() {
  const {
    isLoading,
    data: carType,
    error,
  } = useQuery({
    queryKey: ["CarType"],
    queryFn: () => getAllCarType(),
    retry: false,
  });
  return { isLoading, carType, error };
}

export default useCarType;