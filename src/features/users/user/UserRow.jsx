import { useNavigate } from "react-router-dom";
import Table from "../../../ui/Table";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

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
    props.$status === "Scheduled" &&
    css`
      color: #5c5223;
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
  const { t } = useTranslation();

  const navigate = useNavigate();

  // console.log(userInfo);

  const driverId = userInfo.driver?.id ?? "";
  const fullName = userInfo.driver?.full_name ?? "";
  const {
    pickup_address,
    destination_address,
    created_at,
    price,
    status,
    rate,
    currency,
  } = userInfo; // Ensure userInfo is never null or undefined

  function handleClick() {
    navigate(`/drivers/driver-information/${driverId}`);
    // Add your click handling logic here
  }

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Table.Row>
          <div>{fullName}</div>
          <div>{pickup_address}</div>
          <div>{destination_address}</div>
          <div>{created_at}</div>
          <div>
            {price} {currency}
          </div>
          <Status $status={status}>{t(`Stat.${userInfo.status}`)}</Status>
          <div>{rate}</div>
        </Table.Row>
      </div>
    </Table>
  );
}

export default UserRow;
