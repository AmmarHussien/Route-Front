import { useQuery } from "@tanstack/react-query";
import { getOverAllRatingDriver } from "../../../services/apiRating";

const date = new Date();
const currentMonth = date.getMonth() + 1;

function useOverallRatingDriver() {
  const {
    isLoading: isLoadingOverallRating,
    data: overAllRatingDriver,
    error,
  } = useQuery({
    queryKey: ["Over-All-Rating", "Driver", `Month ${currentMonth}`],
    queryFn: getOverAllRatingDriver,
    retry: false,
  });

  return {
    isLoading: isLoadingOverallRating,
    overAllRatingDriver,
    error,
  };
}

export default useOverallRatingDriver;
