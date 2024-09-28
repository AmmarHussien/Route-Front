import { useState } from "react";
import RatingHeader from "../RatingHeader";
import useTotalReviewDriver from "./useTotalReviewDriver";
import useTotalReviewUser from "./useTotalRatingUser";
import { format } from "date-fns";
import TotalReviewsChart from "./TotalReviewsChart";

function TotalReviews() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { totalReviewsDriver, isLoading: isLoadingDriver } =
    useTotalReviewDriver(
      format(currentMonth, "yyyy"),
      format(currentMonth, "M"),
      format(currentMonth, "d")
    );
  const { totalReviewsUsers, isLoading: isLoadingUser } = useTotalReviewUser(
    format(currentMonth, "yyyy"),
    format(currentMonth, "M"),
    format(currentMonth, "d")
  );

  return (
    <>
      <RatingHeader
        title={"Total Reviews"}
        subtitle={"Indication for the total Reviews over this month"}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      <TotalReviewsChart
        currentMonth={currentMonth}
        users={totalReviewsUsers.reviews}
        userLoading={isLoadingUser}
        drivers={totalReviewsDriver.reviews}
        driverLoading={isLoadingDriver}
      />
    </>
  );
}

export default TotalReviews;
