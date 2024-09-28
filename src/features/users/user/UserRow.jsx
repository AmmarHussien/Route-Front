import { useNavigate } from "react-router-dom";
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

function UserRow({ userInfo }) {
  const navigate = useNavigate();

  const {
    driver: { id: driverId, full_name },
    pickup_address,
    destination_address,
    created_at,
    price,
    status,
    rate,
    currency,
  } = userInfo;

  function handleClick() {
    navigate(`/adminPanel/driver-information/${driverId}`);
    // Add your click handling logic here
  }

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Row>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {full_name}
        </div>
        <div>{pickup_address}</div>
        <div>{destination_address}</div>
        <div>{created_at}</div>
        <div>
          {price} {currency}
        </div>
        <Status $status={status}>{status}</Status>
        <div>{rate}</div>
      </Table.Row>
    </Table>
  );
}

export default UserRow;
