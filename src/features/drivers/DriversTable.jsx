import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import DriversRow from "./DriversRow";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

function DriversTable({ drivers, isLoading, driverCount }) {
  const [searchParams] = useSearchParams();

  // Show the loading spinner while the data is being fetched
  if (isLoading) return <Spinner />;

  // Show an empty state if there are no drivers to display
  if (!drivers.length) return <Empty resourceName="drivers" />;

  // Check the status in the query parameters
  const isBlocked = searchParams.get("status") === "Blocked";

  // Set columns based on the status
  const columns = isBlocked
    ? "0.4fr 1fr 1fr  1fr 1fr 1fr"
    : "0.4fr 1fr 1fr 1fr 1fr";

  return (
    <Table columns={columns}>
      <Table.TableNav title="Driver Table" tableData={drivers} />

      <Table.Header>
        <div>ID</div>
        <div>Driver Name</div>
        {isBlocked && <div>Reason</div>}
        <div>Email</div>
        <div>Phone Number</div>
        <div>Status</div>
      </Table.Header>

      <Table.Body
        data={drivers}
        render={(driver) => <DriversRow driverInfo={driver} key={driver.id} />}
      />

      <Table.Footer>
        <Pagination count={driverCount} />
      </Table.Footer>
    </Table>
  );
}

export default DriversTable;
