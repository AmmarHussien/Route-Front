import { useNavigate } from "react-router-dom/dist";
import Table from "../../ui/Table";

function CarServicesRow({ carService }) {
  const navigate = useNavigate();
  const { userName, carModel, plateNumber, requestData, phoneNumber, id } =
    carService;

  function handleClick() {
    navigate(`/car-service-information/${id}`);
    // Add your click handling logic here
  }

  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr ">
      <Table.Row>
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {userName}
        </div>
        <div>{carModel}</div>
        <div>{plateNumber}</div>
        <div>{requestData}</div>
        <div>{phoneNumber}</div>
      </Table.Row>
    </Table>
  );
}

export default CarServicesRow;
