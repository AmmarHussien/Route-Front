import { useState } from "react";
import RidesTable from "../features/rides/RidesTable";
import RidesTableOperations from "../features/rides/RidesTableOperations";
import Row from "../ui/Row";
import useRides from "../features/rides/useRides";

function Rides() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    rides: allRides,
    isLoading,
    count: RidesCount,
  } = useRides(searchTerm);

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <RidesTableOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
      </Row>

      <RidesTable
        rides={allRides}
        isLoading={isLoading}
        ridesCount={RidesCount}
      />
    </>
  );
}

export default Rides;
