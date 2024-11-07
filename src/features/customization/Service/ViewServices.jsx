import Row from "../../../ui/Row";
import useCarService from "./useCarService";
import Spinner from "../../../ui/Spinner";
import ViewCarServiceModal from "./ViewCarServiceModal";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../../../ui/Button";
import { useMoveBack } from "../../../hooks/useMoveBack";
import AddCarService from "./AddCarService";
import { useTranslation } from "react-i18next";
import Empty from "../../../ui/Empty";

const BoxModels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 10px;
`;

function ViewServices() {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { carService, isLoading } = useCarService();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <Button onClick={moveBack}>
            {" "}
            {isRTL ? (
              <ArrowForwardIcon fontSize="large" />
            ) : (
              <ArrowBackIcon fontSize="large" />
            )}
          </Button>
        </Row>
        <AddCarService />
      </Row>

      <BoxModels>
        {Array.isArray(carService) && carService.length > 0 ? (
          carService.map((model, index) => (
            <ViewCarServiceModal id={model.id} key={index} />
          ))
        ) : (
          <Empty> {t("NoData")}</Empty> // You can add a fallback message or placeholder here
        )}
      </BoxModels>
    </>
  );
}

export default ViewServices;
