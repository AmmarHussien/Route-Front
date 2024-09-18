import { useQuery } from "@tanstack/react-query";
import { getOverAllRating } from "../../services/apiRating";

const date = new Date();
const currentMonth = date.getMonth() + 1;

function useOverallRating() {
  const {
    isLoading: isLoadingOverallRating,
    data: overAllRating,
    error,
  } = useQuery({
    queryKey: ["Rating", `Month ${currentMonth}`],
    queryFn: getOverAllRating,
    retry: false,
  });

  return {
    isLoading: isLoadingOverallRating,
    overAllRating,
    error,
  };
}

export default useOverallRating;
