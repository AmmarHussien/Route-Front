import styled from "styled-components";
import RideStatistics from "./RideStatistics";
import DriverStatistecs from "./DriverStatistecs";

const Container = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  width: 340px;
  height: 235px;
  top: 165px;
  left: 768px;
  padding: 16px 16px 41px 16px;
  gap: 0px;
  border-radius: 24px;
  opacity: 0px;
  background: #ffffff;
  box-shadow: 0px 4px 15px 0px #27242414;
`;

function Statistics() {
  return (
    <Container>
      <StyledContainer>
        <RideStatistics />
      </StyledContainer>
      <StyledContainer>
        <DriverStatistecs />
      </StyledContainer>
    </Container>
  );
}

export default Statistics;
