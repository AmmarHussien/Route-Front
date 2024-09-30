import styled from "styled-components";
import Row from "../../../ui/Row";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";

import EditModel from "./EditModel";

const TableContainer = styled.div`
  width: 100%;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  height: fit-content;
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
  background-color: ${(props) => (props.$even ? "#f1f1f1" : "#f9f9f9")};
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

function InformationModelTable({ title, data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  if (!data === null) return <Empty>No data to show at the moment</Empty>;

  return (
    <TableContainer>
      <Row type={"horizontal"}>
        <Title>{title}</Title>
        <IconButton aria-label="Edit" onClick={handleOpen}>
          <ModeEditIcon fontSize="large" color="primary" />
        </IconButton>
      </Row>

      <EditModel open={open} setOpen={setOpen} />

      <Table>
        {Object.entries(data).map(([key, value], index) => (
          <RowItem key={key} $even={index % 2 === 1}>
            <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
            {value === null ? <Value> {"0"} </Value> : <Value> {value} </Value>}
          </RowItem>
        ))}
      </Table>
    </TableContainer>
  );
}

export default InformationModelTable;
