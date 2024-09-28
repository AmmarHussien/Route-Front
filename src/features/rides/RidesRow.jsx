import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
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
    props.$status === "Scheduled" &&
    css`
      color: #2405ec;
    `}
`;

function RidesRow({ RideInfo }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = searchParams.get("status");

  const {
    id,
    driver: driverName,
    user: userName,
    created_at: createdDate,
    scheduled_date,
    price,
    status,
  } = RideInfo;

  function handleClick() {
    navigate(`/adminPanel/rides/ride-information/${id}`);

    // Add your click handling logic here
  }

  return (
    <Table columns="0.4fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Row>
        {params === "All" || params === null ? (
          <div>{id}</div>
        ) : (
          <div onClick={handleClick} style={{ cursor: "pointer" }}>
            {id}
          </div>
        )}

        <div>{driverName}</div>
        <div>{userName}</div>
        <div>{createdDate}</div>
        {params === "Scheduled" ? (
          <div>{scheduled_date}</div>
        ) : (
          <div>{price}</div>
        )}

        <Status $status={status}>{status}</Status>
      </Table.Row>
    </Table>
  );
}

export default RidesRow;
