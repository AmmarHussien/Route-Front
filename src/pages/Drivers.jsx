import { useState } from "react";
import AddDriver from "../features/drivers/AddDriver";
import DriversTable from "../features/drivers/DriversTable";
import DriversTableOperations from "../features/drivers/DriversTableOperations";
import Row from "../ui/Row";
import useDrivers from "../features/drivers/useDrivers";
import Permission from "../ui/permission";

function Drivers() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    drivers: allDrivers,
    isLoading,
    count: driverCount,
  } = useDrivers(searchTerm);

  return (
    <>
      <Row type="horizontal">
        <Row type="vertical">
          <DriversTableOperations
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Row>
        <Permission requiredPermissions="createDriver">
          <AddDriver />
        </Permission>
      </Row>

      <DriversTable
        drivers={allDrivers}
        isLoading={isLoading}
        driverCount={driverCount}
      />
    </>
  );
}

export default Drivers;
