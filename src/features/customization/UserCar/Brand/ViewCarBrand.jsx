import Spinner from "../../../../ui/Spinner";
import useViewManufactures from "./useViewManufactures";

import InformationBrandTable from "./InformationBrandTable";
import styled from "styled-components";
import { useEffect } from "react";
import { useMoveBack } from "../../../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import Row from "../../../../ui/Row";
import Heading from "../../../../ui/Heading";
import ViewCarModel from "../Model/ViewCarModel";
import useModel from "../Model/useModel";
import AddModel from "../Model/AddModel";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../../../../ui/Button";
import Empty from "../../../../ui/Empty";
import Permission from "../../../../ui/permission";

const Box = styled.div`
  width: 50%;
`;
const BoxModels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 10px;
`;

function ViewCarBrand() {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { Id } = useParams();
  const { isLoading, manufactures } = useViewManufactures();
  const { models, modelLoading } = useModel(Id);
  const moveBack = useMoveBack();

  useEffect(() => {}, [manufactures]);

  if (isLoading || modelLoading) return <Spinner />;

  const active = manufactures.is_active
    ? isRTL
      ? "نعم" // Yes in Arabic
      : "True" // True in English
    : isRTL
    ? "لا" // No in Arabic
    : "False"; // False in English

  return (
    <>
      <Box>
        <Button onClick={moveBack}>
          {" "}
          {isRTL ? (
            <ArrowForwardIcon fontSize="large" />
          ) : (
            <ArrowBackIcon fontSize="large" />
          )}
        </Button>
        <InformationBrandTable
          data={{
            [t("brandId")]: manufactures.id,
            [t("englishName")]: manufactures.name.en,
            [t("arabicName")]: manufactures.name.ar,
            [t("isActive")]: active,
          }}
          title={
            isRTL ? `${manufactures.name.ar} ` : `${manufactures.name.en} `
          }
        />
      </Box>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading $variant="h1">
            {isRTL
              ? ` ${t("Models")} ${manufactures.name.ar} ` // Arabic name followed by the translation for "Models"
              : `${manufactures.name.en} ${t("Models")}`}{" "}
          </Heading>
        </Row>
        <Permission requiredPermissions="createModel">
          <AddModel />
        </Permission>
      </Row>

      <Row type="horizontal">
        <BoxModels>
          {Array.isArray(models) && models.length > 0 ? (
            models.map((model, index) => (
              <ViewCarModel id={model.id} key={index} />
            ))
          ) : (
            <Empty>{t("NoData")}</Empty> // You can add a fallback message or placeholder here
          )}
        </BoxModels>
      </Row>
    </>
  );
}

export default ViewCarBrand;
