import { useQuery } from "@tanstack/react-query";
import { getRatingsReview } from "../../../services/apiRating";

function useRatingReview(year, month) {
  const {
    isLoading,
    data: ratingReview,
    error,
  } = useQuery({
    queryKey: ["RatingReview", year, month],
    queryFn: async () => {
      const response = await getRatingsReview(year, month);
      return response;
    },
    enabled: !!year && !!month,
  });

  const ratingReviews = ratingReview || []; // Adjust based on your API response structure

  return { isLoading, ratingReviews, error };
}

export default useRatingReview;
