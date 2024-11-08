import Button from "@mui/material/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import VehiclesTable from "../features/vehicles/VehiclesTable";

function Vehicles() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading $variant="h1">Vehicles</Heading>
        <Button
          onClick={() => {
            navigate("/add-vehicle");
          }}
          $variant="contained"
          startIcon={<AddIcon />}
          sx={{
            height: 56,
            borderRadius: 5,
            fontSize: 16,
            background: "#005379",
            shadow: "0 4 60 0 #071e6f25",
          }}
        >
          Add New Vehicle
        </Button>
      </Row>

      <VehiclesTable />
    </>
  );
}

export default Vehicles;
