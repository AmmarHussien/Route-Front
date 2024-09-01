import AddRide from "../features/rides/AddRide";
import RidesTable from "../features/rides/RidesTable";
import RidesTableOperations from "../features/rides/RidesTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Rides() {
  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <Heading variant="h1">Rides</Heading>
          <RidesTableOperations />
        </Row>
        <AddRide />
      </Row>

      <RidesTable />
    </>
  );
}

export default Rides;
