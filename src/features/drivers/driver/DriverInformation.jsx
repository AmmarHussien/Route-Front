import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import EditDriver from "./EditDriver";
import BlockDriver from "./BlockDriver";
import InformationItemTable from "./InformationItemTable";
import InternalNotes from "../../../ui/internalNotes/InternalNotes";
import useDriver from "./useDriver";
import { useParams } from "react-router-dom";
import Spinner from "../../../ui/Spinner";
import DriverInformationWithImage from "./DriverInformationWithImage";
import RecentRideTable from "./RecentRideTable";
import Unblock from "./Unblock";
import SuspendedDriver from "./Suspended";
import UnSuspended from "./Unsuspend";
import { useTranslation } from "react-i18next";

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

  const { userId } = useParams(); // Extract userId from the URL

  const { isLoading, driverData } = useDriver(userId);

  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

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
    total_rating,
    total_rides,
    total_earning,
    currency,
  } = driverData;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal" even={false}>
        <Row type="vertical">
          <ButtonText onClick={moveBack}>
            {" "}
            {isRTL ? "→" : "←"} {t("Back")}
          </ButtonText>
        </Row>
        <Row type="horizontal">
          <EditDriver />

          {status === "Suspended" ? null : status === "Blocked" ? (
            <Unblock />
          ) : (
            <BlockDriver />
          )}
          {status === "Blocked" ? null : status === "Suspended" ? (
            <UnSuspended />
          ) : (
            <SuspendedDriver />
          )}
        </Row>
      </Row>

      <Row>
        <DriverInformationWithImage
          even={false}
          data={{
            [t("UserName")]: full_name,
            [t("UserEmail")]: email,
            [t("UserPhoneNumber")]: phone,
            [t("profileImage")]: profile_image,
            [t("DriverNationalId")]: national_id,
            [t("DriverLicense")]: driver_license,
            [t("JoiningDate")]: created_at,
          }}
          title={t("Drivers'sInfo")}
        />
        <InformationItemTable
          data={{
            [t("CreditBalance")]: [0, " ", currency],
            [t("TotalRating")]: total_rating,
            [t("TotalRides")]: total_rides,
            [t("TotalEarning")]: [total_earning, " ", currency],
            [t("TotalPoints")]: 0,
          }}
          title={t("ActivitiesInfo")}
        />
      </Row>

      <RecentRideTable rides={rides} />

      {/* <DriverComplainsTable /> */}

      <InternalNotes notes={notes} />
    </>
  );
}

export default DriverInformation;
