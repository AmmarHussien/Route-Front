import styled from "styled-components";
import Spinner from "../../../ui/Spinner";

import RatingStats from "./RatingStats";
import useOverallRatingDriver from "./useOverallRatingDriver";
import useOverallRatingUser from "./useOverallRatingUser";
import { useTranslation } from "react-i18next";

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

function RatingStatistics() {
  const { t } = useTranslation();

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
    return <ErrorMessage>{t("ErrorLoading")}</ErrorMessage>;
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
