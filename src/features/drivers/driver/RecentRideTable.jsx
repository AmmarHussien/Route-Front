import Pagination from "../../../ui/Pagination";
import Table from "../../../ui/Table";
import RideRow from "./RideRow";

function RecentRideTable({ rides }) {
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNaView title="Recent Rides" />
      <Table.Header>
        <div>User Name</div>
        <div>Destination A</div>
        <div>Destination B</div>
        <div>Date</div>
        <div>Price</div>
        <div>Status</div>
        <div>Rate</div>
      </Table.Header>
      <Table.Body
        data={rides}
        render={(rides) => <RideRow rideInfo={rides} key={rides.id} />}
      />

      <Table.Footer>
        <Pagination count={rides.length} />
      </Table.Footer>
    </Table>
  );
}

export default RecentRideTable;
