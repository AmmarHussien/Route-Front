import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import styled, { css } from "styled-components";

const Status = styled.div`
  ${(props) =>
    props.$status === "Suspended" &&
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
`;

function RidesRow({ RideInfo }) {
  const navigete = useNavigate();
  const {
    id,
    driver: driverName,
    user: userName,
    created_at: dateAndTime,
    price,
    status,
  } = RideInfo;

  function handleClick() {
    navigete(`/adminpanel/rides/ride-information/${id}`);

    // Add your click handling logic here
  }

  return (
    <Table columns="0.4fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Row>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {id}
        </div>
        <div>{driverName}</div>
        <div>{userName}</div>
        <div>{dateAndTime}</div>
        <div>{price}</div>
        <Status $status={status}>{status}</Status>
      </Table.Row>
    </Table>
  );
}

export default RidesRow;
