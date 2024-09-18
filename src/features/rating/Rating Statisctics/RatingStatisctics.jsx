import Spinner from "../../../ui/Spinner";
import useOverallRating from "../useOverallRating";
import RatingStats from "./RatingStats";

function RatingStatisctics() {
  const { isLoading, overAllRating, error } = useOverallRating();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading rating</div>;
  }

  const thisMonthRating = overAllRating?.over_all_ratings_this_month;
  const pastMonthRating = overAllRating?.over_all_ratings_month_before;
  return (
    <RatingStats
      overAllThisMonthRating={thisMonthRating}
      overAllPastMonthRating={pastMonthRating}
    />
  );
}

export default RatingStatisctics;
