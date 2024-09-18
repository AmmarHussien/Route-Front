import { useQuery } from "@tanstack/react-query";
import { getTotalRatings } from "../../../services/apiRating";

function useTotalRating(type, year, month) {
  const {
    isLoading,
    data: totalRating,
    error,
  } = useQuery({
    queryKey: ["TotalRating", type, year, month],
    queryFn: async () => {
      const response = await getTotalRatings(type, year, month);
      return response;
    },
    enabled: !!year && !!month && !!type,
  });

  const totalRatings = totalRating || []; // Adjust based on your API response structure

  return { isLoading, totalRatings, error };
}

export default useTotalRating;
