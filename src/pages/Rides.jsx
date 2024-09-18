import { useState } from "react";
import RidesTable from "../features/rides/RidesTable";
import RidesTableOperations from "../features/rides/RidesTableOperations";
import Row from "../ui/Row";
import useSearchRides from "../features/rides/useSearchRides";
import useRides from "../features/rides/useRides";

function Rides() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchList, count: searchCount } = useSearchRides(searchTerm);
  const { rides: allRides, isLoading, count: RidesCount } = useRides();

  const ridesToDisplay = searchTerm ? searchList : allRides;
  const countToDisplay = searchTerm ? searchCount : RidesCount;
  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <RidesTableOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
        {/* <AddDriver /> */}
      </Row>

      <RidesTable
        rides={ridesToDisplay}
        isLoading={isLoading}
        ridesCount={countToDisplay}
      />
    </>
  );
}

export default Rides;
