import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
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

function RidesRow({ RideInfo }) {
  const { t } = useTranslation();

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
    currency,
  } = RideInfo;

  function handleClick() {
    navigate(`/rides/ride-information/${id}`);

    // Add your click handling logic here
  }

  return (
    <Table columns="0.4fr 1fr 1fr 1fr 1fr 1fr">
      {params === "All" || params === null ? (
        <Table.Row>
          <div>{id}</div>

          <div>{driverName}</div>
          <div>{userName}</div>
          <div>{createdDate}</div>
          {params === "Scheduled" ? (
            <div>{scheduled_date}</div>
          ) : (
            <div>
              {price} {currency}
            </div>
          )}

          <Status $status={status}>{t(`Stat.${status}`)}</Status>
        </Table.Row>
      ) : (
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          <Table.Row>
            <div> {id}</div>

            <div>{driverName}</div>
            <div>{userName}</div>
            <div>{createdDate}</div>
            {params === "Scheduled" ? (
              <div>{scheduled_date}</div>
            ) : (
              <div>
                {price} {currency}
              </div>
            )}

            <Status $status={status}>{t(`Stat.${status}`)}</Status>
          </Table.Row>
        </div>
      )}
    </Table>
  );
}

export default RidesRow;
