import Pagination from "../../ui/Pagination";
import Table from "../../ui/Table";
import VehiclesRow from "./VehiclesRow";

const fakeData = [
  {
    id: 1,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "active",
  },
  {
    id: 2,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "active",
  },
  {
    id: 3,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "active",
  },
  {
    id: 4,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "pending",
  },
  {
    id: 5,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "pending",
  },
  {
    id: 6,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "pending",
  },
  {
    id: 7,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "out Of Service",
  },
  {
    id: 8,
    modal: "Hyundai",
    owner: "Ammar",
    licenseExpiry: "29/01/2024",
    status: "out Of Service",
  },

  // Add more fake data as needed
];

function VehiclesTable() {
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr">
      <Table.TableNav title="Vehicles" />
      <Table.Header>
        <div>ID</div>
        <div>Modal</div>
        <div>Owner</div>
        <div>licenseExpiry</div>
        <div>Status</div>
      </Table.Header>

      <Table.Body
        data={fakeData}
        render={(item) => <VehiclesRow userInfo={item} key={item.id} />}
      />

      <Table.Footer>
        <Pagination count={fakeData.length} />
      </Table.Footer>
    </Table>
  );
}

export default VehiclesTable;
