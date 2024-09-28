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
          thisMonthValue={overAllThisMonthRatingUser}
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
          thisMonthValue={overAllThisMonthRatingDriver}
          pastMonthValue={overAllPastMonthRatingDriver}
        />
      ) : null}
    </StatContainer>
  );
}

export default RatingStats;
