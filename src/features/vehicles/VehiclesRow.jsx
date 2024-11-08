import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import styled, { css } from "styled-components";

function VehiclesRow({ userInfo }) {
  const navigate = useNavigate();

  const { id, modal, owner, licenseExpiry, status } = userInfo;

  function handleClick() {
    navigate(`/Vehicle-information/${id}`);
    // Add your click handling logic here
  }
  const Div = styled.div`
    ${(props) =>
      props.as === "pending" &&
      css`
        color: #fe9e46;
      `}
    ${(props) =>
      props.as === "active" &&
      css`
        color: #20c992;
      `}
      ${(props) =>
      props.as === "outOfService" &&
      css`
        color: #fc5555;
      `}
  `;

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr ">
      <Table.Row>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {id}
        </div>

        <div>{modal}</div>
        <div>{owner}</div>
        <div>{licenseExpiry}</div>
        {status === "pending" ? (
          <Div as="pending">{status}</Div>
        ) : status === "active" ? (
          <Div as="active">{status}</Div>
        ) : status === "out Of Service" ? (
          <Div as="outOfService">{status}</Div>
        ) : null}
      </Table.Row>
    </Table>
  );
}

export default VehiclesRow;
