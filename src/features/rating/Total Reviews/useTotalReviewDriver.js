import { useQuery } from "@tanstack/react-query";
import { getTotalReviewDriver } from "../../../services/apiRating";

function useTotalReviewDriver(year, month) {
  const {
    isLoading,
    data: totalReviewDriver,
    error,
  } = useQuery({
    queryKey: ["Total-Review-Driver", year, month],
    queryFn: async () => {
      const response = await getTotalReviewDriver(year, month);
      return response;
    },
    enabled: !!year && !!month,
  });

  const totalReviewsDriver = totalReviewDriver || []; // Adjust based on your API response structure

  return { isLoading, totalReviewsDriver, error };
}

export default useTotalReviewDriver;
