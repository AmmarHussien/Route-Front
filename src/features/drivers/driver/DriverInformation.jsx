import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import EditDriver from "./EditDriver";
import DriverComplainsTable from "./DriverComplainsTable";
import BlockDriver from "./BlockDriver";
import InformationItemTable from "./InformationItemTable";
import InternalNotes from "../../../ui/internalNotes/InternalNotes";
import useDriver from "./useDriver";
import { useParams } from "react-router-dom";
import Spinner from "../../../ui/Spinner";
import DriverInformationWithImage from "./DriverInformationWithImage";
import RecentRideTable from "./RecentRideTable";
import Unblock from "./Unblock";

const ActivityData = {
  CreditBalance: 1500,
  TotalRating: 5,
  TotalRides: 150,
  TotalEarning: 5500,
  TotalPoints: 100,
};

const Row = styled.div.withConfig({
  shouldForwardProp: (prop) => !["even"].includes(prop),
})`
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
      align-items: start;
    `}
  ${(props) =>
    props.even &&
    css`
      background-color: #f0f0f0;
    `}
`;

function DriverInformation() {
  const moveBack = useMoveBack();
  //const navigete = useNavigate();

  const { userId } = useParams(); // Extract userId from the URL

  const { isLoading, driverData } = useDriver(userId);

  if (isLoading) return <Spinner />;

  const {
    full_name,
    email,
    phone,
    national_id,
    driver_license,
    created_at,
    profile_image,
    notes,
    rides,
    status,
  } = driverData;

  return (
    <>
      <Row type="horizontal" even={false}>
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          <h1>Driver Information</h1>
        </Row>
        <Row type="horizontal">
          <EditDriver />
          {status === "Blocked" ? <Unblock /> : <BlockDriver />}
        </Row>
      </Row>

      <Row>
        <DriverInformationWithImage
          even={false}
          data={{
            userName: full_name,
            email: email,
            mobileNumber: phone,
            profileImage: profile_image,
            nationalId: national_id,
            driverLicense: driver_license,
            joiningDate: created_at,
          }}
          title="Drivers's Info"
        />
        <InformationItemTable data={ActivityData} title="Activities Info" />
      </Row>

      <RecentRideTable rides={rides} />

      <DriverComplainsTable />

      <InternalNotes notes={notes} />
    </>
  );
}

export default DriverInformation;
