import styled, { css } from "styled-components";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import Row from "../../../ui/Row";
import EditCarService from "./EditCarService";
import AlertConfirmation from "../../../ui/AlertConfirmation";
import useDeleteCar from "./useDeleteCar";
import Spinner from "../../../ui/Spinner";
import { useTranslation } from "react-i18next";
import useViewCarService from "./useViewCarService";
import Modal from "../../../ui/Modal";
import Permission from "../../../ui/permission";

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

function InformationCarServiceTable({
  title,
  data: id,
  isLoading: EditLoading,
}) {
  const { carService } = useViewCarService(id);

  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const [openAlert, setOpenAlert] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const dataRow = {
    [t("serviceId")]: carService.id,
    [t("englishName")]: carService.name.en,
    [t("arabicName")]: carService.name.ar,
    [t("driverCommission")]: carService.driver_commission,
    [t("openingPrice")]: carService.opening_price,
    [t("separationKm")]: carService.separation_km,
    [t("beforeSeparationPrice")]: carService.before_separation_price,
    [t("afterSeparationPrice")]: carService.after_separation_price,
    [t("inOutSeparationKm")]: carService.in_out_separation_km,
  };

  const { mutate: deleteCar, isLoading } = useDeleteCar(id);

  useEffect(() => {
    if (isDelete) {
      // Trigger the delete mutation
      deleteCar(undefined, {
        onSuccess: () => {
          setIsDelete(false); // Reset delete state after success
        },
        onError: (error) => {
          setIsDelete(false); // Reset delete state even after an error
        },
      });
    }
  }, [isDelete, deleteCar]);

  const handleClick = () => {
    setOpenAlert(true);
  };

  if (!dataRow === null) return <Empty>{t("NoData")}</Empty>;

  return (
    <>
      {
        isLoading && <Spinner /> //Show the Spinner while deleting
      }
      <TableContainer>
        <Row type={"horizontal"}>
          <Title>{title}</Title>
          <div>
            <Modal>
              <Modal.Open opens="edit-car-service-form">
                <Permission requiredPermissions="editCarType">
                  <IconButton aria-label="Edit">
                    <ModeEditIcon fontSize="large" color="primary" />
                  </IconButton>
                </Permission>
              </Modal.Open>
              <Modal.Window name="edit-car-service-form">
                <EditCarService date={id} />
              </Modal.Window>
            </Modal>
            <Permission requiredPermissions="deleteCarType">
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

        {/* {dataRow && (
          <EditCarService
            open={open}
            setOpen={setOpen}
            data={id}
            isLoading={EditLoading}
          />
        )} */}

        <Table>
          {Object.entries(dataRow).map(([key, value], index) => (
            <RowItem key={key} $even={index % 2 === 1}>
              <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
              <Value lang={isRTL ? "ar-Eg" : "en-US"}> {value} </Value>
            </RowItem>
          ))}
        </Table>
      </TableContainer>
    </>
  );
}

export default InformationCarServiceTable;
