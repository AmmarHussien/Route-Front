import { useQuery } from "@tanstack/react-query";
import { getOverAllRatingUser } from "../../../services/apiRating";

const date = new Date();
const currentMonth = date.getMonth() + 1;

function useOverallRatingUser() {
  const {
    isLoading: isLoadingOverallRating,
    data: overAllRatingUser,
    error,
  } = useQuery({
    queryKey: ["Over-All-Rating", "User", `Month ${currentMonth}`],
    queryFn: getOverAllRatingUser,
    retry: false,
  });

  return {
    isLoading: isLoadingOverallRating,
    overAllRatingUser,
    error,
  };
}

export default useOverallRatingUser;
