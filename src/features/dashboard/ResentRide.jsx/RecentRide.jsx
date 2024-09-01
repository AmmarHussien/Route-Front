import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import useStatistics from "../useStatisctics";
import RideRow from "./RecentRideRow";

function RecentRide() {
  const { statistics } = useStatistics();

  return (
    <Menus>
      <Table columns="0.4fr 1fr 1.6fr 1.6fr 1.2fr 0.8fr 0.5fr">
        <Table.TableNaView title="Recent Rides" />
        <Table.Header>
          <div>ID</div>
          <div>Rider Name</div>
          <div>Destination A</div>
          <div>Destination B</div>
          <div>Date</div>
          <div>Price</div>
          <div>Status</div>
        </Table.Header>

        <Table.Body
          data={statistics.rides}
          render={(rides) => <RideRow ride={rides} key={rides.id} />}
        />

        <Table.Footer>
          <p>Summary of Last 10 Rides</p>
          {/* <Pagination count={statistics.rides.length} /> */}
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default RecentRide;
