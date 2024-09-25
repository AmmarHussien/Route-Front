import styled from "styled-components";
import RatingStat from "./RatingStat";

const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background: ${(props) => props.color};
`;

function RatingStats({
  overAllThisMonthRatingUser,
  overAllPastMonthRatingUser,
  overAllThisMonthRatingDriver,
  overAllPastMonthRatingDriver,
  feedbackcollectedThisMonth,
  feedbackcollectedPastMonth,
  PendingFeedbackThisMonth,
  PendingFeedbackPastMonth,
  FeedbackperDayThisMonth,
  FeedbackperDayPastMonth,
}) {
  return (
    <StatContainer>
      {overAllThisMonthRatingUser !== undefined &&
      overAllPastMonthRatingUser !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title="Users Overall Ratings"
          colorIconBackground="#6366F1"
          icon="/Usersw.svg"
          thisMonthvalue={overAllThisMonthRatingUser}
          pastMonthValue={overAllPastMonthRatingUser}
        />
      ) : null}

      {overAllThisMonthRatingDriver !== undefined &&
      overAllPastMonthRatingDriver !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title="Drivers Overall Ratings"
          colorIconBackground="#F97316"
          icon="/Driversw.svg"
          thisMonthvalue={overAllThisMonthRatingDriver}
          pastMonthValue={overAllPastMonthRatingDriver}
        />
      ) : null}

      {feedbackcollectedThisMonth !== undefined &&
      feedbackcollectedPastMonth !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title="Feedback collected"
          colorIconBackground="#F43F5E"
          icon="/FeedbackCollected.svg"
          thisMonthvalue={feedbackcollectedThisMonth}
          pastMonthValue={feedbackcollectedPastMonth}
        />
      ) : null}

      {PendingFeedbackThisMonth !== undefined &&
      PendingFeedbackPastMonth !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title="Pending Feedback"
          colorIconBackground="#A855F7"
          icon="/PendingFeedback.svg"
          thisMonthvalue={PendingFeedbackThisMonth}
          pastMonthValue={PendingFeedbackPastMonth}
        />
      ) : null}

      {FeedbackperDayThisMonth !== undefined &&
      FeedbackperDayPastMonth !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title="Feedback Per Day"
          colorIconBackground="#EAB308"
          icon="/FeedbackperDay.svg"
          thisMonthvalue={FeedbackperDayThisMonth}
          pastMonthValue={FeedbackperDayPastMonth}
        />
      ) : null}
    </StatContainer>
  );
}

export default RatingStats;
