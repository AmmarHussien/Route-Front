import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import InternalNotes from "../../../ui/internalNotes/InternalNotes";
import RideInformationItemTable from "./RideInformationItemTable";

const MapData = {
  src: "/map.png",
};

const RideData = {
  rideId: 11411,
  userName: "John Doe",
  driverName: "Miimz",
  pickUpDate: "29/01/2024 10:42 PM",
  dropOffDate: "29/01/2024 12:42 PM",
  price: "400",
  rideRate: "1",
  review: "n/a",
};

function RideInformation() {
  const Row = styled.div`
    display: flex;

    ${(props) =>
      props.type === "horizontal" &&
      css`
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      `}

    ${(props) =>
      props.type === "vertical" &&
      css`
        flex-direction: column;
        //gap: 1.6rem;
        align-items: start;
      `}
  `;
  const moveBack = useMoveBack();
  //const navigete = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Rides</ButtonText>
          <h1>Ride Information</h1>
        </Row>
      </Row>

      <Row>
        <RideInformationItemTable data={RideData} title="Basic Info" />
        <RideInformationItemTable data={MapData} />
      </Row>

      <InternalNotes />
    </>
  );
}

export default RideInformation;
