import { useState } from "react";
import RatingHeader from "../RatingHeader";

import PieCharts from "./PieChart";
import useRatingReview from "./useRatingReview";
import { format } from "date-fns";
import ReviewRow from "./ReviewRow";
import styled from "styled-components";
import Spinner from "../../../ui/Spinner";
import { useTranslation } from "react-i18next";

const PieContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

function RatingsReview() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { t } = useTranslation();

  const { isLoading, error, ratingReviews } = useRatingReview(
    format(currentMonth, "yyyy"),
    format(currentMonth, "M")
  );

  if (error) {
    return <ErrorMessage>Error loading Ratings Review</ErrorMessage>;
  }

  const { reviews } = ratingReviews;

  const COLORS = ["#6366F1", "#F97316", "#F43F5E", "#A855F7", "#EAB308"];

  const rate = ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"];

  let maxLength;

  return (
    <>
      <RatingHeader
        title={t("RatingsReview")}
        subtitle={t("RatingsReviewSlogan")}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        ((maxLength = Math.min(COLORS.length, reviews.length)),
        maxLength === 0 ? (
          <Empty>{t("NoData")}</Empty>
        ) : (
          <PieContainer>
            <PieCharts
              data={ratingReviews.reviews || 0}
              COLORS={COLORS}
              totalReviews={ratingReviews.total_reviews}
            />

            <ReviewRow
              color={COLORS}
              rate={rate}
              reviews={reviews}
              maxLength={maxLength}
            />
          </PieContainer>
        ))
      )}
    </>
  );
}

export default RatingsReview;
