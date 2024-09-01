import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import RidesRow from "./RidesRow";

const fakeData = [
  {
    id: 1,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "On Going",
  },
  {
    id: 2,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "On Going",
  },
  {
    id: 3,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "On Going",
  },
  {
    id: 4,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "completed",
  },
  {
    id: 5,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "completed",
  },
  {
    id: 6,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "completed",
  },
  {
    id: 7,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "cancelled",
  },
  {
    id: 8,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "cancelled",
  },
  {
    id: 9,
    driverName: "Miimz",
    userName: "Ammar",
    dateAndTime: "2017-10-15  10:40 PM",
    price: "140",
    status: "cancelled",
  },

  // Add more fake data as needed
];

function RidesTable() {
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1fr">
      <Table.TableNav title="Recent Rides" />
      <Table.Header>
        <div>Ride ID</div>
        <div>Driver Name</div>
        <div>User Name</div>
        <div>Date and Time</div>
        <div>Price</div>
        <div>Status</div>
      </Table.Header>

      <Table.Body
        data={fakeData}
        render={(item) => <RidesRow userInfo={item} key={item.id} />}
      />

      <Table.Footer>
        <Pagination count={fakeData.length} />
      </Table.Footer>
    </Table>
  );
}

export default RidesTable;
