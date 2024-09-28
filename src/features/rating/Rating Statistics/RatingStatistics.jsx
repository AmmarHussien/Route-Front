import Spinner from "../../../ui/Spinner";

import RatingStats from "./RatingStats";
import useOverallRatingDriver from "./useOverallRatingDriver";
import useOverallRatingUser from "./useOverallRatingUser";

function RatingStatistics() {
  const {
    isLoading: userLoading,
    overAllRatingUser,
    error: userError,
  } = useOverallRatingUser();
  const {
    isLoading: driverLoading,
    overAllRatingDriver,
    error: driverError,
  } = useOverallRatingDriver();

  if (userLoading && driverLoading) {
    return <Spinner />;
  }

  if (userError || driverError) {
    return <div>Error loading rating</div>;
  }

  const thisMonthRatingUser = overAllRatingUser?.over_all_ratings_this_month;
  const pastMonthRatingUser = overAllRatingUser?.over_all_ratings_month_before;

  const thisMonthRatingDriver =
    overAllRatingDriver?.over_all_ratings_this_month;
  const pastMonthRatingDriver =
    overAllRatingDriver?.over_all_ratings_month_before;
  return (
    <>
      <RatingStats
        overAllThisMonthRatingUser={thisMonthRatingUser}
        overAllPastMonthRatingUser={pastMonthRatingUser}
        overAllThisMonthRatingDriver={thisMonthRatingDriver}
        overAllPastMonthRatingDriver={pastMonthRatingDriver}
      />
    </>
  );
}

export default RatingStatistics;
