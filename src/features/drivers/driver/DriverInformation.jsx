import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
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
    total_site_commission,
  } = driverData;

  if (isLoading) return <Spinner />;

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
          <Permission requiredPermissions="createDriver">
            <EditDriver />
          </Permission>

          <Permission requiredPermissions="editDriverStatus">
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
          </Permission>
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
            // [t("CreditBalance")]: [0, " ", currency],
            [t("TotalRating")]: total_rating,
            [t("TotalRides")]: total_rides,
            [t("TotalEarning")]: [total_earning, " ", currency],
            [t("TotalPoints")]: 0,
            [t("TotalSiteCommission")]: [total_site_commission, " ", currency],
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
