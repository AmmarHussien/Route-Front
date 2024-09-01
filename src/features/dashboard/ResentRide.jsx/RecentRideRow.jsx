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
`;

const TableData = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 250px; /* Adjust the width as needed */
  margin: 0;
  padding: 0;
  position: relative;

  /* Tooltip effect */
  &:hover {
    overflow: "auto";
    white-space: normal;
  }

  &:hover::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 100%;
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    background: #fff;
    border: 1px solid #ccc;
    padding: 5px;
    z-index: 2;
    max-width: 300px; /* Adjust the tooltip width as needed */
    word-wrap: break-word;
  }
`;

function RideRow({ ride }) {
  return (
    <Table columns="0.4fr 1fr 1.6fr 1.6fr 1.2fr 0.8fr 0.5fr">
      <Table.Row>
        <p>{ride.id}</p>
        <p>{ride.driver}</p>

        <TableData>{ride.pickup_address}</TableData>

        <TableData>{ride.destination_address}</TableData>
        <p>{ride.created_at}</p>
        <p>{ride.price}</p>
        <Status $status={ride.status}>{ride.status}</Status>
      </Table.Row>
    </Table>
  );
}

export default RideRow;
