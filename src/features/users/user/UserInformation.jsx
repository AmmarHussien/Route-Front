import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import UsersRecentRideTable from "./UserRecentRideTable";
import InformationItemTable from "./InformationItemTable";
import EditUser from "./EditUser";
import useUser from "../useUserInfo";
import Spinner from "../../../ui/Spinner";
import Empty from "../../../ui/Empty";
import UserInformationWithImage from "./UserInformationWithImage";
import BlockUser from "./BlockUser";
import Unblock from "./Unblock";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../../../ui/Button";
import Permission from "../../../ui/permission";

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
  const { userInfo, isLoading: userInfoLoading } = useUser();

  const moveBack = useMoveBack();

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

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
      manufacture: { name: manufacture },
      model: { model },
      registration_year,
    },
  } = userInfo;

  return (
    <>
      <Row type="horizontal" even={false}>
        <Row type="vertical">
          <Button onClick={moveBack}>
            {" "}
            {isRTL ? (
              <ArrowForwardIcon fontSize="large" />
            ) : (
              <ArrowBackIcon fontSize="large" />
            )}
          </Button>
        </Row>
        <Row type="horizontal">
          <Permission requiredPermissions="editUser">
            <EditUser />
          </Permission>
          <Permission requiredPermissions="editUserStatus">
            {status === "Blocked" ? <Unblock /> : <BlockUser />}
          </Permission>
        </Row>
      </Row>

      <Row>
        <UserInformationWithImage
          even={true}
          data={{
            [t("UserName")]: full_name,
            [t("UserEmail")]: email,
            [t("UserPhoneNumber")]: phone,
            [t("JoiningDate")]: created_at,
            ...(profile_image === " "
              ? { [t("profileImage")]: profile_image }
              : profile_image && { [t("profileImage")]: profile_image }),
          }}
          title={t("User'sInfo")}
        />
        <InformationItemTable
          data={{
            [t("UserCarBrands")]: manufacture,
            [t("UserCarModels")]: model,
            [t("UserModelYear")]: registration_year,
            [t("UserRate")]: rate,
            [t("WalletBalance")]: [balance, " ", currency],
          }}
          title={t("ActivitiesInfo")}
        />
      </Row>

      <UsersRecentRideTable rides={rides} />

      {/* <UserComplainsTable /> */}
    </>
  );
}

export default UserInformation;
