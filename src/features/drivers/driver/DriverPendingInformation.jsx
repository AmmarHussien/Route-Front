import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import InformationItemTable from "../../users/user/InformationItemTable";

import useDriver from "./useDriver";
import Spinner from "../../../ui/Spinner";
import { useParams } from "react-router-dom";
import DriverInformationWithImage from "./DriverInformationWithImage";
import AcceptDriver from "./AcceptDriver";
import RejectDriver from "./RejectDriver";

const VehicleInfo = {
  CarLicenseExpiry: 1500,
  TowTruckRegisterion: 5,
  CodeForCostPerKm: 150,
  VehicleSpec: `4 Seats Electric Automatic 30000 - 50000 KM Gray`,
};

function DriverPendingInformation() {
  const Row = styled.div`
    display: flex;

    ${(props) =>
      props.type === "horizontal" &&
      css`
        //justify-content: space-between;
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

  const { userId } = useParams(); // Extract userId from the URL

  //console.log("Driver ID:", userId); // Logs the userId

  const { isLoading, driverData } = useDriver(userId);

  if (isLoading) return <Spinner />;

  const {
    full_name,
    email,
    phone,
    national_id,
    driver_license,

    profile_image,
  } = driverData;
  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Drivers</ButtonText>
          <h1>Driver Information</h1>
        </Row>
      </Row>

      <Row>
        <DriverInformationWithImage
          data={{
            userName: full_name,
            email: email,
            mobileNumber: phone,
            profileImage: profile_image,
            nationalId: national_id,
            driverLicense: driver_license,
          }}
          title="Drivers's Info"
        />
        <InformationItemTable data={VehicleInfo} title="Activities Info" />
      </Row>

      <Row type="horizontal">
        <AcceptDriver />
        <RejectDriver />
      </Row>
    </>
  );
}

export default DriverPendingInformation;
