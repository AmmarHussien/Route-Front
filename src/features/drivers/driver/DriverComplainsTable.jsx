import Pagination from "../../../ui/Pagination";
import Table from "../../../ui/Table";
import ComplainsRow from "./ComplainsRow";

const fakeData = [
  {
    id: 1,
    driverName: "Ahmed",
    destinationA: "maadi",
    destinationB: "helwan",
    date: "2017-12-12",
    price: "300",
    status: "Completed",
  },
  {
    id: 2,
    driverName: "Ahmed",
    destinationA: "maadi",
    destinationB: "helwan",
    date: "2017-12-12",
    price: "300",
    status: "Completed",
  },

  // Add more fake data as needed
];

function DriverComplainsTable() {
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNaView title="Complains" />
      <Table.Header>
        <div>Driver Name</div>
        <div>Destination A</div>
        <div>Destination B</div>
        <div>Date</div>
        <div>Price</div>
        <div>Status</div>
      </Table.Header>

      <Table.Body
        data={fakeData}
        render={(item) => <ComplainsRow userInfo={item} key={item.id} />}
      />

      <Table.Footer>
        <Pagination count={fakeData.length} />
      </Table.Footer>
    </Table>
  );
}

export default DriverComplainsTable;
