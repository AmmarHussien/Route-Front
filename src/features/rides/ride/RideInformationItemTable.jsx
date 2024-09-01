import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  /* margin: 20px; */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
`;
const RowItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: ${(props) => (props.even ? "#f1f1f1" : "#f9f9f9")};
`;
const Label = styled.div`
  flex: 1;
  font-weight: 700px;
  text-transform: capitalize;
  color: #72788e;
`;

const Value = styled.div`
  flex: 1;
  text-align: left;
  font-weight: 600px;
  color: #272424;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const IMG = styled.img`
  height: 400px;
`;

function RideInformationItemTable({ title, data }) {
  if (!data === null) return <Empty>No data to show at the moment</Empty>;

  return (
    <TableContainer>
      <Title>{title}</Title>
      <Table>
        {Object.entries(data).map(([key, value], index) =>
          key !== "src" ? (
            <RowItem key={key} even={index % 2 === 1}>
              <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
              <Value>{value}</Value>
            </RowItem>
          ) : (
            <IMG src={value} alt="" />
          )
        )}
      </Table>
    </TableContainer>
  );
}

export default RideInformationItemTable;
