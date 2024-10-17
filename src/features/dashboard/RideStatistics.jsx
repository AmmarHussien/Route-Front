import styled from "styled-components";
import Heading from "../../ui/Heading";

import StatisticsItem from "./StatisticsItem";
import useStatistics from "./useStatistics";
import { useTranslation } from "react-i18next";

const StyledTextContainer = styled.div`
  top: 16px;
  left: 16px;
  gap: 8px;
  opacity: 0px;
  display: flex;
  flex-direction: column;
`;

const StyledContentContainer = styled.div`
  top: 101px;
  left: 16px;
  gap: 16px;
  opacity: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const VerticalDivider = styled.div`
  height: 83px; // Adjust height as needed
  width: 1px;
  background-color: gray;
  margin: 0 10px; // Adjust margin as needed
`;
function RideStatistics() {
  const { statistics } = useStatistics();
  const { t } = useTranslation();

  return (
    <>
      <StyledTextContainer>
        <Heading $variant="h6">{t("RidesStatistics")}</Heading>
        <Heading $variant="h5">{t("RidesStatisticsSlogan")} </Heading>
      </StyledTextContainer>
      <StyledContentContainer>
        <StatisticsItem
          icon="/Complete.svg"
          title={t("Complete")}
          color="#20C992"
          statistics={statistics.completedRides}
        />
        <VerticalDivider />
        <StatisticsItem
          icon="/Ongoing.svg"
          title={t("Ongoing")}
          color="#EAB308"
          statistics={statistics.ongoingRides}
        />
        <VerticalDivider />
        <StatisticsItem
          icon="/Cancelled.svg"
          title={t("Cancelled")}
          color="#FC5555"
          statistics={statistics.cancelledRides}
        />
      </StyledContentContainer>
    </>
  );
}

export default RideStatistics;
