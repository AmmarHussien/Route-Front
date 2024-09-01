import Pagination from "../../../ui/Pagination";
import Table from "../../../ui/Table";
import UserRow from "./UserRow";

function UsersRecentRideTable({ rides }) {
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNaView title="Recent Rides" />
      <Table.Header>
        <div>Driver Name</div>
        <div>Destination A</div>
        <div>Destination B</div>
        <div>Date</div>
        <div>Price</div>
        <div>Status</div>
        <div>Rate</div>
      </Table.Header>

      <Table.Body
        data={rides}
        render={(item) => <UserRow userInfo={item} key={item.id} />}
      />

      <Table.Footer>
        <Pagination count={rides.length} />
      </Table.Footer>
    </Table>
  );
}

export default UsersRecentRideTable;
