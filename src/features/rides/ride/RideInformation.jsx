import styled, { css } from "styled-components";
import { useMoveBack } from "../../../hooks/useMoveBack";
import ButtonText from "../../../ui/ButtonText";
import InternalNotes from "../../../ui/internalNotes/InternalNotes";
import RideInformationItemTable from "./RideInformationItemTable";
import useRideInfo from "./useRideInfo";
import Spinner from "../../../ui/Spinner";
import MapRide from "./MapRide";

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

  const { isLoading, rideInfo } = useRideInfo();

  if (isLoading) return <Spinner />;

  const {
    id = "N/A",
    driver_name = "Unknown Driver",
    user_name = "Unknown User",
    pickup_date = "Not Available",
    drop_off_date = "Not Available",
    amount_to_pay = 0,
    review = {}, // Destructure review but check manually below
    location: {
      pickup_latitude = null,
      pickup_longitude = null,
      pickup_address = "Unknown Pickup Location",
      destination_latitude = null,
      destination_longitude = null,
      destination_address = "Unknown Destination Location",
    } = {}, // Default to empty object to avoid destructuring errors
    distance_between_points = 0,
    currency = "",
    service: { name: serviceName = "Unknown Service" } = {}, // Default to empty object
    car_type: { name: carTypeName = "Unknown Car Type" } = {}, // Default to empty object
    notes,
  } = rideInfo || {}; // Default to an empty object if rideInfo is undefined or null

  // Manually assign defaults if 'review' is null or doesn't have rate/review properties
  const { rate = "No rating", review: reviewText = "No review" } = review || {};

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Rides</ButtonText>
        </Row>
      </Row>
      <Row>
        <RideInformationItemTable
          data={{
            rideId: id || "N/A", // Fallback to 'N/A' if id is missing
            userName: user_name || "Unknown User", // Fallback to 'Unknown User'
            driverName: driver_name || "Unknown Driver", // Fallback to 'Unknown Driver'
            pickUpDate: pickup_date || "Not Available", // Fallback to 'Not Available'
            dropOffDate: drop_off_date || "Not Available", // Fallback to 'Not Available'
            price: amount_to_pay
              ? [amount_to_pay, " ", currency ?? ""]
              : ["Price not available"], // Fallback for missing price or currency
            rate: rate ?? "No rating", // Fallback to 'No rating'
            review: reviewText ?? "No review", // Fallback to 'No review'
          }}
          title="Basic Information"
        />

        <RideInformationItemTable
          data={{
            service: serviceName,
            carType: carTypeName,
            pickUpAddress: pickup_address,
            dropOffAddress: destination_address,
            distance: [distance_between_points, " ", "Km"],
          }}
          title="Ride Information"
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
        title="Map Route"
        isLoading={isLoading}
      />

      <InternalNotes notes={notes} />
    </>
  );
}

export default RideInformation;
