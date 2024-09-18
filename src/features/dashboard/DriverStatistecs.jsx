import styled from "styled-components";
import Heading from "../../ui/Heading";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import StatistecsItem from "./StatistecsItem";
import useStatistics from "./useStatisctics";

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
function DriverStatistecs() {
  const { statistics } = useStatistics();

  return (
    <>
      <StyledTextContainer>
        <Heading variant="h6">Driver statistics</Heading>
        <Heading variant="h5">
          Indication for the total rides over this month
        </Heading>
      </StyledTextContainer>
      <StyledContentContainer>
        <StatistecsItem
          icon="/Complete.svg"
          title={"Aproved"}
          color="#20C992"
          statistecs={statistics.approvedDrivers}
        />
        <VerticalDivider />
        <StatistecsItem
          icon="/Pending.svg"
          title={"Pending"}
          color="#EAB308"
          statistecs={statistics.pendingDrivers}
        />
        <VerticalDivider />
        <StatistecsItem
          icon="/Blocked.svg"
          title={"Blocked"}
          color="#FC5555"
          statistecs={statistics.cancelledDrivers}
        />
      </StyledContentContainer>
    </>
  );
}

export default DriverStatistecs;
