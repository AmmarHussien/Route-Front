import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import CarServicesRow from "./CarServicesRow";

const fakeData = [
  {
    id: 1,
    userName: "John Doe",
    carModel: "Toyota Camry",
    plateNumber: "ABC-1234",
    requestData: "2024-05-01",
    phoneNumber: "123-456-7890",
  },
  {
    id: 2,
    userName: "Jane Smith",
    carModel: "Honda Accord",
    plateNumber: "XYZ-5678",
    requestData: "2024-05-02",
    phoneNumber: "987-654-3210",
  },
  {
    id: 3,
    userName: "Alice Johnson",
    carModel: "Ford Mustang",
    plateNumber: "MUS-2024",
    requestData: "2024-05-03",
    phoneNumber: "555-555-5555",
  },
  {
    id: 4,
    userName: "Alice Johnson",
    carModel: "Ford Mustang",
    plateNumber: "MUS-2024",
    requestData: "2024-05-03",
    phoneNumber: "555-555-5555",
  },
  {
    id: 5,
    userName: "Alice Johnson",
    carModel: "Ford Mustang",
    plateNumber: "MUS-2024",
    requestData: "2024-05-03",
    phoneNumber: "555-555-5555",
  },
  {
    id: 6,
    userName: "Alice Johnson",
    carModel: "Ford Mustang",
    plateNumber: "MUS-2024",
    requestData: "2024-05-03",
    phoneNumber: "555-555-5555",
  },
  {
    id: 7,
    userName: "Alice Johnson",
    carModel: "Ford Mustang",
    plateNumber: "MUS-2024",
    requestData: "2024-05-03",
    phoneNumber: "555-555-5555",
  },
  {
    id: 8,
    userName: "Alice Johnson",
    carModel: "Ford Mustang",
    plateNumber: "MUS-2024",
    requestData: "2024-05-03",
    phoneNumber: "555-555-5555",
  },

  // Add more fake data as needed
];

function CarServicesTable() {
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr">
      <Table.TableNav title="Recent Car Services" />
      <Table.Header>
        <div>User Name</div>
        <div>Car Model</div>
        <div>Plate Number</div>
        <div>Request Data</div>
        <div>Phone Number</div>
      </Table.Header>

      <Table.Body
        data={fakeData}
        render={(item) => <CarServicesRow carService={item} key={item.id} />}
      />

      <Table.Footer>
        <Pagination count={fakeData.length} />
      </Table.Footer>
    </Table>
  );
}

export default CarServicesTable;
