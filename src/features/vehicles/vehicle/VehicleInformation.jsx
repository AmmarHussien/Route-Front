import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import VehicleInformationItemTable from "./VehicleInformationItemTable";

const MapData = {
  PlateNo: 112244,
  src: "/map.png",
};

const ownerData = {
  ownerName: "Ammar",
  email: "test@test.com",
  mobileNumber: "01146082989",
  idNumber: "23705010101853",
  licenseExpiryDate: "29/01/2024",
  joiningDate: "29/01/2024",
};

const vehicleData = {
  carLicenseExpiry: "29/01/2024",
  codeForCostPerKm: 80,
  vehicleSpec:
    "4 Seats, 2 Doors, Electric, Automatic, 30000 - 50000 KM, Gray, Coupe",
};

function VehicleInformation() {
  const Row = styled.div`
    display: flex;

    ${(props) =>
      props.type === "horizontal" &&
      css`
        justify-content: space-between;
        align-items: start;
        gap: 10px;
      `}

    ${(props) =>
      props.type === "vertical" &&
      css`
        justify-content: space-between;
        flex-direction: column;
        gap: 1.6rem;
        align-items: start;
        width: 100%;
      `}
  `;
  const moveBack = useMoveBack();
  //const navigete = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Vehicles</ButtonText>
          <h1>Vehicle Information</h1>
        </Row>
      </Row>

      <Row type="horizontal">
        <Row type="vertical">
          <VehicleInformationItemTable data={ownerData} title="Owner Info" />
          <VehicleInformationItemTable
            data={vehicleData}
            title="Vehicle Info"
          />
        </Row>

        <VehicleInformationItemTable
          data={MapData}
          title="Alfa Romeo 4C - 2022"
        />
      </Row>
    </>
  );
}

export default VehicleInformation;
