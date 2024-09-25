import { useQuery } from "@tanstack/react-query";
import { getTotalReviewUser } from "../../../services/apiRating";

function useTotalReviewUser(year, month) {
  const {
    isLoading,
    data: totalReviewUser,
    error,
  } = useQuery({
    queryKey: ["Total-Review-User", year, month],
    queryFn: async () => {
      const response = await getTotalReviewUser(year, month);
      return response;
    },
    enabled: !!year && !!month,
  });

  const totalReviewsUsers = totalReviewUser || []; // Adjust based on your API response structure

  return { isLoading, totalReviewsUsers, error };
}

export default useTotalReviewUser;
