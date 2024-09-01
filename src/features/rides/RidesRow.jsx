import { useNavigate } from "react-router-dom";
import Table from "../../ui/Table";
import styled, { css } from "styled-components";

function RidesRow({ userInfo }) {
  const navigete = useNavigate();
  const { id, driverName, userName, dateAndTime, price, status } = userInfo;

  function handleClick() {
    navigete(`/adminpanel/ride-information/${id}`);

    // Add your click handling logic here
  }
  const Div = styled.div`
    ${(props) =>
      props.as === "ongoing" &&
      css`
        color: #fe9e46;
      `}
    ${(props) =>
      props.as === "completed" &&
      css`
        color: #20c992;
      `}
      ${(props) =>
      props.as === "cancelled" &&
      css`
        color: #fc5555;
      `}
  `;

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Row>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {id}
        </div>
        <div>{driverName}</div>
        <div>{userName}</div>
        <div>{dateAndTime}</div>
        <div>{price}</div>
        {status === "On Going" ? (
          <Div as="ongoing">{status}</Div>
        ) : status === "completed" ? (
          <Div as="completed">{status}</Div>
        ) : status === "cancelled" ? (
          <Div as="cancelled">{status}</Div>
        ) : null}
      </Table.Row>
    </Table>
  );
}

export default RidesRow;
