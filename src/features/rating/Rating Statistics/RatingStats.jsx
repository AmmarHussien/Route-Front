import styled from "styled-components";
import RatingStat from "./RatingStat";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <StatContainer>
      {overAllThisMonthRatingUser !== undefined &&
      overAllPastMonthRatingUser !== undefined ? (
        <RatingStat
          backgroundColor="#FFFFFF"
          title={t("UsersOverallRatings")}
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
          title={t("DriversOverallRatings")}
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
