import Spinner from "../../../../ui/Spinner";
import useViewManufactures from "./useViewManufactures";

import InformationBrandTable from "./InformationBrandTable";
import styled from "styled-components";
import { useEffect } from "react";
import ButtonText from "../../../../ui/ButtonText";
import { useMoveBack } from "../../../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import Row from "../../../../ui/Row";
import Heading from "../../../../ui/Heading";
import ViewCarModel from "../Model/ViewCarModel";
import useModel from "../Model/useModel";
import AddModel from "../Model/AddModel";

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
  const { Id } = useParams();
  const { isLoading, manufactures } = useViewManufactures();
  const { models, modelLoading } = useModel(Id);
  const moveBack = useMoveBack();

  useEffect(() => {}, [manufactures]);

  if (isLoading || modelLoading) return <Spinner />;

  const active = manufactures.is_active === true ? "True" : "False";

  return (
    <>
      <Box>
        <ButtonText onClick={moveBack}>&larr; Users Cars</ButtonText>
        <InformationBrandTable
          data={{
            id: manufactures.id,
            englishName: manufactures.name.en,
            arabicName: manufactures.name.ar,
            isActive: active,
          }}
          title={`${manufactures.name.en} `}
        />
      </Box>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading $variant="h1">{manufactures.name.en} Models</Heading>
        </Row>
        <AddModel />
      </Row>

      <Row type="horizontal">
        <BoxModels>
          {Array.isArray(models) && models.length > 0 ? (
            models.map((model, index) => (
              <ViewCarModel id={model.id} key={index} />
            ))
          ) : (
            <p>No models found.</p> // You can add a fallback message or placeholder here
          )}
        </BoxModels>
      </Row>
    </>
  );
}

export default ViewCarBrand;
