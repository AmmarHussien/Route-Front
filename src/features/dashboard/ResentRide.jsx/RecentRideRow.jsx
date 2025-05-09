import { useTranslation } from "react-i18next";
import Table from "../../../ui/Table";
import styled, { css } from "styled-components";

const Status = styled.div`
  ${(props) =>
    props.$status === "Ongoing" &&
    css`
      color: #fe9e46;
    `}
  ${(props) =>
    props.$status === "Completed" &&
    css`
      color: #20c992;
    `}
  ${(props) =>
    props.$status === "Cancelled" &&
    css`
      color: #fc5555;
    `}
  ${(props) =>
    props.$status === "Pending" &&
    css`
      color: #fedf46;
    `}
  ${(props) =>
    props.$status === "Confirmed" &&
    css`
      color: #1e48a3;
    `}

    ${(props) =>
    props.$status === "Scheduled" &&
    css`
      color: #5c5223;
    `}
`;

const TableData = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 250px; /* Adjust the width as needed */
  margin: 0;
  padding: 0;
  position: relative;
`;

function RideRow({ ride }) {
  const { t } = useTranslation();

  return (
    <Table columns="0.4fr 1fr 1.6fr 1.6fr 1.2fr 0.8fr 0.5fr">
      <Table.Row>
        <p>{ride.id}</p>
        <p>{ride.driver}</p>
        <p>{ride.pickup_address}</p>
        <p>{ride.destination_address}</p>
        <p>{ride.created_at}</p>
        <p>
          {ride.price} {ride.currency}
        </p>
        <Status $status={ride.status}>{t(`Stat.${ride.status}`)}</Status>
      </Table.Row>
    </Table>
  );
}

export default RideRow;
