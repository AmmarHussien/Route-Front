import { useState } from "react";
import RatingHeader from "../RatingHeader";

import PieCharts from "./PieChart";
import useRatingReview from "./useRatingReview";
import { format } from "date-fns";
import ReviewRow from "./ReviewRow";
import styled from "styled-components";
import Spinner from "../../../ui/Spinner";

const PieContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const NoDataMessage = styled.div`
  color: #090909; /* Optional: Styling for the no data message */
  font-size: 24px; /* Optional: Adjust font size */
  text-align: center;
  width: 100%;
`;

function RatingsReview() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { isLoading, error, ratingReviews } = useRatingReview(
    format(currentMonth, "yyyy"),
    format(currentMonth, "M")
  );

  if (error) {
    return <div>Error loading Ratings Review</div>;
  }

  const { reviews } = ratingReviews;

  const COLORS = ["#6366F1", "#F97316", "#F43F5E", "#A855F7", "#EAB308"];

  const rate = ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"];

  let maxLength;

  return (
    <>
      <RatingHeader
        title={"Ratings Review"}
        subtitle={"Breakdown of the received reviews"}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        ((maxLength = Math.min(COLORS.length, reviews.length)),
        maxLength === 0 ? (
          <NoDataMessage>No data to show at the Month</NoDataMessage>
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
