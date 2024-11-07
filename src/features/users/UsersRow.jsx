import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";

const Status = styled.div`
  ${(props) =>
    props.$status === "Suspended" &&
    css`
      color: #fe9e46;
    `}
  ${(props) =>
    props.$status === "Approved" &&
    css`
      color: #20c992;
    `}
  ${(props) =>
    props.$status === "Blocked" &&
    css`
      color: #fc5555;
    `}
  ${(props) =>
    props.$status === "Pending" &&
    css`
      color: #fedf46;
    `}
`;

function UsersRow({ userInfo }) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleClick() {
    navigate(`/adminPanel/users/user-information/${userInfo.id}`);

    // Add your click handling logic here
  }

  const isBlocked = searchParams.get("status") === "Blocked";

  const columns = isBlocked
    ? "0.4fr 1fr 1fr 1.2fr 0.8fr 0.8fr 0.6fr 0.6fr"
    : "0.4fr 1fr 1.2fr 1.2fr 0.8fr 0.6fr 0.6fr";

  return (
    <Table columns={columns}>
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Table.Row>
          <div> {userInfo.id}</div>
          <div>{userInfo.full_name}</div>

          {searchParams.get("status") === "Blocked" && (
            <div>
              {userInfo.blocked_reason === "" ? "N/A" : userInfo.blocked_reason}
            </div>
          )}
          <div>{userInfo.phone}</div>
          <div>{userInfo.email}</div>

          <div>{userInfo.num_rides}</div>
          <div>{userInfo.rate}</div>
          <Status $status={userInfo.status}>
            {t(`Stat.${userInfo.status}`)}
          </Status>
        </Table.Row>
      </div>
    </Table>
  );
}

export default UsersRow;
