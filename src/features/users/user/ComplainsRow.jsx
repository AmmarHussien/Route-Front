import Table from "../../../ui/Table";
import styled, { css } from "styled-components";

const StatusDiv = styled.div.withConfig({
  shouldForwardProp: (prop) => !["even"].includes(prop),
})`
  ${(props) =>
    props.status === "ongoing" &&
    css`
      color: #fe9e46;
    `}
  ${(props) =>
    props.status === "completed" &&
    css`
      color: #20c992;
    `}
  ${(props) =>
    props.status === "cancelled" &&
    css`
      color: #fc5555;
    `}
`;

function ComplainsRow({ userInfo }) {
  const { driverName, destinationA, destinationB, date, price, status } =
    userInfo;

  function handleClick() {
    //navigate(`/user-information/${id}`);
    // Add your click handling logic here
  }

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.Row>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {driverName}
        </div>
        <div>{destinationA}</div>
        <div>{destinationB}</div>
        <div>{date}</div>
        <div>{price}</div>
        <StatusDiv status={status} even>
          {status}
        </StatusDiv>
      </Table.Row>
    </Table>
  );
}

export default ComplainsRow;
