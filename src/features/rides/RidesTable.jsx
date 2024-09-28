import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import RidesRow from "./RidesRow";

function RidesTable({ rides, isLoading, ridesCount }) {
  const [searchParams] = useSearchParams();
  const params = searchParams.get("status");
  // Show the loading spinner while the data is being fetched
  if (isLoading) return <Spinner />;

  // Show an empty state if there are no drivers to display
  if (!rides.length) return <Empty resourceName="Rides" />;

  return (
    <Table columns="0.4fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNav title="ALL Rides" tableData={rides} />
      <Table.Header>
        <div>Ride ID</div>
        <div>Driver Name</div>
        <div>User Name</div>
        <div>Created Date</div>
        {params === "Scheduled" ? <div>Scheduled Date</div> : <div>Price</div>}

        <div>Status</div>
      </Table.Header>

      <Table.Body
        data={rides}
        render={(item) => <RidesRow RideInfo={item} key={item.id} />}
      />

      <Table.Footer>
        <Pagination count={ridesCount} />
      </Table.Footer>
    </Table>
  );
}

export default RidesTable;
