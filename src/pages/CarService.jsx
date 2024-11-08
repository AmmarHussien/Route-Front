import Button from "@mui/material/Button";
import CarServicesTable from "../features/car-services/CarServicesTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

function CarService() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading $variant="h1">Car service</Heading>
          <Heading $variant="h5">
            Select between the manual requests and live requests which has been
            added from user’s end
          </Heading>
        </Row>
        <Button
          onClick={() => {
            navigate("/add-car-services");
          }}
          $variant="contained"
          startIcon={<AddIcon />}
          sx={{
            width: 139,
            height: 56,
            borderRadius: 5,
            fontSize: 16,
            background: "#005379",
            shadow: "0 4 60 0 #0038FF26",
          }}
        >
          Add New
        </Button>
      </Row>
      <CarServicesTable />
    </>
  );
}

export default CarService;
