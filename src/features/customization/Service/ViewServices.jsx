import Heading from "../../../ui/Heading";
import Row from "../../../ui/Row";
import useCarService from "./useCarService";
import Spinner from "../../../ui/Spinner";
import ViewCarServiceModal from "./ViewCarServiceModal";
import styled from "styled-components";
import ButtonText from "../../../ui/ButtonText";
import { useMoveBack } from "../../../hooks/useMoveBack";
import AddCarService from "./AddCarService";

const BoxModels = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  gap: 10px;
`;

function ViewServices() {
  const { carService, isLoading } = useCarService();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <ButtonText onClick={moveBack}>&larr; Users Cars</ButtonText>
          <Heading $variant="h1">Service Cars</Heading>
        </Row>
        <AddCarService />
      </Row>

      <BoxModels>
        {Array.isArray(carService) && carService.length > 0 ? (
          carService.map((model, index) => (
            <ViewCarServiceModal id={model.id} key={index} />
          ))
        ) : (
          <p>No Car Service found.</p> // You can add a fallback message or placeholder here
        )}
      </BoxModels>
    </>
  );
}

export default ViewServices;
