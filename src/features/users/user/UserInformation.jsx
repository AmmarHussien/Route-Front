import styled, { css } from "styled-components";
import ButtonText from "../../../ui/ButtonText";
import { useMoveBack } from "../../../hooks/useMoveBack";
import UsersRecentRideTable from "./UserRecentRideTable";
import UserComplainsTable from "./UserComplainsTable";
import InformationItemTable from "./InformationItemTable";
import EditUser from "./EditUser";
import useUser from "../useUserInfo";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import UserInformationWithImage from "./UserInformationWithImage";
import BlockUser from "./BlockUser";
import Unblock from "./Unblock";

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

function UserInformation() {
  const moveBack = useMoveBack();

  const { userInfo, isLoading: userInfoLoading } = useUser();

  if (userInfoLoading) return <Spinner />;

  if (!userInfo) return <Empty resource="users" />;

  const {
    full_name,
    email,
    rides,
    phone,
    created_at,
    rate,
    balance,
    status,
    currency,
    profile_image,
    car: {
      manufacture: { manufacture },
      model: { model },
      registration_year,
    },
  } = userInfo;

  return (
    <>
      <Row type="horizontal" even={false}>
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
          <h1>User Information</h1>
        </Row>
        <Row type="horizontal">
          <EditUser />
          {status === "Blocked" ? <Unblock /> : <BlockUser />}
        </Row>
      </Row>

      <Row>
        <UserInformationWithImage
          even={true}
          data={{
            userName: full_name,
            email: email,
            MobileNumber: phone,
            JoiningDate: created_at,
            profileImage: profile_image,
          }}
          title="User's Info"
        />
        <InformationItemTable
          data={{
            CarMake: manufacture,
            CarModel: model,
            registrationYear: registration_year,
            TotalRating: rate,
            WalletBalance: { balance, currency },
          }}
          title="Activities Info"
        />
      </Row>

      <UsersRecentRideTable rides={rides} />

      <UserComplainsTable />
    </>
  );
}

export default UserInformation;
