import { useNavigate, useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import styled, { css } from "styled-components";

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

function DriversRow({ driverInfo }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleClick() {
    const status = searchParams.get("status");

    // Navigate based on status
    if (status === "All" || status === null) {
    } else if (status === "Pending") {
      navigate(`/adminpanel/driver-pending-information/${driverInfo.id}`);
    } else {
      navigate(`/adminpanel/driver-information/${driverInfo.id}`);
    }

    // Update search parameters in the URL
  }

  const columns =
    searchParams.get("status") === "Blocked"
      ? "0.4fr 1fr 1fr 1fr 1fr 1fr"
      : "0.4fr 1fr 1fr 1fr 1fr";

  return (
    <Table columns={columns}>
      <Table.Row>
        {searchParams.get("status") === "All" ||
        searchParams.get("status") === null ? (
          <>
            <div>{driverInfo.id}</div>
            <div>{driverInfo.full_name}</div>
          </>
        ) : (
          <>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              {driverInfo.id}
            </div>
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              {driverInfo.full_name}
            </div>
          </>
        )}

        {searchParams.get("status") === "Blocked" && (
          <div>
            {driverInfo.blocked_reason === ""
              ? "N/A"
              : driverInfo.blocked_reason}
          </div>
        )}

        <div>{driverInfo.email}</div>
        <div>{driverInfo.phone}</div>
        <Status $status={driverInfo.status}>{driverInfo.status}</Status>
      </Table.Row>
    </Table>
  );
}
export default DriversRow;
