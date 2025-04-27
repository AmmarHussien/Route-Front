import styled, { css } from "styled-components";
import Row from "../../../../ui/Row";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import EditModel from "./EditModel";
import AlertConfirmation from "../../../../ui/AlertConfirmation";
import useDeleteModel from "./useDeleteModel";
import Spinner from "../../../../ui/Spinner";
import { useTranslation } from "react-i18next";
import Modal from "../../../../ui/Modal";
import Permission from "../../../../ui/permission";

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
  ${(props) =>
    props.lang === "ar-Eg" &&
    css`
      text-align: right;
    `}

  ${(props) =>
    props.lang === "en-US" &&
    css`
      text-align: left;
    `}
  font-weight: 600px;
  color: #272424;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function InformationModelTable({ title, data, id }) {
  const { t } = useTranslation();

  const [openAlert, setOpenAlert] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const { mutate: deleteModel, isLoading } = useDeleteModel(id);

  // Check for null or undefined data before rendering the table

  useEffect(() => {
    if (isDelete) {
      // Trigger the delete mutation
      deleteModel(undefined, {
        onSuccess: () => {
          // Navigate to the specified route after successful deletion

          setIsDelete(false); // Reset delete state after success
        },
        onError: (error) => {
          setIsDelete(false); // Reset delete state even after an error
        },
      });
    }
  }, [isDelete, deleteModel, data.id]);

  const handleClick = () => {
    setOpenAlert(true);
  };

  if (!data) return <Empty>{t("NoData")}</Empty>;

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <TableContainer>
        <Row type={"horizontal"}>
          <Title>{title}</Title>
          <div>
            <Modal>
              <Permission requiredPermissions="editModel">
                <Modal.Open opens="add-Brand">
                  <IconButton aria-label="Edit">
                    <ModeEditIcon fontSize="large" color="primary" />
                  </IconButton>
                </Modal.Open>
                <Modal.Window name="add-Brand">
                  <EditModel data={id} />
                </Modal.Window>
              </Permission>
            </Modal>
            <Permission requiredPermissions="deleteModel">
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={handleClick}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Permission>
          </div>
        </Row>

        {openAlert && (
          <AlertConfirmation
            open={openAlert}
            setOpen={setOpenAlert}
            deleting={setIsDelete}
          />
        )}

        {/* Ensure that data is valid before passing it to EditModel
        {data && <EditModel open={open} setOpen={setOpen} data={id} />} */}

        <Table>
          {Object.entries(data).map(([key, value], index) => (
            <RowItem key={key} $even={index % 2 === 1}>
              <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
              <Value> {value} </Value>
            </RowItem>
          ))}
        </Table>
      </TableContainer>
    </>
  );
}

export default InformationModelTable;
