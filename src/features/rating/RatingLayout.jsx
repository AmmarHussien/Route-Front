import styled from "styled-components";

import TotalRating from "./Total Rating/TotalRating";
import TotalReviews from "./Total Reviews/TotalReviews";
import RatingsReview from "./Rating Review/RatingsReview";
import RatingStatisctics from "./Rating Statisctics/RatingStatisctics";

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
  background-color: yellow;
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

// const SmallContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 10px;
// `;

function RatingLayout() {
  return (
    <>
      <RatingStatisctics />
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
