import { useState } from "react";
import RatingHeader from "../RatingHeader";
import useTotalReviewDriver from "./useTotalReviewDriver";
import useTotalReviewUser from "./useTotalRatingUser";
import { format } from "date-fns";
import TotalReviewsChart from "./TotalReviewsChart";
import { useTranslation } from "react-i18next";

function TotalReviews() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { t } = useTranslation();

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
        title={t("TotalReviews")}
        subtitle={t("TotalReviewsSlogan")}
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
