import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";

import useDriver from "./useDriver";
import Spinner from "../../../ui/Spinner";
import { useParams } from "react-router-dom";
import DriverInformationWithImage from "./DriverInformationWithImage";
import AcceptDriver from "./AcceptDriver";
import RejectDriver from "./RejectDriver";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  //const navigate = useNavigate();

  const { userId } = useParams(); // Extract userId from the URL

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
          <ButtonText onClick={moveBack}>
            {" "}
            {isRTL ? "→" : "←"} {t("Back")}
          </ButtonText>
        </Row>
      </Row>

      <Row>
        <DriverInformationWithImage
          data={{
            [t("UserName")]: full_name || "",
            [t("UserEmail")]: email || "",
            [t("UserPhoneNumber")]: phone || "",
            ...(organization != null
              ? { [t("DriverOrganization")]: organization.name }
              : organization && { [t("DriverOrganization")]: organization }),
            ...(profile_image === " "
              ? { [t("profileImage")]: profile_image }
              : profile_image && { [t("profileImage")]: profile_image }),
            ...(national_id === " "
              ? { [t("DriverNationalId")]: national_id }
              : national_id && { [t("DriverNationalId")]: national_id }),
            ...(driver_license === " "
              ? { [t("DriverLicense")]: driver_license }
              : driver_license && {
                  [t("DriverLicense")]: driver_license,
                }),
            ...(criminal_record === " "
              ? { [t("DriverCriminalRecord")]: criminal_record }
              : criminal_record && {
                  [t("DriverCriminalRecord")]: criminal_record,
                }),
          }}
          title={t("Drivers'sInfo")}
        />
        <DriverInformationWithImage
          data={{
            ...(vehicle_image === " "
              ? { [t("DriverVehicleImage")]: vehicle_image }
              : vehicle_image && { [t("DriverVehicleImage")]: vehicle_image }),
            ...(vehicle_license === " "
              ? { [t("DriverVehicleLicense")]: vehicle_license }
              : vehicle_license && {
                  [t("DriverVehicleLicense")]: vehicle_license,
                }),
            ...(tow_truck_registration === " "
              ? { [t("DriverTowTruckRegistration")]: tow_truck_registration }
              : tow_truck_registration && {
                  [t("DriverTowTruckRegistration")]: tow_truck_registration,
                }),

            [t("codeForCostPerKm")]: "10$" || "",
            ...(car_spec === " "
              ? { [t("DriverCarSpec")]: car_spec }
              : car_spec && { [t("DriverCarSpec")]: car_spec }),
          }}
          title={t("CarInfo")}
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
