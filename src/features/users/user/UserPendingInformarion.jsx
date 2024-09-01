import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import InformationItemTable from "../../users/user/InformationItemTable";

import Spinner from "../../../ui/Spinner";
import UserInformationWithImage from "./UserInformationWithImage";
import useUser from "../useUserInfo";
import Empty from "../../../ui/Empty";
import AcceptUser from "./AcceptUser";
import RejectUser from "./RejectUser";

function UserPendingInformation() {
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
  const { userInfo, isLoading: userInfoLoading } = useUser();

  const moveBack = useMoveBack();

  if (userInfoLoading) return <Spinner />;

  if (!userInfo) return <Empty resource="users" />;

  const {
    full_name,
    email,
    phone,
    created_at,
    rate,
    balance,
    car: {
      manufacture: { manufacture },
      model: { model },
      registration_year,
    },
  } = userInfo;

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Users</ButtonText>
          <h1>User Information</h1>
        </Row>
      </Row>

      <Row>
        <UserInformationWithImage
          data={{
            userName: full_name,
            email: email,
            MobileNumber: phone,
            JoiningDate: created_at,
          }}
          title="User's Info"
        />
        <InformationItemTable
          data={{
            CarMake: manufacture,
            CarModel: model,
            registrationYear: registration_year,
            TotalRating: rate,
            WalletBalance: balance,
          }}
          title="Activities Info"
        />
      </Row>

      <Row type="horizontal">
        <AcceptUser />
        <RejectUser />
      </Row>
    </>
  );
}

export default UserPendingInformation;
