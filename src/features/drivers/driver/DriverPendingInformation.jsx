import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";

import useDriver from "./useDriver";
import Spinner from "../../../ui/Spinner";
import { useParams } from "react-router-dom";
import DriverInformationWithImage from "./DriverInformationWithImage";
import AcceptDriver from "./AcceptDriver";
import RejectDriver from "./RejectDriver";

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

function DriverPendingInformation() {
  const moveBack = useMoveBack();
  //const navigate = useNavigate();

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
    criminal_record,
    vehicle_license,
    vehicle_image,
    tow_truck_registration,
    car_spec,
    organization,
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
            userName: full_name || "",
            email: email || "",
            mobileNumber: phone || "",
            ...(organization != null
              ? { organization: organization.name }
              : organization && { organization: organization }),
            ...(profile_image === " "
              ? { profileImage: profile_image }
              : profile_image && { profileImage: profile_image }),
            ...(national_id === " "
              ? { nationalId: national_id }
              : national_id && { nationalId: national_id }),
            ...(driver_license === " "
              ? { driverLicense: driver_license }
              : driver_license && { driverLicense: driver_license }),
            ...(criminal_record === " "
              ? { criminalRecord: criminal_record }
              : criminal_record && { criminalRecord: criminal_record }),
          }}
          title="Drivers's Info"
        />
        <DriverInformationWithImage
          data={{
            ...(vehicle_image === " "
              ? { carImage: vehicle_image }
              : vehicle_image && { carImage: vehicle_image }),
            ...(vehicle_license === " "
              ? { carLicenseExpiry: vehicle_license }
              : vehicle_license && { carLicenseExpiry: vehicle_license }),
            ...(tow_truck_registration === " "
              ? { towTruckRegistration: tow_truck_registration }
              : tow_truck_registration && {
                  towTruckRegistration: tow_truck_registration,
                }),
            codeForCostPerKm: "10$" || "",
            ...(car_spec === " "
              ? { vehicleSpec: car_spec }
              : car_spec && { vehicleSpec: car_spec }),
          }}
          title="Car Info"
        />
      </Row>

      <Row type="horizontal">
        <AcceptDriver />
        <RejectDriver />
      </Row>
    </>
  );
}

export default DriverPendingInformation;
