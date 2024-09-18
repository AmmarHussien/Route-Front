import { useState } from "react";
import AddDriver from "../features/drivers/AddDriver";
import DriversTable from "../features/drivers/DriversTable";
import DriversTableOperations from "../features/drivers/DriversTableOperations";
import Row from "../ui/Row";
import useDrivers from "../features/drivers/useDrivers";
import useSearchDriver from "../features/drivers/useSearchDriver";

function Drivers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchList, count: searchCount } = useSearchDriver(searchTerm);
  const { drivers: allDrivers, isLoading, count: driverCount } = useDrivers();

  const driverToDisplay = searchTerm ? searchList : allDrivers;
  const countToDisplay = searchTerm ? searchCount : driverCount;
  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <DriversTableOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
        <AddDriver />
      </Row>

      <DriversTable
        drivers={driverToDisplay}
        isLoading={isLoading}
        driverCount={countToDisplay}
      />
    </>
  );
}

export default Drivers;
