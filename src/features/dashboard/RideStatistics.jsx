import styled from "styled-components";
import Heading from "../../ui/Heading";

import StatisticsItem from "./StatisticsItem";
import useStatistics from "./useStatistics";

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
  return (
    <>
      <StyledTextContainer>
        <Heading $variant="h6">Rides statistics</Heading>
        <Heading $variant="h5">
          Indication for the total rides over this month
        </Heading>
      </StyledTextContainer>
      <StyledContentContainer>
        <StatisticsItem
          icon="/Complete.svg"
          title={"Complete"}
          color="#20C992"
          statistics={statistics.completedRides}
        />
        <VerticalDivider />
        <StatisticsItem
          icon="/Ongoing.svg"
          title={"Ongoing"}
          color="#EAB308"
          statistics={statistics.ongoingRides}
        />
        <VerticalDivider />
        <StatisticsItem
          icon="/Cancelled.svg"
          title={"Cancelled"}
          color="#FC5555"
          statistics={statistics.cancelledRides}
        />
      </StyledContentContainer>
    </>
  );
}

export default RideStatistics;
