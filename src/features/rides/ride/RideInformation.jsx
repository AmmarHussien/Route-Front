import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import InternalNotes from "../../../ui/internalNotes/InternalNotes";
import RideInformationItemTable from "./RideInformationItemTable";
import useRideInfo from "./useRideInfo";
import Spinner from "../../../ui/Spinner";
import MapRide from "./MapRide";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import Button from "../../../ui/Button";

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
    props.$even &&
    css`
      background-color: #f0f0f0;
    `}
`;

function RideInformation() {
  const moveBack = useMoveBack();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";

  const { isLoading, rideInfo } = useRideInfo();

  if (isLoading) return <Spinner />;

  const {
    id = "N/A",
    driver_name = "Unknown Driver",
    user_name = "Unknown User",
    pickup_date = "Not Available",
    drop_off_date = "Not Available",
    amount_to_pay = 0,
    review = {}, // Destructure review, manual checks for review content if needed
    location: {
      pickup_latitude = null,
      pickup_longitude = null,
      pickup_address = "Unknown Pickup Location",
      destination_latitude = null,
      destination_longitude = null,
      destination_address = "Unknown Destination Location",
    } = {}, // Default location to an empty object to avoid destructuring errors
    distance_between_points = 0,
    currency = "",
    service = {}, // Default service to an empty object
    car_type = {}, // Default car_type to an empty object
    notes,
  } = rideInfo || {}; // Default to an empty object if rideInfo is undefined or null

  // Safely get the names from service and car_type objects
  const serviceName = service?.name || "Unknown Service";
  const carTypeName = car_type?.name || "Unknown Car Type";

  // Manually assign defaults if 'review' is null or doesn't have rate/review properties
  const { rate = "No rating", review: reviewText = "No review" } = review || {};

  return (
    <>
      <Row type="horizontal">
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
      </Row>
      <Row>
        <RideInformationItemTable
          data={{
            [t("RideId")]: id || "N/A", // Fallback to 'N/A' if id is missing
            [t("UserName")]: user_name || "Unknown User", // Fallback to 'Unknown User'
            [t("DriverName")]: driver_name || "Unknown Driver", // Fallback to 'Unknown Driver'
            [t("PickUpDate")]: pickup_date || "Not Available", // Fallback to 'Not Available'
            [t("DropOffDate")]: drop_off_date || "Not Available", // Fallback to 'Not Available'
            [t("Price")]: amount_to_pay
              ? [amount_to_pay, " ", currency ?? ""]
              : ["Price not available"], // Fallback for missing price or currency
            [t("Rate")]: rate ?? "No rating", // Fallback to 'No rating'
            [t("Review")]: reviewText ?? "No review", // Fallback to 'No review'
          }}
          title={t("BasicInformation")}
        />

        <RideInformationItemTable
          data={{
            [t("Service")]: serviceName,
            [t("CarType")]: carTypeName,
            [t("PickUpAddress")]: pickup_address,
            [t("DropOffAddress")]: destination_address,
            [t("Distance")]: [
              distance_between_points,
              " ",
              isRTL ? "ك.م" : "Km",
            ],
          }}
          title={t("RideInformation")}
        />
      </Row>
      <MapRide
        data={{
          viewOnMap: [
            pickup_latitude,
            pickup_longitude,
            destination_latitude,
            destination_longitude,
          ],
        }}
        title={t("MapRoute")}
        isLoading={isLoading}
      />

      <InternalNotes notes={notes} />
    </>
  );
}

export default RideInformation;
