import RatingStat from "./RatingStat";

function RatingStats({
  overAllThisMonthRating,
  overAllPastMonthRating,
  feedbackcollectedThisMonth,
  feedbackcollectedPastMonth,
  PendingFeedbackThisMonth,
  PendingFeedbackPastMonth,
  FeedbackperDayThisMonth,
  FeedbackperDayPastMonth,
}) {
  return (
    <>
      {overAllThisMonthRating !== undefined &&
      overAllPastMonthRating !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title="Overall Ratings"
          colorIconBackground="#6366F1"
          icon="/OverAllRating.svg"
          thisMonthvalue={overAllThisMonthRating}
          pastMonthValue={overAllPastMonthRating}
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
          colorIconBackground="#F97316"
          icon="/PendingFeedback.svg"
          thisMonthvalue={PendingFeedbackThisMonth}
          pastMonthValue={PendingFeedbackPastMonth}
        />
      ) : null}

      {FeedbackperDayThisMonth !== undefined &&
      FeedbackperDayPastMonth !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title="Feedback per Day"
          colorIconBackground="#10B981"
          icon="/FeedbackperDay.svg"
          thisMonthvalue={FeedbackperDayThisMonth}
          pastMonthValue={FeedbackperDayPastMonth}
        />
      ) : null}
    </>
  );
}

export default RatingStats;
