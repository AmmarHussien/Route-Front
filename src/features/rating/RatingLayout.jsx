import styled from "styled-components";

import TotalRating from "./Total Rating/TotalRating";
import TotalReviews from "./Total Reviews/TotalReviews";
import RatingsReview from "./Rating Review/RatingsReview";
import RatingStatistics from "./Rating Statistics/RatingStatistics";

const RatingBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const TotalRatingContainer = styled.div`
  width: 50%;
  height: 100%;
  background-color: white;
  border-radius: 24px;
  padding: 16px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  gap: 24px;
`;

const TotalReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  border-radius: 24px;
  padding: 16px;
`;

const RatingReviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  background-color: white;
  border-radius: 24px;
  padding: 16px;
`;

function RatingLayout() {
  return (
    <>
      <RatingStatistics />
      <RatingBody>
        <TotalRatingContainer>
          <TotalRating />
        </TotalRatingContainer>
        <ReviewContainer>
          <TotalReviewContainer>
            <TotalReviews />
          </TotalReviewContainer>
          <RatingReviewContainer>
            <RatingsReview />
          </RatingReviewContainer>
        </ReviewContainer>
      </RatingBody>
    </>
  );
}

export default RatingLayout;
