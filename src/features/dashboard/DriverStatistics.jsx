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
function DriverStatistics() {
  const { statistics } = useStatistics();
  const { t } = useTranslation();

  return (
    <>
      <StyledTextContainer>
        <Heading $variant="h6">{t("DriverStatistics")}</Heading>
        <Heading $variant="h5">{t("DriverStatisticsSlogan")} </Heading>
      </StyledTextContainer>
      <StyledContentContainer>
        <StatisticsItem
          icon="/Complete.svg"
          title={t("Approved")}
          color="#20C992"
          statistics={statistics.approvedDrivers}
        />
        <VerticalDivider />
        <StatisticsItem
          icon="/Pending.svg"
          title={t("Pending")}
          color="#EAB308"
          statistics={statistics.pendingDrivers}
        />
        <VerticalDivider />
        <StatisticsItem
          icon="/Blocked.svg"
          title={t("Blocked")}
          color="#FC5555"
          statistics={statistics.cancelledDrivers}
        />
      </StyledContentContainer>
    </>
  );
}

export default DriverStatistics;
